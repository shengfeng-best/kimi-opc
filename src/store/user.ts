import { create } from 'zustand';
import Taro from '@tarojs/taro';
import { User } from '../types';

interface UserState {
  userInfo: User | null;
  isLoggedIn: boolean;
  token: string;
  setUserInfo: (user: User | null) => void;
  setToken: (token: string) => void;
  login: (token: string, userInfo: User) => void;
  logout: () => void;
  checkLogin: () => boolean;
}

export const useUserStore = create<UserState>((set) => ({
  userInfo: null,
  isLoggedIn: false,
  token: '',

  setUserInfo: (user) => {
    set({ userInfo: user });
    if (user) {
      try { Taro.setStorageSync('userInfo', user); } catch {}
    }
  },

  setToken: (token) => {
    set({ token, isLoggedIn: !!token });
    if (token) {
      try { Taro.setStorageSync('authToken', token); } catch {}
    }
  },

  login: (token, userInfo) => {
    set({ token, userInfo, isLoggedIn: true });
    try {
      Taro.setStorageSync('authToken', token);
      Taro.setStorageSync('userInfo', userInfo);
    } catch {}
  },

  logout: () => {
    set({ token: '', userInfo: null, isLoggedIn: false });
    try {
      Taro.removeStorageSync('authToken');
      Taro.removeStorageSync('userInfo');
    } catch {}
  },

  checkLogin: () => {
    try {
      const token = Taro.getStorageSync('authToken');
      const userInfo = Taro.getStorageSync('userInfo');
      if (token && userInfo) {
        set({ token, userInfo, isLoggedIn: true });
        return true;
      }
      return false;
    } catch {
      return false;
    }
  },
}));
