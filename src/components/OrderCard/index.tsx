import { View, Text } from '@tarojs/components';
import { Order, OrderStatus, ORDER_STATUS_CONFIG } from '../../types';
import { formatPriceFromFen, formatTimestamp } from '../../utils';
import './index.css';

interface OrderCardProps {
  order: Order;
  onClick?: (order: Order) => void;
  showActions?: boolean;
  onAction?: (order: Order, action: string) => void;
}

export default function OrderCard({ order, onClick, showActions = true, onAction }: OrderCardProps) {
  const statusConfig = ORDER_STATUS_CONFIG[order.status as OrderStatus] || ORDER_STATUS_CONFIG.pending_pay;

  const actions = showActions ? getQuickActions(order.status as OrderStatus) : [];

  return (
    <View className="order-card" onClick={() => onClick?.(order)}>
      <View className="order-card__header">
        <View className="order-card__info">
          <Text className="order-card__no">订单号: {order.orderNo}</Text>
          <Text className="order-card__time">{formatTimestamp(order.createAt, 'YYYY-MM-DD')}</Text>
        </View>
        <View className="order-card__status" style={{ backgroundColor: `${statusConfig.color}15`, color: statusConfig.color }}>
          <Text className="order-card__status-text">{statusConfig.label}</Text>
        </View>
      </View>

      <View className="order-card__body">
        <View className="order-card__skill">
          <Text className="order-card__skill-title">{order.skillTitle}</Text>
          <Text className="order-card__skill-price">{formatPriceFromFen(order.totalAmount)}</Text>
        </View>
        <View className="order-card__parties">
          <Text className="order-card__party">买家: {order.buyerName}</Text>
          <Text className="order-card__party">卖家: {order.sellerName}</Text>
        </View>
      </View>

      {actions.length > 0 && (
        <View className="order-card__footer">
          {actions.map((action) => (
            <View
              key={action.key}
              className={`order-card__action order-card__action--${action.type}`}
              onClick={(e) => { e.stopPropagation(); onAction?.(order, action.key); }}
            >
              <Text>{action.label}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

function getQuickActions(status: OrderStatus): { key: string; label: string; type: string }[] {
  switch (status) {
    case 'pending_pay': return [{ key: 'pay', label: '立即付款', type: 'primary' }];
    case 'pending_confirm': return [{ key: 'cancel', label: '取消订单', type: 'default' }];
    case 'in_progress': return [{ key: 'contact', label: '联系对方', type: 'default' }];
    case 'pending_accept': return [{ key: 'accept', label: '确认验收', type: 'primary' }];
    case 'completed': return [{ key: 'rate', label: '去评价', type: 'primary' }];
    default: return [];
  }
}
