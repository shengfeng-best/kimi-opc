import { useUserStore } from '../store';
import { ERROR_CODE, ERROR_MESSAGE, ApiResponse } from '../types';
import { callCloudApi } from '../cloud';
import { isCloudEnabled } from '../cloud';
import { shouldBypassApiRequest } from '../config/runtime';

interface RequestConfig {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  data?: any;
  params?: Record<string, any>;
  header?: Record<string, string>;
  loading?: boolean;
  loadingText?: string;
}

export function normalizeRequestError(err: unknown, fallback = '请求失败'): Error {
  if (err instanceof Error && err.message) return err;
  if (err && typeof err === 'object') {
    const o = err as Record<string, unknown>;
    if (typeof o.errMsg === 'string' && o.errMsg.trim()) return new Error(o.errMsg.trim());
    if (typeof o.message === 'string' && o.message.trim()) return new Error(o.message.trim());
  }
  if (typeof err === 'string' && err.trim()) return new Error(err.trim());
  return new Error(fallback);
}

class Request {
  private getHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'X-Platform': 'weapp',
      'X-Version': '1.0.0',
    };
    const userStore = useUserStore.getState();
    if (userStore.token) {
      headers['Authorization'] = `Bearer ${userStore.token}`;
    }
    return headers;
  }

  private handleError(code: number, message?: string): never {
    switch (code) {
      case ERROR_CODE.AUTH_REQUIRED:
      case ERROR_CODE.TOKEN_INVALID:
      case ERROR_CODE.TOKEN_EXPIRED:
        useUserStore.getState().logout();
        break;
      case ERROR_CODE.USER_BANNED:
        wx.showModal({
          title: '账号提示',
          content: '您的账号已被封禁，如有疑问请联系客服',
          showCancel: false,
        });
        break;
    }
    throw new Error(message || ERROR_MESSAGE[code] || '请求失败');
  }

  async request<T = any>(config: RequestConfig): Promise<any> {
    const { url, method = 'GET', data, params, loading = true, loadingText = '加载中...' } = config;

    if (shouldBypassApiRequest()) {
      console.log(`[API BYPASS] ${method} ${url}`, data || params || '');
      if (loading) {
        wx.showLoading({ title: loadingText, mask: true });
        setTimeout(() => wx.hideLoading(), 300);
      }
      return {} as T;
    }

    if (!isCloudEnabled()) {
      const error = new Error('云服务未启用，请先设置 cloud_enabled=true');
      wx.showToast({ title: error.message.slice(0, 48), icon: 'none', duration: 2000 });
      throw error;
    }

    try {
      if (loading) wx.showLoading({ title: loadingText, mask: true });
      const cloudResponse = await callCloudApi<ApiResponse<T>>({
        path: url,
        method,
        data: data || {},
        params,
        headers: this.getHeaders(),
      });
      const result = cloudResponse as ApiResponse<T>;
      if (!result || typeof result.code !== 'number') {
        throw new Error('云函数返回格式异常');
      }
      if (result.code !== ERROR_CODE.SUCCESS) {
        this.handleError(result.code, result.message || result.detail);
      }
      return result.data ?? {};
    } catch (error: unknown) {
      const normalized = normalizeRequestError(error, '云函数调用失败');
      if (normalized.message !== 'requestPayment:fail cancel') {
        wx.showToast({ title: normalized.message.slice(0, 48), icon: 'none', duration: 2000 });
      }
      throw normalized;
    } finally {
      if (loading) wx.hideLoading();
    }
  }

  async get<T = any>(url: string, params?: Record<string, any>, config?: Partial<RequestConfig>): Promise<any> {
    return this.request<T>({ url, method: 'GET', params, ...config });
  }

  async post<T = any>(url: string, data?: any, config?: Partial<RequestConfig>): Promise<any> {
    return this.request<T>({ url, method: 'POST', data, ...config });
  }

  async put<T = any>(url: string, data?: any, config?: Partial<RequestConfig>): Promise<any> {
    return this.request<T>({ url, method: 'PUT', data, ...config });
  }

  async delete<T = any>(url: string, config?: Partial<RequestConfig>): Promise<any> {
    return this.request<T>({ url, method: 'DELETE', ...config });
  }

  async requestPayment(payParams: {
    timeStamp: string;
    nonceStr: string;
    package: string;
    signType: 'HMAC-SHA256';
    paySign: string;
  }): Promise<void> {
    return new Promise((resolve, reject) => {
      wx.requestPayment({
        ...payParams,
        success: () => resolve(),
        fail: (err: any) => reject(err),
      });
    });
  }
}

export const request = new Request();
export { ERROR_CODE, ERROR_MESSAGE };
