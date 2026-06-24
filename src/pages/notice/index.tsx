import { View, Text } from '@tarojs/components';
import { showToast } from '@tarojs/taro';
import './index.css';

export default function NoticePage() {
  const notices = [
    { id: '1', title: '系统维护通知', content: '平台将于今晚12点进行系统维护，预计持续2小时。', time: '2026-01-15 10:00' },
    { id: '2', title: '新功能上线', content: '组队功能已正式上线，快去创建你的团队吧！', time: '2026-01-14 09:00' },
  ];

  return (
    <View className="notice-page">
      <View className="notice-header">
        <Text className="notice-title">通知公告</Text>
      </View>
      <View className="notice-list">
        {notices.map((notice) => (
          <View key={notice.id} className="notice-item">
            <Text className="notice-item__title">{notice.title}</Text>
            <Text className="notice-item__content">{notice.content}</Text>
            <Text className="notice-item__time">{notice.time}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}
