import { View, Text } from '@tarojs/components';
import './index.css';

interface PriceTagProps {
  price: number;
  unit?: string;
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'danger' | 'default';
  prefix?: string;
}

export default function PriceTag({ price, unit = '次', size = 'md', color = 'danger', prefix = '¥' }: PriceTagProps) {
  const sizeClass = `price-tag--${size}`;
  const colorClass = `price-tag--${color}`;
  const yuan = (price / 100).toFixed(2);

  return (
    <View className={`price-tag ${sizeClass} ${colorClass}`}>
      <Text className="price-tag__prefix">{prefix}</Text>
      <Text className="price-tag__amount">{yuan}</Text>
      <Text className="price-tag__unit">/{unit}</Text>
    </View>
  );
}
