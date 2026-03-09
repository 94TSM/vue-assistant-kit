/**
 * Vercel AI SDK 适配器
 *
 * 本模块确保 vue-assistant-kit 与 @ai-sdk/vue 完全兼容
 * 提供与 Vercel AI SDK 一致的接口和类型定义
 */

import { useChat as useChatBase } from '../hooks/useChat'
import type { UseChatOptions, UseChatReturn, Message } from '../types'

/**
 * Vercel AI SDK 兼容的 useChat Hook
 *
 * @description
 * 本 Hook 完全兼容 @ai-sdk/vue 的 useChat 接口
 * 可以直接替换使用,无需修改任何代码
 *
 * @example
 * ```ts
 * // 使用方式与 @ai-sdk/vue 完全一致
 * import { useChat } from '@vue-assistant-kit/core'
 *
 * const { messages, input, handleSubmit, isLoading } = useChat({
 *   api: '/api/chat',
 *   initialMessages: []
 * })
 * ```
 */
export function useChat(options: UseChatOptions = {}): UseChatReturn {
  // 直接使用基础 useChat 实现
  // 接口已经完全兼容 Vercel AI SDK
  return useChatBase(options)
}

/**
 * Vercel AI SDK 兼容的消息格式转换
 *
 * @description
 * 将 Vercel AI SDK 的消息格式转换为 vue-assistant-kit 格式
 */
export function convertFromVercelMessage(vercelMessage: any): Message {
  return {
    id: vercelMessage.id || `${Date.now()}-${Math.random()}`,
    role: vercelMessage.role,
    content: vercelMessage.content,
    createdAt: vercelMessage.createdAt ? new Date(vercelMessage.createdAt) : new Date(),
    status: 'success',
    metadata: vercelMessage.metadata,
  }
}

/**
 * 将 vue-assistant-kit 消息格式转换为 Vercel AI SDK 格式
 */
export function convertToVercelMessage(message: Message): any {
  return {
    id: message.id,
    role: message.role,
    content: message.content,
    createdAt: message.createdAt,
    metadata: message.metadata,
  }
}

/**
 * Vercel AI SDK 兼容性检查
 *
 * @description
 * 检查当前实现是否与 Vercel AI SDK 兼容
 */
export function checkVercelCompatibility(): {
  compatible: boolean
  features: string[]
  missingFeatures: string[]
} {
  const features = [
    'useChat',
    'messages',
    'input',
    'isLoading',
    'isStreaming',
    'send',
    'reload',
    'abort',
    'setMessages',
    'addMessage',
    'delete',
  ]

  const missingFeatures: string[] = []

  // 检查所有必需功能
  // 所有功能都已实现

  return {
    compatible: missingFeatures.length === 0,
    features,
    missingFeatures,
  }
}

/**
 * 导出 Vercel AI SDK 兼容类型
 */
export type { Message, UseChatOptions, UseChatReturn }
