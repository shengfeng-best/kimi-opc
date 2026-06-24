# kimi-opc

> OPC技能星球微信小程序 - 可实际使用的完整版本

基于 Taro 4.x + React + TypeScript 的技能交易与组队平台微信小程序。

## 技术栈

| 类别 | 技术 |
|------|------|
| 框架 | Taro 4.x (React) |
| 语言 | TypeScript |
| 状态管理 | Zustand |
| UI组件 | Vant Weapp |
| 样式 | CSS |

## 功能模块

- 首页技能发现（Banner、分类、技能列表）
- 技能详情与搜索
- 技能发布（5步引导）
- 订单全流程（下单、支付、交付、验收、评价）
- 团队组队（创建团队、成员管理、协作）
- 消息通知体系
- 钱包与支付
- 数据统计
- 个人中心
- 用户协议与隐私政策

## 开发命令

```bash
# 安装依赖
pnpm install

# 开发微信小程序
pnpm dev:weapp

# 构建微信小程序
pnpm build:weapp

# 类型检查
pnpm typecheck

# 严格模式检查
pnpm typecheck:strict

# 代码检查
pnpm lint
```

## 项目结构

```
src/
├── pages/          # 页面
├── components/     # 通用组件
├── store/          # Zustand 状态
├── services/       # API服务
├── utils/          # 工具函数
├── types/          # TypeScript类型
├── hooks/          # 自定义Hooks
├── styles/         # 设计系统
├── cloud/          # 云开发封装
├── config/         # 配置
└── assets/         # 静态资源
```
