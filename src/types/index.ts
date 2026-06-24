// ========== 基础类型定义 ==========

export type SkillStatus = 'draft' | 'pending' | 'online' | 'offline';

export type PriceMode = 'per_time' | 'per_project' | 'monthly';

export interface Skill {
  id: string;
  userId: string;
  title: string;
  description: string;
  categoryId: string;
  categoryName: string;
  subCategoryId: string;
  subCategoryName: string;
  tags: string[];
  price: number;
  priceType: PriceMode;
  coverImages: string[];
  serviceProcess: string[];
  deliverable: string;
  applicableScene?: string;
  additionalServices?: Array<{ name: string; price: number }>;
  status: SkillStatus;
  viewCount: number;
  consultCount: number;
  orderCount: number;
  rating: number;
  createdAt: string;
  updatedAt: string;
}

// ========== 统一错误码规范 ==========
export const ERROR_CODE = {
  SUCCESS: 0,
  PARAM_INVALID: 40001,
  PARAM_MISSING: 40002,
  PARAM_FORMAT_ERROR: 40003,
  AUTH_REQUIRED: 40101,
  AUTH_FAILED: 40102,
  TOKEN_INVALID: 40103,
  TOKEN_EXPIRED: 40104,
  PERMISSION_DENIED: 40301,
  ROLE_NOT_ALLOWED: 40302,
  USER_BANNED: 40303,
  RESOURCE_NOT_FOUND: 40401,
  USER_NOT_FOUND: 40402,
  SKILL_NOT_FOUND: 40403,
  ORDER_NOT_FOUND: 40404,
  SERVER_ERROR: 50001,
  DB_ERROR: 50002,
  THIRD_PARTY_ERROR: 50003,
};

export const ERROR_MESSAGE: Record<number, string> = {
  [ERROR_CODE.SUCCESS]: '操作成功',
  [ERROR_CODE.PARAM_INVALID]: '参数无效',
  [ERROR_CODE.PARAM_MISSING]: '缺少必要参数',
  [ERROR_CODE.PARAM_FORMAT_ERROR]: '参数格式错误',
  [ERROR_CODE.AUTH_REQUIRED]: '请先登录',
  [ERROR_CODE.AUTH_FAILED]: '认证失败',
  [ERROR_CODE.TOKEN_INVALID]: 'Token无效',
  [ERROR_CODE.TOKEN_EXPIRED]: 'Token已过期',
  [ERROR_CODE.PERMISSION_DENIED]: '无权限访问',
  [ERROR_CODE.ROLE_NOT_ALLOWED]: '该角色不允许此操作',
  [ERROR_CODE.USER_BANNED]: '账号已被封禁',
  [ERROR_CODE.RESOURCE_NOT_FOUND]: '资源不存在',
  [ERROR_CODE.USER_NOT_FOUND]: '用户不存在',
  [ERROR_CODE.SKILL_NOT_FOUND]: '技能不存在',
  [ERROR_CODE.ORDER_NOT_FOUND]: '订单不存在',
  [ERROR_CODE.SERVER_ERROR]: '服务器错误',
  [ERROR_CODE.DB_ERROR]: '数据库错误',
  [ERROR_CODE.THIRD_PARTY_ERROR]: '第三方服务错误',
};

export interface ApiResponse<T = any> {
  code: number;
  data?: T;
  message?: string;
  detail?: string;
}

export interface PaginatedResponse<T> {
  list: T[];
  total: number;
  pageNum: number;
  pageSize: number;
  hasMore: boolean;
}

export type PaginatedResult<T> = PaginatedResponse<T>;

export interface PaginationParams {
  pageNum?: number;
  pageSize?: number;
}

export interface Category {
  id: string;
  name: string;
  icon?: string;
  children?: Category[];
}

export interface Demand {
  id: string;
  userId: string;
  title: string;
  description: string;
  categoryId: string;
  categoryName: string;
  budget: number;
  deadline?: string;
  status: 'open' | 'matched' | 'closed';
  createdAt: string;
  updatedAt: string;
}

export interface WechatPayParams {
  appId: string;
  timeStamp: string;
  nonceStr: string;
  package: string;
  signType: 'HMAC-SHA256';
  paySign: string;
}

export interface WechatPayCallback {
  transaction_id: string;
  out_trade_no: string;
  trade_state: 'SUCCESS';
  total_fee: number;
  cash_fee: number;
  time_end: string;
}

export * from './user';
export * from './order';
export * from './notice';
export * from './team';
