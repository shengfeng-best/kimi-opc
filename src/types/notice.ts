export type NoticeType =
  | 'system'
  | 'order'
  | 'skill'
  | 'team'
  | 'message'
  | 'wallet'
  | 'comment';

export type NoticeStatus = 'unread' | 'read';

export interface Notice {
  id: string;
  type: NoticeType;
  title: string;
  content: string;
  status: NoticeStatus;
  relatedId?: string;
  relatedType?: string;
  createTime: number;
  readTime?: number;
}
