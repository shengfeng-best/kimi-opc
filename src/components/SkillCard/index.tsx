import { View, Text, Image } from '@tarojs/components';
import { useState } from 'react';
import { formatPriceFromFen } from '../../utils';
import { Skill } from '../../types';
import './index.css';

interface SkillCardProps {
  skill: Skill;
  onClick?: (skill: Skill) => void;
  onCollect?: (skill: Skill) => void;
  showPrice?: boolean;
  showRating?: boolean;
  showStatus?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export default function SkillCard({
  skill,
  onClick,
  onCollect,
  showPrice = true,
  showRating = true,
  showStatus = false,
  size = 'md',
}: SkillCardProps) {
  const [isCollected, setIsCollected] = useState(false);

  const handleCollect = (e: any) => {
    e.stopPropagation();
    setIsCollected(!isCollected);
    onCollect?.(skill);
  };

  const sizeClass = `skill-card--${size}`;

  return (
    <View className={`skill-card ${sizeClass}`} onClick={() => onClick?.(skill)}>
      <View className="skill-card__cover">
        <Image
          className="skill-card__image"
          src={skill.coverImages[0] || 'https://via.placeholder.com/300x200'}
          mode="aspectFill"
          lazyLoad
        />
        {showStatus && skill.status !== 'online' && (
          <View className={`skill-card__status skill-card__status--${skill.status}`}>
            <Text className="skill-card__status-text">
              {skill.status === 'draft' ? '草稿' : skill.status === 'pending' ? '审核中' : '已下架'}
            </Text>
          </View>
        )}
        <View className="skill-card__collect" onClick={handleCollect}>
          <Text className={`skill-card__collect-icon ${isCollected ? 'skill-card__collect-icon--active' : ''}`}>
            {isCollected ? '❤️' : '🤍'}
          </Text>
        </View>
      </View>
      <View className="skill-card__content">
        <Text className="skill-card__title" numberOfLines={2}>{skill.title}</Text>
        <View className="skill-card__meta">
          {showRating && skill.rating > 0 && (
            <View className="skill-card__rating">
              <Text className="skill-card__rating-star">⭐</Text>
              <Text className="skill-card__rating-value">{skill.rating.toFixed(1)}</Text>
              <Text className="skill-card__rating-count">({skill.orderCount})</Text>
            </View>
          )}
          <View className="skill-card__stats">
            <Text className="skill-card__stat">👁 {skill.viewCount}</Text>
          </View>
        </View>
        <View className="skill-card__footer">
          <View className="skill-card__seller">
            <View className="skill-card__seller-avatar">
              <Text>👤</Text>
            </View>
            <Text className="skill-card__seller-name">{skill.categoryName}</Text>
          </View>
          {showPrice && (
            <Text className="skill-card__price">{formatPriceFromFen(skill.price)}</Text>
          )}
        </View>
      </View>
    </View>
  );
}
