import { View, Text, ScrollView } from '@tarojs/components';
import { useState, useEffect } from 'react';
import { navigateTo, showToast } from '@tarojs/taro';
import { getOrderList } from '../../services/order';
import { Order, OrderStatus } from '../../types';
import OrderCard from '../../components/OrderCard';
import EmptyState from '../../components/EmptyState';
import Skeleton from '../../components/Skeleton';
import './list.css';

const STATUS_TABS: { key: OrderStatus | ''; label: string }[] = [
  { key: '', label: '全部' },
  { key: 'pending_pay', label: '待付款' },
  { key: 'in_progress', label: '服务中' },
  { key: 'pending_accept', label: '待验收' },
  { key: 'completed', label: '已完成' },
];

export default function OrderListPage() {
  const [activeStatus, setActiveStatus] = useState<OrderStatus | ''>('');
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, [activeStatus]);

  const loadOrders = async () => {
    setLoading(true);
    try {
      const res = await getOrderList({ pageNum: 1, pageSize: 20, status: activeStatus || undefined });
      setOrders(res?.list || []);
    } catch {
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const handleOrderClick = (order: Order) => {
    navigateTo({ url: `/pages/order/detail?id=${order.id}` });
  };

  const handleAction = (order: Order, action: string) => {
    showToast({ title: `操作: ${action}`, icon: 'none' });
  };

  return (
    <View className="order-list-page">
      <View className="order-tabs">
        {STATUS_TABS.map((tab) => (
          <View
            key={tab.key}
            className={`order-tab ${activeStatus === tab.key ? 'order-tab--active' : ''}`}
            onClick={() => setActiveStatus(tab.key)}
          >
            <Text>{tab.label}</Text>
          </View>
        ))}
      </View>

      <ScrollView scrollY className="order-list">
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} rows={2} image />)
        ) : orders.length === 0 ? (
          <EmptyState
            icon="📦"
            title="暂无订单"
            description="还没有相关订单"
            actionText="去逛逛"
            onAction={() => navigateTo({ url: '/pages/index/index' })}
          />
        ) : (
          orders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              onClick={handleOrderClick}
              onAction={handleAction}
            />
          ))
        )}
      </ScrollView>
    </View>
  );
}
