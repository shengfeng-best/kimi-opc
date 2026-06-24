import { request } from '../utils/request';
import { WechatPayParams } from '../types';

export const paymentService = {
  /**
   * 创建支付订单
   */
  async createPayment(orderId: string): Promise<{
    orderId: string;
    totalAmount: number;
    payParams: WechatPayParams;
  }> {
    return request.post('/payment/create', { orderId });
  },

  /**
   * 查询支付状态
   */
  async queryPaymentStatus(orderId: string): Promise<{
    status: 'pending' | 'success' | 'failed' | 'refunded';
    paidAt?: number;
    transactionId?: string;
  }> {
    return request.get(`/payment/status/${orderId}`);
  },

  /**
   * 发起微信支付
   */
  async requestWechatPay(payParams: WechatPayParams): Promise<void> {
    return new Promise((resolve, reject) => {
      wx.requestPayment({
        ...payParams,
        success: () => resolve(),
        fail: (err: any) => {
          if (err?.errMsg?.includes('cancel')) {
            reject(new Error('用户取消支付'));
          } else {
            reject(new Error(err?.errMsg || '支付失败'));
          }
        },
      });
    });
  },

  /**
   * 完整支付流程：创建订单 + 调起支付
   */
  async payOrder(orderId: string): Promise<void> {
    const { payParams } = await this.createPayment(orderId);
    await this.requestWechatPay(payParams);
  },
};
