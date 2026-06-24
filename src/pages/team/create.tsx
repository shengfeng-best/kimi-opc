import { useState } from 'react';
import { View, Text, Button, Input, Textarea } from '@tarojs/components';
import { navigateTo, showToast } from '@tarojs/taro';
import { createTeam } from '../../services/team';
import './create.css';

export default function TeamCreate() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!name.trim()) {
      showToast({ title: '请输入团队名称', icon: 'none' });
      return;
    }
    if (name.length > 20) {
      showToast({ title: '团队名称不超过20字', icon: 'none' });
      return;
    }
    setLoading(true);
    try {
      await createTeam({ name: name.trim(), description: description.trim() });
      showToast({ title: '创建成功', icon: 'success' });
      setTimeout(() => navigateTo({ url: '/pages/team/index' }), 500);
    } catch (e: any) {
      showToast({ title: e.message || '创建失败', icon: 'none' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="team-create">
      <View className="team-create__form">
        <View className="form-item">
          <Text className="form-item__label">团队名称 <Text className="required">*</Text></Text>
          <Input
            className="form-item__input"
            placeholder="请输入团队名称（2-20字）"
            maxLength={20}
            value={name}
            onInput={(e) => setName(e.detail.value)}
          />
        </View>
        <View className="form-item">
          <Text className="form-item__label">团队简介</Text>
          <Textarea
            className="form-item__textarea"
            placeholder="描述团队的技能方向、项目目标等"
            maxLength={200}
            value={description}
            onInput={(e) => setDescription(e.detail.value)}
          />
          <Text className="form-item__count">{description.length}/200</Text>
        </View>
      </View>
      <View className="team-create__tips">
        <Text className="tips-title">创建须知</Text>
        <Text className="tips-item">1. 团队创建者自动成为队长</Text>
        <Text className="tips-item">2. 每个团队最多50人</Text>
        <Text className="tips-item">3. 队长可邀请成员、设置管理员</Text>
      </View>
      <Button
        className="btn btn-primary btn-block team-create__submit"
        loading={loading}
        onClick={handleSubmit}
      >
        创建团队
      </Button>
    </View>
  );
}
