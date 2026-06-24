import { View, Text } from '@tarojs/components';
import { useState } from 'react';
import { useRouter, showToast, navigateBack } from '@tarojs/taro';
import { formatPriceFromFen } from '../../utils';
import './detail.css';

export default function SkillDetailPage() {
  const { id } = useRouter().params;
  const [loading, setLoading] = useState(false);

  const skill = {
    id: id || '1',
    title: '专业Logo设计',
    description: '提供品牌Logo设计服务，包含3版初稿、无限修改、源文件交付。',
    price: 29900,
    rating: 4.9,
    orderCount: 128,
    viewCount: 2340,
    sellerName: '设计工作室',
    sellerAvatar: 'https://via.placeholder.com/48',
    tags: ['Logo', '品牌', '设计'],
  };

  const handleBuy = () => {
    showToast({ title: '跳转下单...', icon: 'none' });
  };

  const handleChat = () => {
    showToast({ title: '打开聊天...', icon: 'none' });
  };

  return (
    <View className="skill-detail-page">
      <View className="skill-detail__cover">
        <Text className="cover-placeholder">🎨 技能封面</Text>
      </View>

      <View className="skill-detail__info">
        <Text className="skill-detail__title">{skill.title}</Text>
        <Text className="skill-detail__desc">{skill.description}</Text>
        <View className="skill-detail__tags">
          {skill.tags.map((tag) => (
            <Text key={tag} className="skill-tag">{tag}</Text>
          ))}
        </View>
        <View className="skill-detail__meta">
          <Text className="meta-rating">⭐ {skill.rating} ({skill.orderCount}单)</Text>
          <Text className="meta-views">👁 {skill.viewCount}</Text>
        </View>
      </View>

      <View className="skill-detail__seller">
        <Text className="section-title">服务商</Text>
        <View className="seller-info">
          <View className="seller-avatar">
            <Text>👤</Text>
          </View>
          <View className="seller-name">
            <Text className="seller-name-text">{skill.sellerName}</Text>
            <Text className="seller-level">信用优秀</Text>
          </View>
        </View>
      </View>

      <View className="skill-detail__actions">
        <View className="action-price">
          <Text className="price-label">价格</Text>
          <Text className="price-value">{formatPriceFromFen(skill.price)}</Text>
        </View>
        <View className="action-btns">
          <View className="action-btn action-btn--chat" onClick={handleChat}>
            <Text>咨询</Text>
          </View>
          <View className="action-btn action-btn--buy" onClick={handleBuy}>
            <Text>立即购买</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
