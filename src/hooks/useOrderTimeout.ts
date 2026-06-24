import { useState, useEffect } from 'react';
import { Order, ORDER_TIMEOUT_CONFIG } from '../types';

export function useOrderTimeout(order: Order) {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (!order || !order.expireAt) return;
    const timer = setInterval(() => {
      const now = Date.now();
      const left = order.expireAt - now;
      setTimeLeft(Math.max(0, left));
    }, 1000);
    return () => clearInterval(timer);
  }, [order?.expireAt]);

  const formatTimeLeft = () => {
    if (timeLeft <= 0) return '已超时';
    const hours = Math.floor(timeLeft / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
    return `${hours}时${minutes}分${seconds}秒`;
  };

  return { timeLeft, formatTimeLeft, isTimeout: timeLeft <= 0 };
}
