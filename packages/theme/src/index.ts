// Theme package entry point
export * from './hooks'

// 导出主题工具函数
export * from './utils/theme'

// 导出样式文件路径,供用户按需引入
export const stylePath = './src/styles/index.css'
export const variablesPath = './src/styles/variables.css'
export const lightThemePath = './src/styles/light.css'
export const darkThemePath = './src/styles/dark.css'
export const headlessPath = './src/styles/headless.css'
