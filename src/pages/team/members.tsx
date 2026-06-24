import { View, Text, Image, ScrollView } from '@tarojs/components';
import { useState, useEffect } from 'react';
import { useRouter, showToast, showModal } from '@tarojs/taro';
import { getTeamMembers, removeTeamMember, updateMemberRole, inviteMember } from '../../services/team';
import { TeamMember } from '../../types/team';
import Skeleton from '../../components/Skeleton';
import './members.css';

export default function TeamMembers() {
  const { id } = useRouter().params;
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [invitePhone, setInvitePhone] = useState('');

  useEffect(() => {
    if (id) loadMembers(id);
  }, [id]);

  const loadMembers = async (teamId: string) => {
    setLoading(true);
    try {
      const data = await getTeamMembers(teamId);
      setMembers(data);
    } catch (e: any) {
      showToast({ title: e.message || '加载失败', icon: 'none' });
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (member: TeamMember) => {
    if (!id) return;
    const res = await showModal({
      title: '移除成员',
      content: `确定移除 "${member.userName}" 吗？`,
      confirmColor: '#ef4444',
    });
    if (res.confirm) {
      try {
        await removeTeamMember(id, member.userId);
        showToast({ title: '已移除', icon: 'success' });
        loadMembers(id);
      } catch (e: any) {
        showToast({ title: e.message || '操作失败', icon: 'none' });
      }
    }
  };

  const handleRoleChange = async (member: TeamMember, newRole: string) => {
    if (!id) return;
    try {
      await updateMemberRole(id, member.userId, newRole);
      showToast({ title: '权限已更新', icon: 'success' });
      loadMembers(id);
    } catch (e: any) {
      showToast({ title: e.message || '操作失败', icon: 'none' });
    }
  };

  const handleInvite = async () => {
    if (!id || !invitePhone.trim()) return;
    try {
      await inviteMember(id, invitePhone.trim());
      showToast({ title: '邀请已发送', icon: 'success' });
      setInvitePhone('');
    } catch (e: any) {
      showToast({ title: e.message || '邀请失败', icon: 'none' });
    }
  };

  if (loading) {
    return (
      <View className="team-members">
        <Skeleton rows={3} avatar />
      </View>
    );
  }

  return (
    <View className="team-members">
      <View className="team-members__invite">
        <Text className="invite-label">邀请成员</Text>
        <View className="invite-form">
          <Input
            className="invite-input"
            placeholder="输入手机号"
            type="number"
            maxLength={11}
            value={invitePhone}
            onInput={(e) => setInvitePhone(e.detail.value)}
          />
          <View className="invite-btn" onClick={handleInvite}>
            <Text>邀请</Text>
          </View>
        </View>
      </View>

      <View className="team-members__list">
        <Text className="members-count">成员 ({members.length})</Text>
        <ScrollView scrollY className="members-scroll">
          {members.map((member) => (
            <View key={member.id} className="member-row">
              <Image className="member-row__avatar" src={member.userAvatar || 'https://via.placeholder.com/48'} mode="aspectFill" />
              <View className="member-row__info">
                <Text className="member-row__name">{member.userName}</Text>
                <Text className={`member-row__role member-row__role--${member.role}`}>
                  {member.role === 'leader' ? '队长' : member.role === 'admin' ? '管理员' : '成员'}
                </Text>
              </View>
              <View className="member-row__actions">
                {member.role !== 'leader' && (
                  <>
                    <View className="member-row__action" onClick={() => handleRoleChange(member, member.role === 'admin' ? 'member' : 'admin')}>
                      <Text>{member.role === 'admin' ? '降权' : '设为管理员'}</Text>
                    </View>
                    <View className="member-row__action member-row__action--danger" onClick={() => handleRemove(member)}>
                      <Text>移除</Text>
                    </View>
                  </>
                )}
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}
