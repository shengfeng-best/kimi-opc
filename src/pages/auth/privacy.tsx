import { View, Text, ScrollView } from '@tarojs/components';
import './privacy.css';

export default function PrivacyPolicy() {
  return (
    <View className="privacy-page">
      <View className="privacy-header">
        <Text className="privacy-title">隐私政策</Text>
        <Text className="privacy-date">更新日期：2026年1月1日</Text>
      </View>
      <ScrollView scrollY className="privacy-content">
        <View className="privacy-section">
          <Text className="privacy-section-title">1. 引言</Text>
          <Text className="privacy-section-text">
            OPC技能星球（以下简称"我们"）非常重视用户的隐私保护。本政策向您说明我们如何收集、使用、存储和保护您的个人信息。请您仔细阅读并理解本政策。
          </Text>
        </View>
        <View className="privacy-section">
          <Text className="privacy-section-title">2. 信息收集</Text>
          <Text className="privacy-section-text">
            2.1 注册信息：微信OpenID、昵称、头像。
            2.2 使用信息：浏览记录、交易记录、技能发布信息。
            2.3 设备信息：设备型号、操作系统版本、网络状态。
            2.4 位置信息：经您授权后获取的位置信息。
          </Text>
        </View>
        <View className="privacy-section">
          <Text className="privacy-section-title">3. 信息使用</Text>
          <Text className="privacy-section-text">
            3.1 提供、维护和改进我们的服务。
            3.2 处理交易和订单。
            3.3 发送服务通知和重要更新。
            3.4 进行数据分析和研究，改善用户体验。
          </Text>
        </View>
        <View className="privacy-section">
          <Text className="privacy-section-title">4. 信息共享</Text>
          <Text className="privacy-section-text">
            4.1 我们不会向第三方出售您的个人信息。
            4.2 在以下情况下可能共享信息：
            - 经您明确同意；
            - 为提供服务的必要合作伙伴；
            - 法律法规要求或政府部门要求。
          </Text>
        </View>
        <View className="privacy-section">
          <Text className="privacy-section-title">5. 信息保护</Text>
          <Text className="privacy-section-text">
            5.1 我们采用加密技术保护您的数据传输。
            5.2 实施严格的数据访问控制。
            5.3 定期进行安全审计和风险评估。
          </Text>
        </View>
        <View className="privacy-section">
          <Text className="privacy-section-title">6. 您的权利</Text>
          <Text className="privacy-section-text">
            6.1 访问、更正您的个人信息。
            6.2 删除您的账户和个人信息。
            6.3 撤回对信息收集的授权。
            6.4 投诉举报权。
          </Text>
        </View>
        <View className="privacy-section">
          <Text className="privacy-section-title">7. 未成年人保护</Text>
          <Text className="privacy-section-text">
            本平台服务主要面向成年人。如果您未满18周岁，请在监护人指导下使用我们的服务。
          </Text>
        </View>
        <View className="privacy-section">
          <Text className="privacy-section-title">8. 政策更新</Text>
          <Text className="privacy-section-text">
            我们可能会不时更新本隐私政策。更新后的政策将在平台上公示，如您继续使用我们的服务，视为同意更新后的政策。
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
