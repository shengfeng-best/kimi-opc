import { View, Text } from '@tarojs/components';
import './index.css';

export default function StatsPage() {
  const stats = {
    totalIncome: 125800,
    totalOrders: 28,
    completedOrders: 24,
    rating: 4.8,
    skills: 5,
    followers: 120,
  };

  return (
    <View className="stats-page">
      <View className="stats-header">
        <Text className="stats-title">数据统计</Text>
      </View>

      <View className="stats-grid">
        <View className="stats-card">
          <Text className="stats-card__value">¥{(stats.totalIncome / 100).toFixed(2)}</Text>
          <Text className="stats-card__label">累计收入</Text>
        </View>
        <View className="stats-card">
          <Text className="stats-card__value">{stats.totalOrders}</Text>
          <Text className="stats-card__label">总订单</Text>
        </View>
        <View className="stats-card">
          <Text className="stats-card__value">{stats.completedOrders}</Text>
          <Text className="stats-card__label">已完成</Text>
        </View>
        <View className="stats-card">
          <Text className="stats-card__value">{stats.rating}</Text>
          <Text className="stats-card__label">评分</Text>
        </View>
        <View className="stats-card">
          <Text className="stats-card__value">{stats.skills}</Text>
          <Text className="stats-card__label">发布技能</Text>
        </View>
        <View className="stats-card">
          <Text className="stats-card__value">{stats.followers}</Text>
          <Text className="stats-card__label">关注者</Text>
        </View>
      </View>
    </View>
  );
}
