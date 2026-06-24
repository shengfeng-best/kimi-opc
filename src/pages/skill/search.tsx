import { View, Text, Input, ScrollView } from '@tarojs/components';
import { useState } from 'react';
import { navigateTo, showToast } from '@tarojs/taro';
import './search.css';

export default function SkillSearchPage() {
  const [keyword, setKeyword] = useState('');
  const [history] = useState(['Logo设计', '小程序开发', '文案写作']);
  const [hotKeywords] = useState(['UI设计', '前端开发', '视频剪辑', '翻译', 'PPT制作']);

  const handleSearch = () => {
    if (!keyword.trim()) {
      showToast({ title: '请输入关键词', icon: 'none' });
      return;
    }
    showToast({ title: `搜索: ${keyword}`, icon: 'none' });
  };

  return (
    <View className="search-page">
      <View className="search-bar">
        <Input
          className="search-input"
          placeholder="搜索技能、需求"
          value={keyword}
          onInput={(e) => setKeyword(e.detail.value)}
          confirmType="search"
          onConfirm={handleSearch}
        />
        <View className="search-btn" onClick={handleSearch}>
          <Text>搜索</Text>
        </View>
      </View>

      <View className="search-section">
        <Text className="search-section-title">历史搜索</Text>
        <View className="search-tags">
          {history.map((item) => (
            <View key={item} className="search-tag" onClick={() => setKeyword(item)}>
              <Text>{item}</Text>
            </View>
          ))}
        </View>
      </View>

      <View className="search-section">
        <Text className="search-section-title">热门搜索</Text>
        <View className="search-tags">
          {hotKeywords.map((item) => (
            <View key={item} className="search-tag search-tag--hot" onClick={() => setKeyword(item)}>
              <Text>{item}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}
