import { request } from '../utils/request';
import { Order, OrderStatus, PaginatedResult } from '../types';

export async function getOrderList(params: { pageNum?: number; pageSize?: number; status?: OrderStatus }) {
  return request.get<PaginatedResult<Order>>('/orders', params);
}

export async function getOrderDetail(orderId: string) {
  return request.get<Order>(`/orders/${orderId}`);
}

export async function createOrder(data: {
  skillId: string;
  requirement?: string;
  extraServices?: Array<{ id: string; name: string; price: number }>;
}) {
  return request.post<{ orderId: string }>('/orders', data);
}

export async function cancelOrder(orderId: string) {
  return request.post(`/orders/${orderId}/cancel`);
}

export async function payOrder(orderId: string) {
  return request.post(`/orders/${orderId}/pay`);
}

export async function confirmOrder(orderId: string) {
  return request.post(`/orders/${orderId}/confirm`);
}

export async function deliverOrder(orderId: string, data: { deliverable: string; attachments?: string[] }) {
  return request.post(`/orders/${orderId}/deliver`, data);
}

export async function acceptOrder(orderId: string) {
  return request.post(`/orders/${orderId}/accept`);
}

export async function refundOrder(orderId: string, data: { reason: string; evidence?: string[] }) {
  return request.post(`/orders/${orderId}/refund`, data);
}

export async function rateOrder(orderId: string, data: { rating: number; content: string; tags?: string[] }) {
  return request.post(`/orders/${orderId}/rate`, data);
}

export async function getSellerOrders(params: { pageNum?: number; pageSize?: number; status?: OrderStatus }) {
  return request.get<PaginatedResult<Order>>('/orders/seller', params);
}
