import { View, Text, Button, Image } from '@tarojs/components';
import { useState } from 'react';
import { useRouter, reLaunch, showToast, navigateTo } from '@tarojs/taro';
import { useUserStore } from '../../store';
import './login.css';

export default function LoginPage() {
  const { redirect } = useRouter().params;
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const handleLogin = async () => {
    if (!agreed) {
      showToast({ title: '请先同意用户协议', icon: 'none' });
      return;
    }
    setLoading(true);
    try {
      const res = await wx.login({});
      if (res.code) {
        // 模拟登录成功
        const mockUser = {
          id: 'user_' + Date.now(),
          openid: 'openid_' + Date.now(),
          nickname: '用户' + Math.floor(Math.random() * 10000),
          avatar: 'https://via.placeholder.com/100',
          authStatus: 0 as const,
          creditScore: 60,
          walletBalance: 0,
          frozenBalance: 0,
          status: 0 as const,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        useUserStore.getState().login('mock_token_' + Date.now(), mockUser);
        showToast({ title: '登录成功', icon: 'success' });
        const target = redirect ? decodeURIComponent(redirect) : '/pages/index/index';
        reLaunch({ url: target });
      }
    } catch (e: any) {
      showToast({ title: e.message || '登录失败', icon: 'none' });
    } finally {
      setLoading(false);
    }
  };

  const goAgreement = () => navigateTo({ url: '/pages/auth/agreement' });
  const goPrivacy = () => navigateTo({ url: '/pages/auth/privacy' });

  return (
    <View className="login-page">
      <View className="login-header">
        <View className="login-logo">🚀</View>
        <Text className="login-title">欢迎来到OPC技能星球</Text>
        <Text className="login-subtitle">发现技能，连接人才，创造价值</Text>
      </View>

      <View className="login-form">
        <Button
          className="login-btn"
          loading={loading}
          onClick={handleLogin}
        >
          微信一键登录
        </Button>

        <View className="login-agreement">
          <View className={`agreement-checkbox ${agreed ? 'agreement-checkbox--checked' : ''}`} onClick={() => setAgreed(!agreed)}>
            <Text>{agreed ? '✓' : ''}</Text>
          </View>
          <Text className="agreement-text">
            我已阅读并同意
            <Text className="agreement-link" onClick={goAgreement}>《用户协议》</Text>
            和
            <Text className="agreement-link" onClick={goPrivacy}>《隐私政策》</Text>
          </Text>
        </View>
      </View>

      <View className="login-footer">
        <Text className="login-footer-text">OPC技能星球 © 2026</Text>
      </View>
    </View>
  );
}
