import { View, Text, Button, Textarea } from '@tarojs/components';
import { useState } from 'react';
import { useRouter, showToast, navigateBack } from '@tarojs/taro';
import { rateOrder } from '../../services/order';
import './rate.css';

export default function OrderRatePage() {
  const { id } = useRouter().params;
  const [rating, setRating] = useState(5);
  const [content, setContent] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const tags = ['服务态度好', '交付准时', '质量优秀', '沟通顺畅', '性价比高', '超出预期'];

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = async () => {
    if (!id) return;
    if (!content.trim()) {
      showToast({ title: '请输入评价内容', icon: 'none' });
      return;
    }
    setLoading(true);
    try {
      await rateOrder(id, { rating, content, tags: selectedTags });
      showToast({ title: '评价成功', icon: 'success' });
      setTimeout(() => navigateBack(), 800);
    } catch (e: any) {
      showToast({ title: e.message || '评价失败', icon: 'none' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="order-rate">
      <View className="rate-header">
        <Text className="rate-title">订单评价</Text>
      </View>

      <View className="rate-section">
        <Text className="rate-label">服务态度</Text>
        <View className="rate-stars">
          {Array.from({ length: 5 }).map((_, i) => (
            <Text
              key={i}
              className={`rate-star ${i < rating ? 'rate-star--active' : ''}`}
              onClick={() => setRating(i + 1)}
            >
              ★
            </Text>
          ))}
        </View>
        <Text className="rate-star-text">
          {rating === 5 ? '非常满意' : rating === 4 ? '满意' : rating === 3 ? '一般' : rating === 2 ? '不满意' : '非常不满意'}
        </Text>
      </View>

      <View className="rate-section">
        <Text className="rate-label">评价标签</Text>
        <View className="rate-tags">
          {tags.map((tag) => (
            <View
              key={tag}
              className={`rate-tag ${selectedTags.includes(tag) ? 'rate-tag--active' : ''}`}
              onClick={() => toggleTag(tag)}
            >
              <Text>{tag}</Text>
            </View>
          ))}
        </View>
      </View>

      <View className="rate-section">
        <Text className="rate-label">详细评价</Text>
        <Textarea
          className="rate-textarea"
          placeholder="分享您的使用体验，帮助其他买家做出选择..."
          maxLength={200}
          value={content}
          onInput={(e) => setContent(e.detail.value)}
        />
        <Text className="rate-count">{content.length}/200</Text>
      </View>

      <View className="rate-footer">
        <Button className="rate-submit" loading={loading} onClick={handleSubmit}>
          提交评价
        </Button>
      </View>
    </View>
  );
}
