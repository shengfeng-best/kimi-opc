import { View } from '@tarojs/components';
import './index.css';

interface SkeletonProps {
  rows?: number;
  avatar?: boolean;
  image?: boolean;
  lineHeight?: number;
}

export default function Skeleton({ rows = 3, avatar = false, image = false, lineHeight = 16 }: SkeletonProps) {
  return (
    <View className="skeleton">
      {image && <View className="skeleton__image" />}
      <View className="skeleton__content">
        {avatar && <View className="skeleton__avatar" />}
        <View className="skeleton__lines" style={{ flex: 1 }}>
          {Array.from({ length: rows }).map((_, i) => (
            <View
              key={i}
              className="skeleton__line"
              style={{
                height: `${lineHeight}px`,
                width: i === rows - 1 ? '60%' : '100%',
              }}
            />
          ))}
        </View>
      </View>
    </View>
  );
}
