import { View } from '@tarojs/components';
import { useEffect } from 'react';
import { reLaunch } from '@tarojs/taro';
import { useUserStore } from '../../store';
import './index.css';

export default function BootPage() {
  const userStore = useUserStore.getState();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (userStore.checkLogin()) {
        reLaunch({ url: '/pages/index/index' });
      } else {
        reLaunch({ url: '/pages/auth/login' });
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View className="boot-page">
      <View className="boot-logo">🚀</View>
      <View className="boot-title">OPC技能星球</View>
      <View className="boot-subtitle">技能交易 · 组队协作</View>
    </View>
  );
}
