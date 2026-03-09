# vue-assistant-kit 快速开始

> Vue 3 AI 对话组件库 - 深度适配 Vercel AI SDK

## 🚀 快速开始

### 环境要求
- Node.js >= 18.0.0
- pnpm >= 8.0.0

### 安装

```bash
# 1. 安装 pnpm (如果未安装)
npm install -g pnpm@8.15.0

# 2. 安装项目依赖
pnpm install
```

### 运行

```bash
# 开发模式
pnpm dev

# 构建
pnpm build

# 测试
pnpm test

# 代码检查
pnpm lint
```

## 📦 包结构

```
packages/
├── core/          # 核心组件和 Hooks
├── theme/         # 主题系统
├── pro/           # Pro 版组件
├── enterprise/    # 企业版组件
├── nuxt/          # Nuxt 3 模块
└── docs/          # 文档站点
```

## 🎯 核心功能

### 开源核心版
- ✅ AIChat 根容器组件
- ✅ MessageList 消息列表
- ✅ Message 单条消息
- ✅ ChatInput 输入框
- ✅ 核心 Hooks (useChat, useStream, useCompletion)
- ✅ 主题系统 (亮色/暗黑主题)
- ✅ Vercel AI SDK 完全兼容
- ✅ Nuxt 3 原生支持
- ✅ SSR 完全兼容

### Pro 付费版
- ✅ MultiModalMessage 多模态消息
- ✅ ThinkingProcess 思考过程可视化
- ✅ KnowledgeChat 知识库问答
- ⏳ AIActionPanel 操作面板
- ⏳ 更多组件开发中...

### 企业专属版
- ⏳ MessageAudit 消息审计
- ⏳ AIWorkflowCanvas 工作流画布
- ⏳ MultiTenantChat 多租户对话
- ⏳ OfflineChat 离线部署

## 📚 文档

- [完整运行指南](./docs/GETTING_STARTED.md)
- [Windows 环境指南](./docs/WINDOWS_GUIDE.md)
- [SSR 兼容性指南](./docs/SSR.md)
- [阶段三完成总结](./docs/STAGE3_SUMMARY.md)
- [阶段四进度报告](./docs/STAGE4_PROGRESS.md)

## 🛠️ 技术栈

- **框架**: Vue 3.4+ / TypeScript 5.0+
- **构建**: Vite / Rollup / Turborepo
- **包管理**: pnpm
- **测试**: Vitest / Playwright
- **样式**: CSS Variables
- **Markdown**: marked / highlight.js
- **图表**: ECharts (Pro版)

## 📝 开发进度

- ✅ 阶段一: 基础设施搭建 (100%)
- ✅ 阶段二: 核心功能开发 (100%)
- ✅ 阶段三: 主题与生态 (100%)
- 🔄 阶段四: Pro版与企业版 (25%)

**总体进度**: 75% 完成

## 🤝 贡献

欢迎提交 Issue 和 Pull Request!

## 📄 许可证

- 开源核心版: MIT
- Pro 付费版: 商业授权
- 企业专属版: 定制授权

---

**快速链接**:
- [安装依赖](#安装)
- [运行项目](#运行)
- [查看文档](#文档)
- [Windows用户](./docs/WINDOWS_GUIDE.md)
