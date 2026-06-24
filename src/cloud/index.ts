/**
 * CloudBase 云函数访问层
 */

declare const wx: any;

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export const CLOUD_CONFIG = {
  enabled: true,
  env: 'your-cloud-env-id',
  defaultFunctionName: 'api',
};

export const COLLECTIONS = {
  USERS: 'users',
  SKILLS: 'skills',
  ORDERS: 'orders',
  TEAMS: 'teams',
  DEMANDS: 'demands',
  NOTICES: 'notices',
  WALLETS: 'wallets',
  TRANSACTIONS: 'transactions',
};

function ensureCloudEnabled() {
  if (!CLOUD_CONFIG.enabled) {
    throw new Error('云能力未启用，请先设置 cloud_enabled=true');
  }
}

export async function initCloud(): Promise<boolean> {
  ensureCloudEnabled();
  if (typeof wx?.cloud?.init !== 'function') {
    throw new Error('当前环境不支持 wx.cloud');
  }
  wx.cloud.init({
    env: CLOUD_CONFIG.env,
    traceUser: true,
  });
  return true;
}

export async function callCloudApi<T = any>(payload: {
  path: string;
  method: HttpMethod;
  data?: Record<string, any>;
  params?: Record<string, any>;
  headers?: Record<string, any>;
}) {
  ensureCloudEnabled();
  await initCloud();
  const response = await wx.cloud.callFunction({
    name: CLOUD_CONFIG.defaultFunctionName,
    data: payload,
  });
  return (response?.result ?? null) as T;
}

export function isCloudEnabled(): boolean {
  return CLOUD_CONFIG.enabled;
}
