import { ReactNode } from 'react';
import { useDidShow, useLaunch } from '@tarojs/taro';
import './app.css';
import './styles/tokens.scss';
import './styles/mixins.scss';
import './styles/bento-base.scss';
import { useUserStore } from './store';

declare const wx: any;

type AppProps = {
  children: ReactNode;
};

function App(props: AppProps) {
  const LOGIN_URL = `/pages/auth/login?redirect=${encodeURIComponent('/pages/index/index')}`;

  const safeGetStorageSync = (key: string) => {
    try { return wx.getStorageSync(key); } catch { return ''; }
  };

  const getCurrentRoute = () => {
    try {
      const pages = wx.getCurrentPages?.() || [];
      const current = pages[pages.length - 1] as { route?: string } | undefined;
      return String(current?.route || '');
    } catch { return ''; }
  };

  const enforceEntryAuthGate = (source: 'launch' | 'didShow') => {
    const userStore = useUserStore.getState();
    const hasLogin = userStore.checkLogin();
    const route = getCurrentRoute();
    console.log('[app-auth-gate]', { source, hasLogin, route });
    if (!hasLogin && route !== 'pages/auth/login') {
      wx.reLaunch({ url: LOGIN_URL });
    }
  };

  useLaunch(() => {
    safeGetStorageSync('home_index_version');
    const bootstrapAuth = async () => {
      const userStore = useUserStore.getState();
      if (!userStore.checkLogin()) return;
      const token = String(safeGetStorageSync('authToken') || '');
      if (!token) return;
      try {
        userStore.setToken(token);
      } catch {
        userStore.logout();
      }
    };
    void bootstrapAuth();
    setTimeout(() => enforceEntryAuthGate('launch'), 220);
  });

  useDidShow(() => {
    setTimeout(() => enforceEntryAuthGate('didShow'), 160);
  });

  return props.children;
}

export default App;
