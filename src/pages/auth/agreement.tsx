import { View, Text, ScrollView } from '@tarojs/components';
import './agreement.css';

export default function UserAgreement() {
  return (
    <View className="agreement-page">
      <View className="agreement-header">
        <Text className="agreement-title">用户协议</Text>
        <Text className="agreement-date">更新日期：2026年1月1日</Text>
      </View>
      <ScrollView scrollY className="agreement-content">
        <View className="agreement-section">
          <Text className="agreement-section-title">1. 服务条款</Text>
          <Text className="agreement-section-text">
            欢迎使用OPC技能星球（以下简称"本平台"）。本协议是您与本平台之间关于使用本平台服务的协议。请您仔细阅读本协议，如您不同意本协议的任何内容，请不要使用本平台服务。
          </Text>
        </View>
        <View className="agreement-section">
          <Text className="agreement-section-title">2. 账户注册</Text>
          <Text className="agreement-section-text">
            2.1 您需要通过微信授权登录注册成为本平台用户。
            2.2 您保证提供的注册信息真实、准确、完整。
            2.3 您需要对账户安全负责，妥善保管登录信息。
          </Text>
        </View>
        <View className="agreement-section">
          <Text className="agreement-section-title">3. 服务使用</Text>
          <Text className="agreement-section-text">
            3.1 本平台提供技能交易、组队协作、需求发布等服务。
            3.2 用户应遵守法律法规，不得发布违法违规内容。
            3.3 禁止发布虚假信息、欺诈行为、侵犯他人权益的内容。
          </Text>
        </View>
        <View className="agreement-section">
          <Text className="agreement-section-title">4. 交易规则</Text>
          <Text className="agreement-section-text">
            4.1 技能交易采用平台担保模式，资金托管在平台。
            4.2 买家付款后，卖家开始服务，完成后买家验收确认。
            4.3 平台收取一定比例的服务费，具体费率以页面公示为准。
          </Text>
        </View>
        <View className="agreement-section">
          <Text className="agreement-section-title">5. 知识产权</Text>
          <Text className="agreement-section-text">
            5.1 用户上传的内容知识产权归用户所有。
            5.2 用户授予本平台非独占性的使用权，用于平台运营和推广。
            5.3 禁止侵犯他人知识产权的行为。
          </Text>
        </View>
        <View className="agreement-section">
          <Text className="agreement-section-title">6. 违约责任</Text>
          <Text className="agreement-section-text">
            6.1 用户违反本协议的，平台有权采取警告、限制功能、封号等措施。
            6.2 因用户违规行为造成损失的，由用户承担赔偿责任。
          </Text>
        </View>
        <View className="agreement-section">
          <Text className="agreement-section-title">7. 协议变更</Text>
          <Text className="agreement-section-text">
            平台有权根据实际情况修改本协议，修改后的协议将在平台上公示。如您继续使用平台服务，视为同意修改后的协议。
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
