// Core package entry point
export * from './types'
export * from './hooks'
export * from './components'
// 从 adapters 显式导出,避免与 hooks 中的 useChat 冲突
export {
  convertFromVercelMessage,
  convertToVercelMessage,
  checkVercelCompatibility,
} from './adapters'
// 重新导出 Vercel 兼容的 useChat,命名为 vercelUseChat
export { useChat as vercelUseChat } from './adapters'
