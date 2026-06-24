import { View, Text, ScrollView, Image } from '@tarojs/components';
import { useState, useEffect } from 'react';
import { navigateTo, showToast } from '@tarojs/taro';
import { getSkillList } from '../../services/skill';
import { Skill, Category } from '../../types';
import SkillCard from '../../components/SkillCard';
import EmptyState from '../../components/EmptyState';
import Skeleton from '../../components/Skeleton';
import './index.css';

const CATEGORIES: Category[] = [
  { id: '1', name: '设计', icon: '🎨' },
  { id: '2', name: '开发', icon: '💻' },
  { id: '3', name: '写作', icon: '✍️' },
  { id: '4', name: '翻译', icon: '🌐' },
  { id: '5', name: '摄影', icon: '📷' },
  { id: '6', name: '咨询', icon: '💡' },
  { id: '7', name: '运营', icon: '📈' },
  { id: '8', name: '更多', icon: '⋯' },
];

export default function HomePage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('');

  useEffect(() => {
    loadSkills();
  }, [activeCategory]);

  const loadSkills = async () => {
    setLoading(true);
    try {
      const res = await getSkillList({ pageNum: 1, pageSize: 20, categoryId: activeCategory || undefined });
      setSkills(res?.list || []);
    } catch {
      setSkills([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSkillClick = (skill: Skill) => {
    navigateTo({ url: `/pages/skill/detail?id=${skill.id}` });
  };

  const handleSearch = () => {
    navigateTo({ url: '/pages/skill/search' });
  };

  return (
    <View className="home-page">
      <View className="home-search" onClick={handleSearch}>
        <Text className="home-search-icon">🔍</Text>
        <Text className="home-search-placeholder">搜索技能、需求</Text>
      </View>

      <View className="home-banner">
        <Image
          className="home-banner-image"
          src="https://via.placeholder.com/750x300/3B82F6/FFFFFF?text=OPC+Skill+Planet"
          mode="aspectFill"
        />
      </View>

      <View className="home-categories">
        {CATEGORIES.map((cat) => (
          <View key={cat.id} className="home-category" onClick={() => setActiveCategory(activeCategory === cat.id ? '' : cat.id)}>
            <Text className="home-category-icon">{cat.icon}</Text>
            <Text className="home-category-name">{cat.name}</Text>
          </View>
        ))}
      </View>

      <View className="home-section">
        <Text className="home-section-title">{activeCategory ? '分类技能' : '推荐技能'}</Text>
        <View className="home-skills">
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} rows={2} image />)
          ) : skills.length === 0 ? (
            <EmptyState
              icon="🔍"
              title="暂无技能"
              description="该分类下还没有技能"
              actionText="去发布"
              onAction={() => navigateTo({ url: '/pages/skill/publish' })}
            />
          ) : (
            skills.map((skill) => (
              <SkillCard key={skill.id} skill={skill} onClick={handleSkillClick} />
            ))
          )}
        </View>
      </View>
    </View>
  );
}
