export default defineAppConfig({
  entryPagePath: 'pages/boot/index',
  pages: [
    'pages/boot/index',
    'pages/auth/login',
    'pages/common/coming',
    'pages/index/index',
    'pages/discover/index',
    'pages/team/index',
    'pages/team/detail',
    'pages/team/create',
    'pages/team/members',
    'pages/message/index',
    'pages/profile/index',
    'pages/article/recommend',
    'pages/article/index',
    'pages/recommend/index',
    'pages/auth/agreement',
    'pages/auth/privacy',
  ],
  subPackages: [
    {
      root: 'pages/skill',
      pages: ['detail', 'search', 'publish', 'mylist'],
    },
    {
      root: 'pages/order',
      pages: ['list', 'detail', 'confirm', 'rate', 'fulfill'],
    },
    {
      root: 'pages/seller',
      pages: ['orders'],
    },
    {
      root: 'pages/user',
      pages: ['home'],
    },
    {
      root: 'pages/demand',
      pages: ['detail', 'publish'],
    },
    {
      root: 'pages/category',
      pages: ['index'],
    },
    {
      root: 'pages/chat',
      pages: ['index'],
    },
    {
      root: 'pages/notice',
      pages: ['index'],
    },
    {
      root: 'pages/stats',
      pages: ['index'],
    },
    {
      root: 'pages/wallet',
      pages: ['index'],
    },
    {
      root: 'pages/dev',
      pages: ['debug'],
    },
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'OPC技能星球',
    navigationBarTextStyle: 'black',
    backgroundColor: '#f6f7fb',
  },
  tabBar: {
    color: '#999999',
    selectedColor: '#3b82f6',
    backgroundColor: '#ffffff',
    borderStyle: 'black',
    list: [
      {
        pagePath: 'pages/index/index',
        text: '技能',
      },
      {
        pagePath: 'pages/discover/index',
        text: '需求',
      },
      {
        pagePath: 'pages/team/index',
        text: '组队',
      },
    ],
  },
  usingComponents: {},
});
