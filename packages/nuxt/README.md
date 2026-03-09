# @vue-assistant-kit/nuxt

vue-assistant-kit 的 Nuxt 3 模块。

## 安装

```bash
npm install @vue-assistant-kit/nuxt
# 或
pnpm add @vue-assistant-kit/nuxt
# 或
yarn add @vue-assistant-kit/nuxt
```

## 使用方法

在你的 `nuxt.config.ts` 中添加模块：

```ts
export default defineNuxtConfig({
  modules: ['@vue-assistant-kit/nuxt'],

  // 可选：配置模块
  vueAssistantKit: {
    // 自动导入组件 (默认: true)
    components: true,

    // 自动导入 composables (默认: true)
    composables: true,

    // 自动注入主题样式 (默认: true)
    theme: true,

    // 自定义主题路径 (默认: '@vue-assistant-kit/theme/style.css')
    themePath: '@vue-assistant-kit/theme/style.css'
  }
})
```

## 功能特性

### 自动导入的组件

所有来自 `@vue-assistant-kit/core` 的组件都会以 `AI` 前缀自动导入：

- `<AIChat />` - 根容器组件
- `<AIMessageList />` - 消息列表组件
- `<AIMessage />` - 单条消息组件
- `<AIChatInput />` - 对话输入组件

### 自动导入的 Composables

所有 composables 都会自动导入：

- `useChat` - 对话管理 Hook
- `useCompletion` - 文本补全 Hook
- `useStream` - 流处理 Hook
- `useAIChatContext` - 上下文访问 Hook
- `useTheme` - 主题管理 Hook

### SSR 支持

模块自动处理 SSR 兼容性：

- 服务端不访问 `window` 或 `document`
- 客户端正确的水合（hydration）
- localStorage 持久化正确处理

### 主题集成

启用时，主题样式会自动注入：

```ts
// 禁用主题自动注入
vueAssistantKit: {
  theme: false
}
```

然后手动导入样式：

```ts
// 在你的 CSS 文件中
@import '@vue-assistant-kit/theme/style.css';

// 或者在你的组件中
import '@vue-assistant-kit/theme/style.css'
```

## 示例

```vue
<template>
  <div>
    <AIChat api="/api/chat">
      <AIMessageList />
      <AIChatInput />
    </AIChat>
  </div>
</template>

<script setup>
// 所有组件和 composables 都已自动导入
const { messages, isLoading } = useAIChatContext()
</script>
```

## 许可证

MIT
