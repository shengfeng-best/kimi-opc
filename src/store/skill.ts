import { create } from 'zustand';
import { Skill, Category } from '../types';

interface SkillState {
  skillList: Skill[];
  mySkillList: Skill[];
  currentSkill: Skill | null;
  categories: Category[];
  setSkillList: (list: Skill[]) => void;
  setMySkillList: (list: Skill[]) => void;
  setCurrentSkill: (skill: Skill | null) => void;
  setCategories: (categories: Category[]) => void;
}

export const useSkillStore = create<SkillState>((set) => ({
  skillList: [],
  mySkillList: [],
  currentSkill: null,
  categories: [],

  setSkillList: (list) => set({ skillList: list }),
  setMySkillList: (list) => set({ mySkillList: list }),
  setCurrentSkill: (skill) => set({ currentSkill: skill }),
  setCategories: (categories) => set({ categories }),
}));
