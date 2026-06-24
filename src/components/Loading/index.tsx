import { View, Text } from '@tarojs/components';
import './index.css';

interface LoadingProps {
  text?: string;
  size?: 'sm' | 'md' | 'lg';
  fullScreen?: boolean;
}

export default function Loading({ text = '加载中...', size = 'md', fullScreen = false }: LoadingProps) {
  const sizeClass = `loading--${size}`;
  
  if (fullScreen) {
    return (
      <View className="loading loading--fullscreen">
        <View className={`loading__spinner ${sizeClass}`}>
          <View className="loading__spinner-dot" />
          <View className="loading__spinner-dot" />
          <View className="loading__spinner-dot" />
        </View>
        <Text className="loading__text">{text}</Text>
      </View>
    );
  }

  return (
    <View className="loading">
      <View className={`loading__spinner ${sizeClass}`}>
        <View className="loading__spinner-dot" />
        <View className="loading__spinner-dot" />
        <View className="loading__spinner-dot" />
      </View>
      {text && <Text className="loading__text">{text}</Text>}
    </View>
  );
}
