import { View, Text, Image } from '@tarojs/components';
import { navigateTo } from '@tarojs/taro';
import { useUserStore } from '../../store';
import './index.css';

export default function ProfilePage() {
  const { userInfo, isLoggedIn } = useUserStore();

  const handleLogin = () => {
    navigateTo({ url: '/pages/auth/login' });
  };

  const menuItems = [
    { icon: '📦', label: '我的订单', url: '/pages/order/list' },
    { icon: '💡', label: '我的技能', url: '/pages/skill/mylist' },
    { icon: '👥', label: '我的团队', url: '/pages/team/index' },
    { icon: '💰', label: '我的钱包', url: '/pages/wallet/index' },
    { icon: '📊', label: '数据统计', url: '/pages/stats/index' },
    { icon: '🔔', label: '消息通知', url: '/pages/notice/index' },
    { icon: '⚙️', label: '设置', url: '/pages/common/coming?feature=settings' },
  ];

  return (
    <View className="profile-page">
      <View className="profile-header">
        <View className="profile-user">
          <Image
            className="profile-avatar"
            src={userInfo?.avatar || 'https://via.placeholder.com/80'}
            mode="aspectFill"
          />
          <View className="profile-info">
            {isLoggedIn ? (
              <>
                <Text className="profile-name">{userInfo?.nickname || '用户'}</Text>
                <Text className="profile-desc">信用分: {userInfo?.creditScore || 60}</Text>
              </>
            ) : (
              <>
                <Text className="profile-name">未登录</Text>
                <Text className="profile-login-btn" onClick={handleLogin}>点击登录</Text>
              </>
            )}
          </View>
        </View>
      </View>

      <View className="profile-menu">
        {menuItems.map((item) => (
          <View key={item.label} className="profile-menu-item" onClick={() => navigateTo({ url: item.url })}>
            <View className="menu-item-left">
              <Text className="menu-item-icon">{item.icon}</Text>
              <Text className="menu-item-label">{item.label}</Text>
            </View>
            <Text className="menu-item-arrow">›</Text>
          </View>
        ))}
      </View>
    </View>
  );
}
