import { View, Text } from '@tarojs/components';
import { useState } from 'react';
import { showToast, navigateBack } from '@tarojs/taro';
import './publish.css';

export default function DemandPublishPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState('');

  const handleSubmit = () => {
    if (!title.trim()) { showToast({ title: '请输入需求标题', icon: 'none' }); return; }
    if (!budget.trim()) { showToast({ title: '请输入预算', icon: 'none' }); return; }
    showToast({ title: '发布成功', icon: 'success' });
    setTimeout(() => navigateBack(), 500);
  };

  return (
    <View className="demand-publish">
      <Text className="publish-title">发布需求</Text>
      <View className="form-item">
        <Text className="form-label">需求标题 *</Text>
        <input className="form-input" placeholder="简要描述你的需求" value={title} onInput={(e) => setTitle(e.detail.value)} />
      </View>
      <View className="form-item">
        <Text className="form-label">详细描述</Text>
        <textarea className="form-textarea" placeholder="详细描述需求内容、交付要求等" value={description} onInput={(e) => setDescription(e.detail.value)} />
      </View>
      <View className="form-item">
        <Text className="form-label">预算（元）*</Text>
        <input className="form-input" type="number" placeholder="输入预算金额" value={budget} onInput={(e) => setBudget(e.detail.value)} />
      </View>
      <View className="publish-btn" onClick={handleSubmit}>
        <Text>发布需求</Text>
      </View>
    </View>
  );
}
