import { View, Text } from '@tarojs/components';
import './index.css';

interface EmptyStateProps {
  icon?: string;
  title?: string;
  description?: string;
  actionText?: string;
  onAction?: () => void;
}

export default function EmptyState({
  icon = '📭',
  title = '暂无数据',
  description = '还没有相关内容，去逛逛吧',
  actionText,
  onAction,
}: EmptyStateProps) {
  return (
    <View className="empty-state">
      <Text className="empty-state__icon">{icon}</Text>
      <Text className="empty-state__title">{title}</Text>
      <Text className="empty-state__description">{description}</Text>
      {actionText && onAction && (
        <View className="empty-state__action" onClick={onAction}>
          <Text>{actionText}</Text>
        </View>
      )}
    </View>
  );
}
