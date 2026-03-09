# @vue-assistant-kit/core

vue-assistant-kit 的核心组件和 Hooks - 一个深度集成 Vercel AI SDK 的 Vue 3 AI 对话组件库。

## 安装

```bash
# 使用 pnpm
pnpm add @vue-assistant-kit/core

# 使用 npm
npm install @vue-assistant-kit/core

# 使用 yarn
yarn add @vue-assistant-kit/core
```

## 特性

- 🚀 **Vue 3.4+ & TypeScript** - 使用最新的 Vue 3 特性构建，完整的 TypeScript 支持
- 🔌 **Vercel AI SDK** - 深度集成 @ai-sdk/vue，实现无缝的 AI 交互
- 🎯 **Tree-shakable** - 按需引入，减小打包体积
- 📱 **响应式设计** - 移动优先，支持触摸操作
- ♿ **无障碍访问** - 符合 WCAG 2.1 AA 标准
- 🌓 **SSR 兼容** - 支持 Nuxt 3、Vite SSR 和 Vue SSR

## 组件

### AIChat

根容器组件，提供全局状态管理和 Vercel AI SDK 集成。

```vue
<script setup lang="ts">
import { AIChat } from '@vue-assistant-kit/core'
</script>

<template>
  <AIChat api="/api/chat">
    <!-- 你的对话 UI -->
  </AIChat>
</template>
```

**Props:**
- `api` - 对话 API 端点 (默认: `/api/chat`)
- `initialMessages` - 初始消息数组
- `modelId` - 模型标识符
- `headers` - API 请求的自定义请求头
- `body` - API 请求的自定义请求体
- `persistenceKey` - localStorage 持久化键名
- `maxRetries` - 最大重试次数 (默认: 3)
- `timeout` - 请求超时时间，单位毫秒 (默认: 30000)
- `disabled` - 禁用对话功能
- `autoScroll` - 自动滚动到底部 (默认: true)

**Events:**
- `send` - 发送消息时触发
- `receive` - 接收消息时触发
- `error` - 发生错误时触发
- `abort` - 请求中止时触发
- `update:messages` - 消息变化时触发 (用于 v-model)

### MessageList

消息列表组件，支持虚拟滚动和自动滚动。

```vue
<script setup lang="ts">
import { MessageList } from '@vue-assistant-kit/core'
</script>

<template>
  <MessageList />
</template>
```

**Props:**
- `autoScroll` - 自动滚动到底部 (默认: true)
- `virtualScroll` - 启用虚拟滚动 (默认: false)
- `maxHeight` - 列表最大高度

### Message

单条消息组件，支持流式渲染和 Markdown 渲染。

```vue
<script setup lang="ts">
import { Message } from '@vue-assistant-kit/core'
</script>

<template>
  <Message :message="message" />
</template>
```

**Props:**
- `message` - 消息对象
- `showAvatar` - 显示头像 (默认: true)
- `showTimestamp` - 显示时间戳 (默认: true)
- `markdown` - 启用 Markdown 渲染 (默认: true)

### ChatInput

对话输入组件，支持自动调整高度和快捷键。

```vue
<script setup lang="ts">
import { ChatInput } from '@vue-assistant-kit/core'
</script>

<template>
  <ChatInput />
</template>
```

**Props:**
- `placeholder` - 输入框占位文本
- `disabled` - 禁用输入
- `maxRows` - 自动调整的最大行数
- `submitKey` - 提交消息的按键 (默认: 'Enter')

## Hooks

### useChat

核心对话 Hook，管理完整的对话生命周期。

```typescript
import { useChat } from '@vue-assistant-kit/core'

const {
  messages,
  input,
  isLoading,
  error,
  append,
  reload,
  stop,
  setMessages,
} = useChat({
  api: '/api/chat',
  initialMessages: [],
  onSend: (message) => console.log('已发送:', message),
  onReceive: (message) => console.log('已接收:', message),
  onError: (error) => console.error('错误:', error),
})
```

**Options:**
- `api` - API 端点
- `initialMessages` - 初始消息
- `modelId` - 模型标识符
- `headers` - 自定义请求头
- `body` - 自定义请求体
- `persistenceKey` - localStorage 键名
- `maxRetries` - 最大重试次数
- `timeout` - 请求超时时间
- `onSend` - 发送回调
- `onReceive` - 接收回调
- `onError` - 错误回调
- `onAbort` - 中止回调

**Returns:**
- `messages` - 响应式消息数组
- `input` - 响应式输入值
- `isLoading` - 加载状态
- `error` - 错误状态
- `append` - 添加消息
- `reload` - 重新加载最后一条消息
- `stop` - 停止当前请求
- `setMessages` - 设置消息数组

### useCompletion

文本补全 Hook，用于单行补全。

```typescript
import { useCompletion } from '@vue-assistant-kit/core'

const {
  completion,
  input,
  isLoading,
  complete,
  stop,
} = useCompletion({
  api: '/api/completion',
})
```

### useStream

底层流处理 Hook。

```typescript
import { useStream } from '@vue-assistant-kit/core'

const {
  data,
  error,
  isLoading,
  abort,
} = useStream({
  url: '/api/stream',
  onMessage: (data) => console.log('数据:', data),
})
```

### useAIChatContext

从子组件访问 AIChat 上下文。

```typescript
import { useAIChatContext } from '@vue-assistant-kit/core'

const {
  messages,
  input,
  isLoading,
  error,
  append,
  reload,
  stop,
} = useAIChatContext()
```

## 与 Vercel AI SDK 配合使用

本包设计为与 Vercel AI SDK 无缝配合：

```typescript
// app/api/chat/route.ts (Next.js 示例)
import { openai } from '@ai-sdk/openai'
import { streamText } from 'ai'

export default async function handler(req: Request) {
  const { messages } = await req.json()

  const result = await streamText({
    model: openai('gpt-4'),
    messages,
  })

  return result.toAIStreamResponse()
}
```

```vue
<!-- 你的 Vue 组件 -->
<script setup lang="ts">
import { AIChat, MessageList, ChatInput } from '@vue-assistant-kit/core'
import '@vue-assistant-kit/theme/style.css'
</script>

<template>
  <AIChat api="/api/chat">
    <MessageList />
    <ChatInput />
  </AIChat>
</template>
```

## TypeScript

完整的 TypeScript 支持，导出所有类型：

```typescript
import type {
  Message,
  AIChatProps,
  MessageListProps,
  ChatInputProps,
  UseChatOptions,
  UseChatReturn,
} from '@vue-assistant-kit/core'
```

## SSR 兼容性

本包完全兼容 SSR，支持：
- ✅ Nuxt 3
- ✅ Vite SSR
- ✅ Vue SSR

对于 Nuxt 3，推荐使用 `@vue-assistant-kit/nuxt` 进行自动配置。

## 许可证

MIT © vue-assistant-kit
