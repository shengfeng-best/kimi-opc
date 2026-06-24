export type AuthStatus = 0 | 1 | 2;
export type AuthType = 'personal' | 'enterprise';
export type UserStatus = 0 | 1 | 2;

export interface User {
  id: string;
  openid: string;
  nickname: string;
  avatar: string;
  phone?: string;
  authStatus: AuthStatus;
  authType?: AuthType;
  creditScore: number;
  walletBalance: number;
  frozenBalance: number;
  status: UserStatus;
  totalOrders?: number;
  activeDays?: number;
  createdAt: string;
  updatedAt: string;
}

export const CREDIT_SCORE_CONFIG = {
  BASE_SCORE: 60,
  MAX_SCORE: 100,
  BONUS: {
    FIRST_ORDER: 5,
    HIGH_RATING: 10,
    ON_TIME: 5,
    ACTIVE_30_DAYS: 3,
    SKILL_CERTIFIED: 5,
  },
  PENALTY: {
    COMPLAINT: 20,
    DELAY: 5,
    FALSE_ADS: 10,
    HARASSMENT: 15,
    VIOLATION: 40,
  },
};

export const CREDIT_LEVEL_CONFIG = {
  EXCELLENT: { min: 90, max: 100, label: '优秀', color: '#ff976a', badge: 'orange' },
  GOOD: { min: 70, max: 89, label: '良好', color: '#07c160', badge: 'green' },
  WARNING: { min: 60, max: 69, label: '预警', color: '#ffb800', badge: 'yellow' },
  DANGER: { min: 0, max: 59, label: '危险', color: '#ff4d4f', badge: 'red' },
};

export type Role = 'visitor' | 'registered' | 'personal' | 'enterprise' | 'admin';

export const ROLE_PERMISSIONS: Record<Role, {
  browse: boolean;
  search: boolean;
  favorite: boolean;
  publishSkill: boolean;
  purchase: boolean;
  createTeam: boolean;
  withdraw: boolean;
  audit: boolean;
}> = {
  visitor: { browse: true, search: true, favorite: false, publishSkill: false, purchase: false, createTeam: false, withdraw: false, audit: false },
  registered: { browse: true, search: true, favorite: true, publishSkill: false, purchase: false, createTeam: false, withdraw: false, audit: false },
  personal: { browse: true, search: true, favorite: true, publishSkill: true, purchase: true, createTeam: true, withdraw: true, audit: false },
  enterprise: { browse: true, search: true, favorite: true, publishSkill: true, purchase: true, createTeam: true, withdraw: true, audit: false },
  admin: { browse: true, search: true, favorite: true, publishSkill: true, purchase: true, createTeam: true, withdraw: true, audit: true },
};
