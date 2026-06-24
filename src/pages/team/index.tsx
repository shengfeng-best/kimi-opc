import { View, Text, Image, ScrollView } from '@tarojs/components';
import { useState, useEffect } from 'react';
import { navigateTo, showToast } from '@tarojs/taro';
import { getTeamList, getMyTeams } from '../../services/team';
import { Team } from '../../types/team';
import EmptyState from '../../components/EmptyState';
import Skeleton from '../../components/Skeleton';
import './index.css';

export default function TeamIndex() {
  const [activeTab, setActiveTab] = useState<'discover' | 'my'>('discover');
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTeams();
  }, [activeTab]);

  const loadTeams = async () => {
    setLoading(true);
    try {
      const data = activeTab === 'discover'
        ? await getTeamList({ page: 1, pageSize: 20 })
        : await getMyTeams();
      setTeams(data || []);
    } catch {
      setTeams([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    navigateTo({ url: '/pages/team/create' });
  };

  const handleDetail = (teamId: string) => {
    navigateTo({ url: `/pages/team/detail?id=${teamId}` });
  };

  return (
    <View className="team-index">
      <View className="team-header">
        <View className="team-tabs">
          <View className={`team-tab ${activeTab === 'discover' ? 'team-tab--active' : ''}`} onClick={() => setActiveTab('discover')}>
            <Text>发现团队</Text>
          </View>
          <View className={`team-tab ${activeTab === 'my' ? 'team-tab--active' : ''}`} onClick={() => setActiveTab('my')}>
            <Text>我的团队</Text>
          </View>
        </View>
        <View className="team-create-btn" onClick={handleCreate}>
          <Text>+ 创建</Text>
        </View>
      </View>

      <ScrollView scrollY className="team-list">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} rows={2} avatar />)
        ) : teams.length === 0 ? (
          <EmptyState
            icon="👥"
            title={activeTab === 'discover' ? '暂无团队' : '你还没有加入任何团队'}
            description={activeTab === 'discover' ? '快去创建第一个团队吧' : '去发现页寻找感兴趣的团队'}
            actionText={activeTab === 'discover' ? '创建团队' : undefined}
            onAction={activeTab === 'discover' ? handleCreate : undefined}
          />
        ) : (
          teams.map((team) => (
            <View key={team.id} className="team-card" onClick={() => handleDetail(team.id)}>
              <View className="team-card__header">
                <Image className="team-card__cover" src={team.coverImage || 'https://via.placeholder.com/80'} mode="aspectFill" />
                <View className="team-card__info">
                  <Text className="team-card__name">{team.name}</Text>
                  <Text className="team-card__desc" numberOfLines={2}>{team.description}</Text>
                  <View className="team-card__meta">
                    <Text className="team-card__leader">队长: {team.leaderName}</Text>
                    <Text className="team-card__members">{team.memberCount}/{team.maxMemberCount}人</Text>
                  </View>
                </View>
              </View>
              <View className="team-card__skills">
                {team.skills?.map((skill, i) => (
                  <Text key={i} className="team-card__skill-tag">{skill}</Text>
                ))}
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}
