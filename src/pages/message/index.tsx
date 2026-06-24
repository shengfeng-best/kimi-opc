import { View, Text, ScrollView } from '@tarojs/components';
import { useState } from 'react';
import { navigateTo } from '@tarojs/taro';
import './index.css';

export default function MessagePage() {
  const [activeTab, setActiveTab] = useState<'all' | 'system' | 'order'>('all');

  const messages = [
    { id: '1', type: 'system' as const, title: '系统通知', content: '欢迎来到OPC技能星球，开始您的技能之旅！', time: '10分钟前', unread: true },
    { id: '2', type: 'order' as const, title: '订单提醒', content: '您有一个新订单待处理', time: '1小时前', unread: true },
    { id: '3', type: 'system' as const, title: '活动通知', content: '新人专享：首次发布技能免服务费', time: '2天前', unread: false },
  ];

  const filteredMessages = activeTab === 'all' ? messages : messages.filter(m => m.type === activeTab);

  return (
    <View className="message-page">
      <View className="message-tabs">
        {(['all', 'system', 'order'] as const).map((tab) => (
          <View
            key={tab}
            className={`message-tab ${activeTab === tab ? 'message-tab--active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            <Text>{{ all: '全部', system: '系统', order: '订单' }[tab]}</Text>
          </View>
        ))}
      </View>

      <ScrollView scrollY className="message-list">
        {filteredMessages.map((msg) => (
          <View key={msg.id} className={`message-item ${msg.unread ? 'message-item--unread' : ''}`}>
            <View className="message-icon">
              <Text>{msg.type === 'system' ? '🔔' : '📦'}</Text>
            </View>
            <View className="message-content">
              <View className="message-header">
                <Text className="message-title">{msg.title}</Text>
                <Text className="message-time">{msg.time}</Text>
              </View>
              <Text className="message-text">{msg.content}</Text>
            </View>
            {msg.unread && <View className="message-dot" />}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
