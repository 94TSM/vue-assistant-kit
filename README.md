<!--
 * @Date: 2026-03-07 10:11:16
 * @LastEditTime: 2026-03-09 11:35:15
 * @Description: 
-->
# vue-assistant-kit

一个功能全面的 Vue 3 AI 聊天组件库，深度集成 Vercel AI SDK。

## 特性

- 🚀 **Vue 3.4+ & TypeScript** - 基于最新的 Vue 3 特性构建，提供完整的 TypeScript 支持
- 🎨 **可主题化** - 基于 CSS 变量的主题系统，支持亮色/暗色模式
- 📦 **Monorepo** - 模块化架构，包含核心、主题、专业版和企业版包
- 🔌 **Vercel AI SDK** - 深度集成 @ai-sdk/vue，实现无缝的 AI 交互
- 🎯 **Tree-shakable** - 按需导入，优化打包体积
- 📱 **响应式** - 移动优先设计，支持触摸操作
- ♿ **无障碍** - 符合 WCAG 2.1 AA 标准

## 包

| 包名 | 描述 | 版本 |
|---------|-------------|---------|
| [@vue-assistant-kit/core](./packages/core) | 核心组件和钩子 | ![npm](https://img.shields.io/npm/v/@vue-assistant-kit/core) |
| [@vue-assistant-kit/theme](./packages/theme) | 主题系统 | ![npm](https://img.shields.io/npm/v/@vue-assistant-kit/theme) ｜

## 快速开始

### 安装

```bash
# 使用 pnpm
pnpm add @vue-assistant-kit/core @vue-assistant-kit/theme

# 使用 npm
npm install @vue-assistant-kit/core @vue-assistant-kit/theme

# 使用 yarn
yarn add @vue-assistant-kit/core @vue-assistant-kit/theme
```

### 基本用法

```vue
<script setup lang="ts">
import { AIChat, MessageList, Message, ChatInput } from '@vue-assistant-kit/core'
import '@vue-assistant-kit/theme/style.css'
</script>

<template>
  <AIChat :api="'/api/chat'">
    <MessageList />
    <ChatInput />
  </AIChat>
</template>
```

## 开发

### 环境要求

- Node.js >= 18.0.0
- pnpm >= 8.0.0

### 设置

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建所有包
pnpm build

# 运行测试
pnpm test

# 代码检查
pnpm lint
```

## 许可证

MIT
