import { View, Text, Button } from '@tarojs/components';
import { useState } from 'react';
import { useRouter, showToast, navigateTo } from '@tarojs/taro';
import { paymentService } from '../../services/payment';
import { getOrderDetail } from '../../services/order';
import { formatPriceFromFen } from '../../utils';
import './detail.css';

export default function OrderDetailPage() {
  const { id } = useRouter().params;
  const [paying, setPaying] = useState(false);

  const handlePay = async () => {
    if (!id) return;
    setPaying(true);
    try {
      await paymentService.payOrder(id);
      showToast({ title: '支付成功', icon: 'success' });
    } catch (e: any) {
      if (e.message?.includes('取消')) {
        showToast({ title: '已取消支付', icon: 'none' });
      } else {
        showToast({ title: e.message || '支付失败', icon: 'none' });
      }
    } finally {
      setPaying(false);
    }
  };

  return (
    <View className="order-detail-page">
      <View className="order-detail__status">
        <Text className="status-icon">⏳</Text>
        <Text className="status-text">待付款</Text>
        <Text className="status-desc">请在24小时内完成支付</Text>
      </View>

      <View className="order-detail__info">
        <Text className="info-title">订单信息</Text>
        <View className="info-row">
          <Text className="info-label">订单编号</Text>
          <Text className="info-value">{id || 'DXZ1234567890'}</Text>
        </View>
        <View className="info-row">
          <Text className="info-label">服务名称</Text>
          <Text className="info-value">示例技能服务</Text>
        </View>
        <View className="info-row">
          <Text className="info-label">服务商</Text>
          <Text className="info-value">服务商A</Text>
        </View>
      </View>

      <View className="order-detail__amount">
        <Text className="amount-label">应付金额</Text>
        <Text className="amount-value">{formatPriceFromFen(29900)}</Text>
      </View>

      <View className="order-detail__actions">
        <Button className="pay-btn" type="primary" loading={paying} onClick={handlePay}>
          立即支付
        </Button>
        <Button className="cancel-btn" onClick={() => showToast({ title: '已取消', icon: 'none' })}>
          取消订单
        </Button>
      </View>
    </View>
  );
}
