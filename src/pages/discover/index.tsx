import { View, Text } from '@tarojs/components';
import { useState } from 'react';
import { navigateTo, showToast } from '@tarojs/taro';
import './index.css';

export default function DiscoverPage() {
  const [activeTab, setActiveTab] = useState<'demands' | 'skills'>('demands');

  const handlePublishDemand = () => {
    navigateTo({ url: '/pages/demand/publish' });
  };

  return (
    <View className="discover-page">
      <View className="discover-header">
        <View className="discover-tabs">
          <View
            className={`discover-tab ${activeTab === 'demands' ? 'discover-tab--active' : ''}`}
            onClick={() => setActiveTab('demands')}
          >
            <Text>需求广场</Text>
          </View>
          <View
            className={`discover-tab ${activeTab === 'skills' ? 'discover-tab--active' : ''}`}
            onClick={() => setActiveTab('skills')}
          >
            <Text>技能推荐</Text>
          </View>
        </View>
        <View className="discover-publish" onClick={handlePublishDemand}>
          <Text>+ 发布</Text>
        </View>
      </View>

      <View className="discover-content">
        {activeTab === 'demands' ? (
          <View className="demand-list">
            <View className="demand-card">
              <Text className="demand-title">需要一个Logo设计</Text>
              <Text className="demand-desc">品牌初创，需要一个简洁现代的Logo，预算500元左右</Text>
              <View className="demand-meta">
                <Text className="demand-budget">¥500</Text>
                <Text className="demand-time">3天前</Text>
              </View>
            </View>
            <View className="demand-card">
              <Text className="demand-title">小程序前端开发</Text>
              <Text className="demand-desc">需要一个Taro小程序开发者，周期2周</Text>
              <View className="demand-meta">
                <Text className="demand-budget">¥3000</Text>
                <Text className="demand-time">1天前</Text>
              </View>
            </View>
          </View>
        ) : (
          <View className="skill-recommend">
            <Text className="empty-text">暂无推荐</Text>
          </View>
        )}
      </View>
    </View>
  );
}
