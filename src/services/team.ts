import { request } from '../utils/request';
import { Team, TeamMember } from '../types/team';

export async function getTeamList(params?: { page?: number; pageSize?: number }): Promise<Team[]> {
  return request.get('/teams', params);
}

export async function getMyTeams(): Promise<Team[]> {
  return request.get('/teams/my');
}

export async function getTeamDetail(teamId: string): Promise<Team> {
  return request.get(`/teams/${teamId}`);
}

export async function createTeam(data: {
  name: string;
  description: string;
  coverImage?: string;
}): Promise<Team> {
  return request.post('/teams', data);
}

export async function updateTeam(teamId: string, data: Partial<Team>): Promise<void> {
  return request.put(`/teams/${teamId}`, data);
}

export async function dissolveTeam(teamId: string): Promise<void> {
  return request.delete(`/teams/${teamId}`);
}

export async function getTeamMembers(teamId: string): Promise<TeamMember[]> {
  return request.get(`/teams/${teamId}/members`);
}

export async function addTeamMember(teamId: string, userId: string): Promise<void> {
  return request.post(`/teams/${teamId}/members`, { userId });
}

export async function removeTeamMember(teamId: string, userId: string): Promise<void> {
  return request.delete(`/teams/${teamId}/members/${userId}`);
}

export async function updateMemberRole(teamId: string, userId: string, role: string): Promise<void> {
  return request.put(`/teams/${teamId}/members/${userId}/role`, { role });
}

export async function leaveTeam(teamId: string): Promise<void> {
  return request.post(`/teams/${teamId}/leave`);
}

export async function inviteMember(teamId: string, phone: string): Promise<void> {
  return request.post(`/teams/${teamId}/invite`, { phone });
}
