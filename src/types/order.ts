export type OrderStatus =
  | 'pending_pay'
  | 'pending_confirm'
  | 'in_progress'
  | 'pending_accept'
  | 'completed'
  | 'cancelled'
  | 'refunded'
  | 'arbitration';

export type LegacyOrderStatus =
  | 'pending_payment'
  | 'in_service'
  | 'pending_acceptance'
  | 'done'
  | 'closed';

const LEGACY_STATUS_MAP: Record<LegacyOrderStatus, OrderStatus> = {
  pending_payment: 'pending_pay',
  in_service: 'in_progress',
  pending_acceptance: 'pending_accept',
  done: 'completed',
  closed: 'cancelled',
};

export function normalizeOrderStatus(status: string): OrderStatus {
  if ((status as LegacyOrderStatus) in LEGACY_STATUS_MAP) {
    return LEGACY_STATUS_MAP[status as LegacyOrderStatus];
  }
  return status as OrderStatus;
}

export const ORDER_STATUS_CONFIG: Record<OrderStatus, {
  label: string;
  color: string;
  description: string;
}> = {
  pending_pay: { label: '待付款', color: '#ff976a', description: '等待买家付款，24h未付款自动取消' },
  pending_confirm: { label: '待确认', color: '#07c160', description: '等待服务商确认接单，48h未接单自动退款' },
  in_progress: { label: '服务中', color: '#1989fa', description: '服务商正在为您服务' },
  pending_accept: { label: '待验收', color: '#07c160', description: '等待买家验收成果，7天未操作自动确认' },
  completed: { label: '已完成', color: '#07c160', description: '订单已完成，款项已打给服务商' },
  cancelled: { label: '已取消', color: '#969799', description: '订单已取消' },
  refunded: { label: '已退款', color: '#969799', description: '已退款至买家账户' },
  arbitration: { label: '仲裁中', color: '#ff4d4f', description: '交易争议处理中' },
};

export const ORDER_TIMEOUT_CONFIG = {
  PAYMENT: 24 * 60 * 60 * 1000,
  CONFIRM: 48 * 60 * 60 * 1000,
  ACCEPT: 7 * 24 * 60 * 60 * 1000,
  CONSULT: 72 * 60 * 60 * 1000,
  COMMENT: 30 * 24 * 60 * 60 * 1000,
};

export interface Order {
  id: string;
  orderNo: string;
  skillId: string;
  skillTitle: string;
  skillCover: string;
  buyerId: string;
  buyerName: string;
  sellerId: string;
  sellerName: string;
  totalAmount: number;
  platformFee: number;
  sellerIncome: number;
  status: OrderStatus;
  requirement?: string;
  extraServices?: ExtraService[];
  expireAt: number;
  paidAt?: number;
  confirmedAt?: number;
  startedAt?: number;
  deliveredAt?: number;
  acceptedAt?: number;
  completedAt?: number;
  cancelledAt?: number;
  refundAt?: number;
  createAt: number;
  updatedAt: number;
}

export interface ExtraService {
  id: string;
  name: string;
  price: number;
}

export interface OrderAction {
  key: string;
  label: string;
  type: 'primary' | 'default' | 'warn' | 'danger';
  action: string;
}

