import { request } from '../utils/request';
import { Skill, PaginationParams, PaginatedResult } from '../types';

export interface CreateSkillPayload {
  name: string;
  description: string;
  categoryId: string;
  price: number;
  images?: string[];
  tags?: string[];
  serviceProcess?: string[];
  deliverable?: string;
  applicableScene?: string;
  priceType?: 'per_time' | 'per_project' | 'monthly';
  additionalServices?: Array<{ name: string; price: number }>;
}

export async function getSkillList(
  params: PaginationParams & { categoryId?: string; keyword?: string; featured?: boolean },
) {
  return request.get<PaginatedResult<Skill>>('/skills', params);
}

export async function getSkillDetail(skillId: string) {
  return request.get<Skill>(`/skills/${skillId}`);
}

export async function createSkill(data: CreateSkillPayload) {
  return request.post<{ skillId: string }>('/skills', data);
}

export async function updateSkill(skillId: string, data: Partial<Skill>) {
  return request.put(`/skills/${skillId}`, data);
}

export async function deleteSkill(skillId: string) {
  return request.delete(`/skills/${skillId}`);
}

export async function getMySkills() {
  return request.get<Skill[]>('/skills/my');
}

export async function toggleSkillStatus(skillId: string, status: 'online' | 'offline') {
  return request.put(`/skills/${skillId}/status`, { status });
}

export async function collectSkill(skillId: string) {
  return request.post(`/skills/${skillId}/collect`);
}

export async function cancelCollectSkill(skillId: string) {
  return request.delete(`/skills/${skillId}/collect`);
}

export async function getCollectedSkills() {
  return request.get<Skill[]>('/skills/collected');
}
