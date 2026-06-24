export type TeamStatus = 'active' | 'dissolved' | 'suspended';
export type TeamMemberRole = 'leader' | 'admin' | 'member';
export type TeamMemberStatus = 'active' | 'inactive' | 'pending';

export interface Team {
  id: string;
  name: string;
  description: string;
  coverImage?: string;
  leaderId: string;
  leaderName: string;
  leaderAvatar?: string;
  memberCount: number;
  maxMemberCount: number;
  status: TeamStatus;
  skills: string[];
  createdAt: string;
  updatedAt: string;
}

export interface TeamMember {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  role: TeamMemberRole;
  status: TeamMemberStatus;
  joinAt: string;
  skills?: string[];
}

export interface TeamInvite {
  id: string;
  teamId: string;
  teamName: string;
  inviterId: string;
  inviterName: string;
  inviteePhone: string;
  status: 'pending' | 'accepted' | 'rejected';
  createAt: string;
}
