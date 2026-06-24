import { View, Text, ScrollView, Input } from '@tarojs/components';
import { useState, useEffect, useRef } from 'react';
import { useRouter, navigateBack, showToast } from '@tarojs/taro';
import './index.css';

interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  content: string;
  type: 'text' | 'image' | 'order';
  createTime: string;
  isSelf: boolean;
}

export default function ChatPage() {
  const { userId, userName } = useRouter().params;
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      senderId: 'other',
      senderName: userName || '服务商',
      senderAvatar: 'https://via.placeholder.com/48',
      content: '您好！请问有什么可以帮您？',
      type: 'text',
      createTime: '10:00',
      isSelf: false,
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const scrollRef = useRef<any>(null);

  const handleSend = () => {
    if (!inputValue.trim()) return;
    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      senderId: 'self',
      senderName: '我',
      senderAvatar: 'https://via.placeholder.com/48',
      content: inputValue.trim(),
      type: 'text',
      createTime: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
      isSelf: true,
    };
    setMessages((prev) => [...prev, newMsg]);
    setInputValue('');

    setTimeout(() => {
      const reply: ChatMessage = {
        id: (Date.now() + 1).toString(),
        senderId: 'other',
        senderName: userName || '服务商',
        senderAvatar: 'https://via.placeholder.com/48',
        content: '收到，我会尽快处理您的需求！',
        type: 'text',
        createTime: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
        isSelf: false,
      };
      setMessages((prev) => [...prev, reply]);
    }, 1500);
  };

  return (
    <View className="chat-page">
      <View className="chat-header">
        <Text className="chat-back" onClick={() => navigateBack()}>←</Text>
        <Text className="chat-title">{userName || '聊天'}</Text>
        <View className="chat-placeholder" />
      </View>

      <ScrollView
        ref={scrollRef}
        scrollY
        className="chat-messages"
        scrollIntoView={`msg-${messages[messages.length - 1]?.id}`}
      >
        {messages.map((msg) => (
          <View
            key={msg.id}
            id={`msg-${msg.id}`}
            className={`chat-message ${msg.isSelf ? 'chat-message--self' : 'chat-message--other'}`}
          >
            {!msg.isSelf && (
              <View className="chat-avatar">
                <Text>{msg.senderName[0]}</Text>
              </View>
            )}
            <View className="chat-bubble">
              <Text className="chat-bubble-text">{msg.content}</Text>
              <Text className="chat-bubble-time">{msg.createTime}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <View className="chat-input-bar">
        <Input
          className="chat-input"
          placeholder="输入消息..."
          value={inputValue}
          onInput={(e) => setInputValue(e.detail.value)}
          onConfirm={handleSend}
        />
        <View className="chat-send-btn" onClick={handleSend}>
          <Text>发送</Text>
        </View>
      </View>
    </View>
  );
}
