import { View, Text, Image, ScrollView } from '@tarojs/components';
import { useState, useEffect } from 'react';
import { useRouter, navigateTo, showToast, showModal } from '@tarojs/taro';
import { getTeamDetail, getTeamMembers, dissolveTeam, leaveTeam } from '../../services/team';
import { Team, TeamMember } from '../../types/team';
import Skeleton from '../../components/Skeleton';
import './detail.css';

export default function TeamDetail() {
  const { id } = useRouter().params;
  const [team, setTeam] = useState<Team | null>(null);
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) loadDetail(id);
  }, [id]);

  const loadDetail = async (teamId: string) => {
    setLoading(true);
    try {
      const [teamData, membersData] = await Promise.all([
        getTeamDetail(teamId),
        getTeamMembers(teamId),
      ]);
      setTeam(teamData);
      setMembers(membersData);
    } catch (e: any) {
      showToast({ title: e.message || '加载失败', icon: 'none' });
    } finally {
      setLoading(false);
    }
  };

  const handleManageMembers = () => {
    if (!id) return;
    navigateTo({ url: `/pages/team/members?id=${id}` });
  };

  const handleDissolve = async () => {
    if (!id || !team) return;
    const res = await showModal({
      title: '确认解散',
      content: `确定要解散团队 "${team.name}" 吗？此操作不可撤销。`,
      confirmColor: '#ef4444',
    });
    if (res.confirm) {
      try {
        await dissolveTeam(id);
        showToast({ title: '已解散', icon: 'success' });
        wx.navigateBack();
      } catch (e: any) {
        showToast({ title: e.message || '操作失败', icon: 'none' });
      }
    }
  };

  const handleLeave = async () => {
    if (!id) return;
    const res = await showModal({
      title: '确认退出',
      content: '确定要退出该团队吗？',
    });
    if (res.confirm) {
      try {
        await leaveTeam(id);
        showToast({ title: '已退出', icon: 'success' });
        wx.navigateBack();
      } catch (e: any) {
        showToast({ title: e.message || '操作失败', icon: 'none' });
      }
    }
  };

  if (loading) {
    return (
      <View className="team-detail">
        <Skeleton rows={3} image />
      </View>
    );
  }

  if (!team) {
    return (
      <View className="team-detail team-detail--empty">
        <Text>团队不存在或已被解散</Text>
      </View>
    );
  }

  return (
    <View className="team-detail">
      <View className="team-detail__header">
        <Image className="team-detail__cover" src={team.coverImage || 'https://via.placeholder.com/200'} mode="aspectFill" />
        <View className="team-detail__info">
          <Text className="team-detail__name">{team.name}</Text>
          <Text className="team-detail__desc">{team.description}</Text>
          <View className="team-detail__meta">
            <Text>队长: {team.leaderName}</Text>
            <Text>{team.memberCount}人</Text>
          </View>
        </View>
      </View>

      <View className="team-detail__section">
        <View className="section-header">
          <Text className="section-title">团队成员</Text>
          <Text className="section-action" onClick={handleManageMembers}>管理</Text>
        </View>
        <View className="member-list">
          {members.slice(0, 6).map((member) => (
            <View key={member.id} className="member-item">
              <Image className="member-avatar" src={member.userAvatar || 'https://via.placeholder.com/48'} mode="aspectFill" />
              <Text className="member-name">{member.userName}</Text>
              <Text className={`member-role member-role--${member.role}`}>
                {member.role === 'leader' ? '队长' : member.role === 'admin' ? '管理员' : '成员'}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <View className="team-detail__actions">
        <View className="action-btn action-btn--primary" onClick={handleManageMembers}>
          <Text>成员管理</Text>
        </View>
        <View className="action-btn action-btn--danger" onClick={handleDissolve}>
          <Text>解散团队</Text>
        </View>
        <View className="action-btn action-btn--default" onClick={handleLeave}>
          <Text>退出团队</Text>
        </View>
      </View>
    </View>
  );
}
