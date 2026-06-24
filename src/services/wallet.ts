import { request } from '../utils/request';

export interface WalletInfo {
  balance: number;
  frozenBalance: number;
  availableBalance: number;
  totalIncome: number;
  totalWithdraw: number;
}

export type TransactionType = 'income' | 'expense' | 'withdraw' | 'refund' | 'frozen' | 'unfrozen';
export type TransactionStatus = 'pending' | 'completed' | 'failed';

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  balanceAfter: number;
  status: TransactionStatus;
  orderId?: string;
  orderNo?: string;
  title: string;
  description?: string;
  createTime: number;
}

export interface WithdrawRequest {
  amount: number;
  bankCardId?: string;
  alipayAccount?: string;
}

export const WITHDRAW_FEE_CONFIG = {
  RATE: 0.001,
  MIN_FEE: 1,
};

export const walletService = {
  async getWalletInfo(): Promise<WalletInfo> {
    return request.get('/wallet/info');
  },

  async getTransactions(params: {
    pageNum?: number;
    pageSize?: number;
    type?: TransactionType;
  }): Promise<{ list: Transaction[]; total: number; hasMore: boolean }> {
    return request.get('/wallet/transactions', params);
  },

  async applyWithdraw(data: WithdrawRequest): Promise<{
    withdrawId: string;
    amount: number;
    fee: number;
    arriveTime: string;
  }> {
    return request.post('/wallet/withdraw', data);
  },

  async getWithdrawRecords(params?: { pageNum?: number; pageSize?: number }): Promise<{
    list: {
      id: string;
      amount: number;
      fee: number;
      realAmount: number;
      status: 'pending' | 'completed' | 'failed';
      createTime: number;
      completeTime?: number;
    }[];
    total: number;
  }> {
    return request.get('/wallet/withdraw/records', params);
  },

  async createPayment(orderId: string): Promise<{
    orderId: string;
    totalAmount: number;
    payParams: {
      appId: string;
      timeStamp: string;
      nonceStr: string;
      package: string;
      signType: 'HMAC-SHA256';
      paySign: string;
    };
  }> {
    return request.post('/wallet/pay', { orderId });
  },

  async rechargeScore(amount: number): Promise<{
    rechargeId: string;
    amount: number;
    payParams: {
      appId: string;
      timeStamp: string;
      nonceStr: string;
      package: string;
      signType: 'HMAC-SHA256';
      paySign: string;
    };
  }> {
    return request.post('/wallet/recharge', { amount });
  },

  calculateWithdrawFee(amount: number): number {
    const fee = Math.round(amount * WITHDRAW_FEE_CONFIG.RATE);
    return Math.max(fee, WITHDRAW_FEE_CONFIG.MIN_FEE);
  },
};

export function formatMoney(fen: number): string {
  return `¥${(fen / 100).toFixed(2)}`;
}
