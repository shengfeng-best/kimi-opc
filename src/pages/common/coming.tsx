import { View, Text } from '@tarojs/components';
import { useRouter } from '@tarojs/taro';
import './coming.css';

export default function ComingSoon() {
  const { feature } = useRouter().params;
  const featureNames: Record<string, string> = {
    realname_verify: '实名认证',
    payment: '支付功能',
    community: '社区功能',
  };

  const title = feature ? (featureNames[feature] || feature) : '该功能';

  return (
    <View className="coming-page">
      <View className="coming-icon">🚧</View>
      <Text className="coming-title">{title}即将上线</Text>
      <Text className="coming-desc">我们正在努力开发中，敬请期待</Text>
    </View>
  );
}
