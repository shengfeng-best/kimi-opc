declare const wx: any;

const STORAGE_KEY_API_BYPASS = 'dev_api_bypass';
const ENV_API_BYPASS = 'TARO_APP_API_BYPASS';

function readBooleanStorage(key: string): boolean | null {
  try {
    const value = wx.getStorageSync(key);
    if (typeof value === 'boolean') return value;
    if (value === 'true') return true;
    if (value === 'false') return false;
    return null;
  } catch {
    return null;
  }
}

export function getNodeEnv(): string {
  try {
    const maybeProcess = globalThis as { process?: { env?: Record<string, unknown> } };
    const value = maybeProcess.process?.env?.NODE_ENV;
    return typeof value === 'string' ? value : 'development';
  } catch {
    return 'development';
  }
}

function readBooleanEnv(key: string): boolean | null {
  try {
    const maybeProcess = globalThis as { process?: { env?: Record<string, unknown> } };
    const value = maybeProcess.process?.env?.[key];
    if (value === true || value === 'true' || value === '1') return true;
    if (value === false || value === 'false' || value === '0') return false;
    return null;
  } catch {
    return null;
  }
}

export function isDevEnv(): boolean {
  return getNodeEnv() !== 'production';
}

export function shouldBypassApiRequest(): boolean {
  const localOverride = readBooleanStorage(STORAGE_KEY_API_BYPASS);
  if (localOverride !== null) return localOverride;
  const envOverride = readBooleanEnv(ENV_API_BYPASS);
  if (envOverride !== null) return envOverride;
  return false;
}

export function shouldForceRealnameAuth(): boolean {
  return true;
}
