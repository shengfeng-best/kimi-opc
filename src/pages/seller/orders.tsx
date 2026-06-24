import { View, Text, Image, ScrollView } from '@tarojs/components';
import { useState, useEffect } from 'react';
import { showToast, navigateTo } from '@tarojs/taro';
import { fetchSellerOrders } from '../../services/order';
import './orders.css';

interface SellerOrder {
  id: string;
  title: string;
  cover: string;
  price: number;
  status: 'pending' | 'paid' | 'delivering' | 'completed' | 'cancelled';
  buyer: { name: string; avatar: string };
  createdAt: string;
}

const STATUS_TABS = [
  { key: 'all', label: '全部' },
  { key: 'pending', label: '待付款' },
  { key: 'paid', label: '进行中' },
  { key: 'delivering', label: '待交付' },
  { key: 'completed', label: '已完成' },
];

const STATUS_MAP: Record<string, string> = {
  pending: '待付款',
  paid: '已付款',
  delivering: '交付中',
  completed: '已完成',
  cancelled: '已取消',
};

export default function SellerOrdersPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [orders, setOrders] = useState<SellerOrder[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const data = await fetchSellerOrders(activeTab === 'all' ? undefined : activeTab as any);
      setOrders(data);
    } catch (e: any) {
      showToast({ title: e.message || '加载失败', icon: 'none' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [activeTab]);

  const handleOrder = (id: string) => {
    navigateTo({ url: `/pages/order/fulfill?id=${id}` });
  };

  return (
    <View className="seller-orders">
      <View className="seller-orders-header">
        <Text className="seller-orders-title">我的订单</Text>
      </View>

      <ScrollView scrollX className="seller-orders-tabs">
        {STATUS_TABS.map((tab) => (
          <View
            key={tab.key}
            className={`seller-tab ${activeTab === tab.key ? 'seller-tab--active' : ''}`}
            onClick={() => setActiveTab(tab.key)}
          >
            <Text>{tab.label}</Text>
          </View>
        ))}
      </ScrollView>

      <View className="seller-orders-list">
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <View key={i} className="seller-order-skeleton">
              <View className="skeleton-block" style={{ height: 100 }} />
            </View>
          ))
        ) : orders.length === 0 ? (
          <View className="seller-empty">
            <Text className="seller-empty-text">暂无订单</Text>
          </View>
        ) : (
          orders.map((order) => (
            <View key={order.id} className="seller-order" onClick={() => handleOrder(order.id)}>
              <View className="seller-order-header">
                <View className="seller-order-buyer">
                  <Image className="seller-buyer-avatar" src={order.buyer.avatar} />
                  <Text className="seller-buyer-name">{order.buyer.name}</Text>
                </View>
                <Text className={`seller-order-status seller-order-status--${order.status}`}>
                  {STATUS_MAP[order.status]}
                </Text>
              </View>
              <View className="seller-order-skill">
                <Image className="seller-order-cover" src={order.cover} />
                <View className="seller-order-info">
                  <Text className="seller-order-title">{order.title}</Text>
                  <Text className="seller-order-price">¥{(order.price / 100).toFixed(2)}</Text>
                </View>
              </View>
              <Text className="seller-order-date">{order.createdAt}</Text>
            </View>
          ))
        )}
      </View>
    </View>
  );
}
