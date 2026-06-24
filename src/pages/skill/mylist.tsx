import { View, Text, Image, ScrollView } from '@tarojs/components';
import { useState, useEffect } from 'react';
import { showToast, navigateTo } from '@tarojs/taro';
import './mylist.css';

interface Skill {
  id: string;
  title: string;
  cover: string;
  price: number;
  status: 'online' | 'offline';
  sales: number;
  rating: number;
}

const STATUS_TABS = [
  { key: 'all', label: '全部' },
  { key: 'online', label: '已上架' },
  { key: 'offline', label: '已下架' },
];

export default function SkillMyListPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      // TODO: replace with real API
      const mock: Skill[] = [
        { id: '1', title: 'Logo设计', cover: 'https://via.placeholder.com/300x200', price: 50000, status: 'online', sales: 12, rating: 4.8 },
        { id: '2', title: '小程序开发', cover: 'https://via.placeholder.com/300x200', price: 200000, status: 'online', sales: 5, rating: 4.9 },
        { id: '3', title: '文案写作', cover: 'https://via.placeholder.com/300x200', price: 20000, status: 'offline', sales: 0, rating: 0 },
      ];
      setSkills(
        activeTab === 'all' ? mock : mock.filter((s) => s.status === activeTab)
      );
    } catch (e: any) {
      showToast({ title: e.message || '加载失败', icon: 'none' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [activeTab]);

  const toggleStatus = (skill: Skill) => {
    const next = skill.status === 'online' ? 'offline' : 'online';
    setSkills((prev) =>
      prev.map((s) => (s.id === skill.id ? { ...s, status: next } : s))
    );
    showToast({ title: next === 'online' ? '已上架' : '已下架', icon: 'none' });
  };

  const deleteSkill = (id: string) => {
    setSkills((prev) => prev.filter((s) => s.id !== id));
    showToast({ title: '已删除', icon: 'none' });
  };

  const handleEdit = (id: string) => {
    navigateTo({ url: `/pages/skill/publish?id=${id}` });
  };

  const getStatusBadge = (status: string) => {
    return status === 'online'
      ? { text: '已上架', color: '#22c55e', bg: '#d1fae5' }
      : { text: '已下架', color: '#9ca3af', bg: '#f3f4f6' };
  };

  return (
    <View className="skill-mylist">
      <View className="mylist-header">
        <Text className="mylist-title">我的技能</Text>
      </View>

      <ScrollView scrollX className="mylist-tabs">
        {STATUS_TABS.map((tab) => (
          <View
            key={tab.key}
            className={`mylist-tab ${activeTab === tab.key ? 'mylist-tab--active' : ''}`}
            onClick={() => setActiveTab(tab.key)}
          >
            <Text>{tab.label}</Text>
          </View>
        ))}
      </ScrollView>

      <View className="mylist-content">
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <View key={i} className="mylist-skeleton">
              <View className="skeleton-block" style={{ height: 100 }} />
            </View>
          ))
        ) : skills.length === 0 ? (
          <View className="mylist-empty">
            <Text className="mylist-empty-text">暂无技能</Text>
          </View>
        ) : (
          skills.map((skill) => {
            const badge = getStatusBadge(skill.status);
            return (
              <View key={skill.id} className="mylist-card">
                <Image className="mylist-cover" src={skill.cover} />
                <View className="mylist-info">
                  <View className="mylist-row">
                    <Text className="mylist-name">{skill.title}</Text>
                    <View className="mylist-badge" style={{ background: badge.bg }}>
                      <Text style={{ color: badge.color }}>{badge.text}</Text>
                    </View>
                  </View>
                  <Text className="mylist-price">¥{(skill.price / 100).toFixed(2)}</Text>
                  <Text className="mylist-stats">销量 {skill.sales} · 评分 {skill.rating || '-'}</Text>
                </View>
                <View className="mylist-actions">
                  <Text className="mylist-action" onClick={() => handleEdit(skill.id)}>编辑</Text>
                  <Text className="mylist-action" onClick={() => toggleStatus(skill)}>
                    {skill.status === 'online' ? '下架' : '上架'}
                  </Text>
                  <Text className="mylist-action mylist-action--danger" onClick={() => deleteSkill(skill.id)}>
                    删除
                  </Text>
                </View>
              </View>
            );
          })
        )}
      </View>
    </View>
  );
}
