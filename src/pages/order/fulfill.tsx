import { View, Text, Button, Image, Textarea } from '@tarojs/components';
import { useState, useEffect } from 'react';
import { useRouter, showToast, navigateBack, chooseImage } from '@tarojs/taro';
import { fetchOrderDetail, submitDeliverable } from '../../services/order';
import './fulfill.css';

interface OrderFulfill {
  id: string;
  title: string;
  buyer: { name: string; avatar: string };
  requirements: string;
}

export default function OrderFulfillPage() {
  const { id } = useRouter().params;
  const [order, setOrder] = useState<OrderFulfill | null>(null);
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    fetchOrderDetail(id).then((d) => setOrder(d)).catch(() => {});
  }, [id]);

  const pickImage = () => {
    chooseImage({
      count: 9 - files.length,
      success: (res) => setFiles((prev) => [...prev, ...res.tempFilePaths]),
    });
  };

  const removeFile = (idx: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = async () => {
    if (!id) return;
    if (!description.trim()) {
      showToast({ title: '请输入交付说明', icon: 'none' });
      return;
    }
    setLoading(true);
    try {
      await submitDeliverable(id, { description, files });
      showToast({ title: '交付成功', icon: 'success' });
      setTimeout(() => navigateBack(), 800);
    } catch (e: any) {
      showToast({ title: e.message || '交付失败', icon: 'none' });
    } finally {
      setLoading(false);
    }
  };

  if (!order) {
    return (
      <View className="fulfill-skeleton">
        <View className="skeleton-block" style={{ height: 80 }} />
        <View className="skeleton-block" style={{ height: 120, marginTop: 12 }} />
      </View>
    );
  }

  return (
    <View className="order-fulfill">
      <View className="fulfill-header">
        <Text className="fulfill-title">交付订单</Text>
      </View>

      <View className="fulfill-buyer">
        <Image className="fulfill-avatar" src={order.buyer.avatar} />
        <View>
          <Text className="fulfill-buyer-name">{order.buyer.name}</Text>
          <Text className="fulfill-skill-title">{order.title}</Text>
        </View>
      </View>

      <View className="fulfill-section">
        <Text className="fulfill-label">买家需求</Text>
        <Text className="fulfill-requirements">{order.requirements}</Text>
      </View>

      <View className="fulfill-section">
        <Text className="fulfill-label">交付说明</Text>
        <Textarea
          className="fulfill-textarea"
          placeholder="描述交付内容，例如：已完成设计稿，请查收..."
          value={description}
          onInput={(e) => setDescription(e.detail.value)}
        />
      </View>

      <View className="fulfill-section">
        <Text className="fulfill-label">附件</Text>
        <View className="fulfill-files">
          {files.map((f, i) => (
            <View key={i} className="fulfill-file">
              <Image className="fulfill-file-img" src={f} mode="aspectFill" />
              <View className="fulfill-file-remove" onClick={() => removeFile(i)}>
                <Text>×</Text>
              </View>
            </View>
          ))}
          {files.length < 9 && (
            <View className="fulfill-add" onClick={pickImage}>
              <Text className="fulfill-add-icon">+</Text>
              <Text className="fulfill-add-text">添加图片</Text>
            </View>
          )}
        </View>
      </View>

      <View className="fulfill-footer">
        <Button className="fulfill-submit" loading={loading} onClick={handleSubmit}>
          确认交付
        </Button>
      </View>
    </View>
  );
}
