import { View, Text, Button, ScrollView } from '@tarojs/components';
import { useState, useEffect } from 'react';
import { useRouter, showToast, navigateBack } from '@tarojs/taro';
import { paymentService } from '../../services/payment';
import { getOrderDetail } from '../../services/order';
import { Order } from '../../types';
import { formatPriceFromFen } from '../../utils';
import Skeleton from '../../components/Skeleton';
import ConfirmModal from '../../components/ConfirmModal';
import './index.css';

export default function WalletPage() {
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 模拟加载钱包数据
    setTimeout(() => {
      setBalance(125800);
      setLoading(false);
    }, 500);
  }, []);

  const handleRecharge = () => {
    showToast({ title: '充值功能开发中', icon: 'none' });
  };

  const handleWithdraw = () => {
    showToast({ title: '提现功能开发中', icon: 'none' });
  };

  if (loading) {
    return (
      <View className="wallet-page">
        <Skeleton rows={3} image />
      </View>
    );
  }

  return (
    <View className="wallet-page">
      <View className="wallet-header">
        <Text className="wallet-label">钱包余额</Text>
        <Text className="wallet-balance">{formatPriceFromFen(balance)}</Text>
        <View className="wallet-actions">
          <View className="wallet-action" onClick={handleRecharge}>
            <Text className="wallet-action-icon">💰</Text>
            <Text className="wallet-action-text">充值</Text>
          </View>
          <View className="wallet-action" onClick={handleWithdraw}>
            <Text className="wallet-action-icon">🏦</Text>
            <Text className="wallet-action-text">提现</Text>
          </View>
        </View>
      </View>

      <View className="wallet-section">
        <Text className="wallet-section-title">交易记录</Text>
        <View className="wallet-empty">
          <Text className="wallet-empty-icon">📋</Text>
          <Text className="wallet-empty-text">暂无交易记录</Text>
        </View>
      </View>
    </View>
  );
}
