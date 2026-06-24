import Taro from '@tarojs/taro';

export const TOKEN_KEY = 'authToken';
export const USER_INFO_KEY = 'userInfo';

export function getToken(): string {
  try {
    return Taro.getStorageSync(TOKEN_KEY) || '';
  } catch {
    return '';
  }
}

export function setToken(token: string): void {
  try {
    Taro.setStorageSync(TOKEN_KEY, token);
  } catch {}
}

export function removeToken(): void {
  try {
    Taro.removeStorageSync(TOKEN_KEY);
  } catch {}
}

export function getUserInfo(): any {
  try {
    return Taro.getStorageSync(USER_INFO_KEY) || null;
  } catch {
    return null;
  }
}

export function setUserInfo(userInfo: any): void {
  try {
    Taro.setStorageSync(USER_INFO_KEY, userInfo);
  } catch {}
}

export function removeUserInfo(): void {
  try {
    Taro.removeStorageSync(USER_INFO_KEY);
  } catch {}
}
