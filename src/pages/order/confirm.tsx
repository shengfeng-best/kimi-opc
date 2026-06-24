import { View, Text, Button, Image } from '@tarojs/components';
import { useState, useEffect } from 'react';
import { useRouter, showToast, navigateTo } from '@tarojs/taro';
import { fetchOrderDetail } from '../../services/order';
import { requestPayment } from '../../services/payment';
import './confirm.css';

interface OrderConfirm {
  id: string;
  title: string;
  cover: string;
  price: number;
  quantity: number;
  serviceFee: number;
  total: number;
  seller: { name: string; avatar: string };
  remark: string;
}

export default function OrderConfirmPage() {
  const { id } = useRouter().params;
  const [order, setOrder] = useState<OrderConfirm | null>(null);
  const [loading, setLoading] = useState(false);
  const [paying, setPaying] = useState(false);

  useEffect(() => {
    if (!id) return;
    fetchOrderDetail(id).then((d) => setOrder(d)).catch(() => {});
  }, [id]);

  const handlePay = async () => {
    if (!order) return;
    setPaying(true);
    try {
      const { payParams } = await requestPayment.createPayment(order.id);
      await requestPayment.requestWechatPay(payParams);
      showToast({ title: '支付成功', icon: 'success' });
      setTimeout(() => navigateTo({ url: '/pages/order/list' }), 800);
    } catch (e: any) {
      showToast({ title: e.message || '支付失败', icon: 'none' });
    } finally {
      setPaying(false);
    }
  };

  if (!order) {
    return (
      <View className="confirm-skeleton">
        <View className="skeleton-block" style={{ height: 100 }} />
        <View className="skeleton-block" style={{ height: 200, marginTop: 12 }} />
        <View className="skeleton-block" style={{ height: 60, marginTop: 12 }} />
      </View>
    );
  }

  return (
    <View className="order-confirm">
      <View className="confirm-header">
        <Text className="confirm-title">确认订单</Text>
      </View>

      <View className="confirm-seller">
        <Image className="confirm-avatar" src={order.seller.avatar} />
        <Text className="confirm-seller-name">{order.seller.name}</Text>
      </View>

      <View className="confirm-skill">
        <Image className="confirm-cover" src={order.cover} />
        <View className="confirm-skill-info">
          <Text className="confirm-skill-title">{order.title}</Text>
          <Text className="confirm-skill-price">¥{(order.price / 100).toFixed(2)} x {order.quantity}</Text>
        </View>
      </View>

      <View className="confirm-remark">
        <Text className="confirm-label">订单备注</Text>
        <Text className="confirm-remark-text">{order.remark || '无'}</Text>
      </View>

      <View className="confirm-fee">
        <View className="fee-row">
          <Text>服务费用</Text>
          <Text>¥{(order.price * order.quantity / 100).toFixed(2)}</Text>
        </View>
        <View className="fee-row">
          <Text>平台服务费</Text>
          <Text>¥{(order.serviceFee / 100).toFixed(2)}</Text>
        </View>
        <View className="fee-row fee-total">
          <Text>合计</Text>
          <Text className="fee-total-price">¥{(order.total / 100).toFixed(2)}</Text>
        </View>
      </View>

      <View className="confirm-footer">
        <View className="confirm-total">
          <Text>实付:</Text>
          <Text className="confirm-total-price">¥{(order.total / 100).toFixed(2)}</Text>
        </View>
        <Button className="confirm-pay" loading={paying} onClick={handlePay}>
          微信支付
        </Button>
      </View>
    </View>
  );
}
