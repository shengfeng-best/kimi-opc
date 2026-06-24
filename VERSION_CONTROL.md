# 版本控制指南

## 分支管理
- `main`: 主分支，稳定版本
- `develop`: 开发分支
- `feature/*`: 功能分支
- `hotfix/*`: 紧急修复分支

## 提交规范
```
feat: 新功能
fix: 修复bug
docs: 文档更新
style: 代码格式（不影响代码运行）
refactor: 重构
test: 测试相关
chore: 构建过程或辅助工具的变动
```

## 版本号规则
- 主版本号：重大功能变更，不兼容的API修改
- 次版本号：功能新增，向下兼容
- 修订号：bug修复，向下兼容

## 发布流程
1. 从 develop 分支创建 release 分支
2. 在 release 分支上测试
3. 合并到 main 并打 tag
4. 合并回 develop