export function getOrderActions(
  status: OrderStatus,
  role: 'buyer' | 'seller'
): OrderAction[] {
  const safeStatus = normalizeOrderStatus(status);
  const buyerActions: Record<OrderStatus, OrderAction[]> = {
    pending_pay: [
      { key: 'cancel', label: '取消订单', type: 'default', action: 'cancel' },
      { key: 'pay', label: '立即付款', type: 'primary', action: 'pay' },
    ],
    pending_confirm: [
      { key: 'cancel', label: '取消订单', type: 'warn', action: 'cancel' },
      { key: 'contact', label: '联系服务商', type: 'default', action: 'contact' },
    ],
    in_progress: [
      { key: 'contact', label: '联系服务商', type: 'default', action: 'contact' },
      { key: 'refund', label: '申请退款', type: 'warn', action: 'refund' },
    ],
    pending_accept: [
      { key: 'contact', label: '联系服务商', type: 'default', action: 'contact' },
      { key: 'accept', label: '确认验收', type: 'primary', action: 'accept' },
      { key: 'refund', label: '申请退款', type: 'warn', action: 'refund' },
    ],
    completed: [
      { key: 'rate', label: '去评价', type: 'primary', action: 'rate' },
      { key: 'rebuy', label: '再次购买', type: 'default', action: 'rebuy' },
      { key: 'arbitration', label: '申请仲裁', type: 'danger', action: 'arbitration' },
    ],
    cancelled: [
      { key: 'delete', label: '删除订单', type: 'default', action: 'delete' },
      { key: 'rebuy', label: '再次购买', type: 'default', action: 'rebuy' },
    ],
    refunded: [
      { key: 'delete', label: '删除订单', type: 'default', action: 'delete' },
      { key: 'rebuy', label: '再次购买', type: 'default', action: 'rebuy' },
    ],
    arbitration: [
      { key: 'contact', label: '联系服务商', type: 'default', action: 'contact' },
      { key: 'cancel', label: '撤销仲裁', type: 'warn', action: 'cancel' },
    ],
  };

  const sellerActions: Record<OrderStatus, OrderAction[]> = {
    pending_pay: [],
    pending_confirm: [
      { key: 'refuse', label: '拒绝接单', type: 'default', action: 'refuse' },
      { key: 'accept', label: '确认接单', type: 'primary', action: 'accept' },
    ],
    in_progress: [
      { key: 'deliver', label: '提交交付物', type: 'primary', action: 'deliver' },
      { key: 'contact', label: '联系买家', type: 'default', action: 'contact' },
    ],
    pending_accept: [
      { key: 'contact', label: '联系买家', type: 'default', action: 'contact' },
    ],
    completed: [
      { key: 'contact', label: '联系买家', type: 'default', action: 'contact' },
    ],
    cancelled: [],
    refunded: [
      { key: 'contact', label: '联系买家', type: 'default', action: 'contact' },
    ],
    arbitration: [
      { key: 'contact', label: '联系买家', type: 'default', action: 'contact' },
      { key: 'submit', label: '提交凭证', type: 'primary', action: 'submit' },
    ],
  };

  return role === 'buyer' ? buyerActions[safeStatus] : sellerActions[safeStatus];
}

export interface OrderStep {
  key: string;
  label: string;
  description: string;
  time?: string;
  completed: boolean;
  current: boolean;
}

export function getOrderSteps(status: OrderStatus, order: Order): OrderStep[] {
  const normalizedStatus = normalizeOrderStatus(status);
  const baseSteps = [
    { key: 'create', label: '创建订单', description: '买家下单' },
    { key: 'pay', label: '付款成功', description: '买家付款' },
    { key: 'confirm', label: '服务商接单', description: '服务商确认接单' },
    { key: 'service', label: '服务中', description: '开始服务' },
    { key: 'deliver', label: '交付成果', description: '提交交付物' },
    { key: 'accept', label: '确认验收', description: '买家验收' },
    { key: 'complete', label: '订单完成', description: '款项结算' },
  ];

  const statusOrder: OrderStatus[] = [
    'pending_pay', 'pending_confirm', 'in_progress', 'pending_accept', 'completed',
  ];

  const currentIndex = statusOrder.indexOf(normalizedStatus);

  const stepTimeMap: Record<string, string | undefined> = {
    create: order.createAt ? String(order.createAt) : undefined,
    pay: order.paidAt ? String(order.paidAt) : undefined,
    confirm: order.confirmedAt ? String(order.confirmedAt) : undefined,
    service: order.startedAt ? String(order.startedAt) : undefined,
    deliver: order.deliveredAt ? String(order.deliveredAt) : undefined,
    accept: order.acceptedAt ? String(order.acceptedAt) : undefined,
    complete: order.completedAt ? String(order.completedAt) : undefined,
  };

  return baseSteps.map((step, index) => {
    let completed = false;
    let current = false;
    if (normalizedStatus === 'cancelled' || normalizedStatus === 'refunded' || normalizedStatus === 'arbitration') {
      completed = index < currentIndex;
    } else {
      completed = index < currentIndex;
      current = index === currentIndex;
    }
    return {
      ...step,
      completed,
      current,
      time: stepTimeMap[step.key] || '',
    };
  });
}

export function fenToYuan(fen: number): string {
  return (fen / 100).toFixed(2);
}

export function yuanToFen(yuan: number): number {
  return Math.round(yuan * 100);
}
