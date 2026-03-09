# @vue-assistant-kit/theme

vue-assistant-kit 的主题系统 - 一个基于 CSS 变量的完整主题系统，支持亮色/暗色模式。

## 安装

```bash
# 使用 pnpm
pnpm add @vue-assistant-kit/theme

# 使用 npm
npm install @vue-assistant-kit/theme

# 使用 yarn
yarn add @vue-assistant-kit/theme
```

## 特性

- 🎨 **CSS 变量驱动** - 100+ CSS 自定义属性，完全可定制
- 🌓 **亮色/暗色模式** - 内置亮色和暗色主题支持
- 🎭 **Headless 模式** - 无样式模式，完全自由设计
- 📱 **响应式设计** - 移动优先
- ⚡ **零依赖** - 纯 CSS，无运行时开销
- 🎯 **Tree-shakable** - 按需引入

## 快速开始

### 导入所有样式

```typescript
import '@vue-assistant-kit/theme/style.css'
```

### 导入特定主题

```typescript
// 仅亮色主题
import '@vue-assistant-kit/theme/light.css'

// 仅暗色主题
import '@vue-assistant-kit/theme/dark.css'

// Headless 模式（无样式）
import '@vue-assistant-kit/theme/headless.css'
```

## 主题模式

### 亮色主题

```typescript
import '@vue-assistant-kit/theme/light.css'
```

### 暗色主题

```typescript
import '@vue-assistant-kit/theme/dark.css'
```

### 自动主题（跟随系统）

```typescript
import '@vue-assistant-kit/theme/style.css'

// style.css 包含两种主题，并自动检测系统偏好
```

## CSS 变量

### 颜色

```css
/* 主色调 */
--ai-primary-color: #3b82f6;
--ai-primary-hover-color: #2563eb;
--ai-primary-active-color: #1d4ed8;

/* 背景色 */
--ai-bg-color: #ffffff;
--ai-bg-secondary-color: #f9fafb;
--ai-bg-tertiary-color: #f3f4f6;

/* 文本色 */
--ai-text-color: #111827;
--ai-text-secondary-color: #6b7280;
--ai-text-tertiary-color: #9ca3af;

/* 边框色 */
--ai-border-color: #e5e7eb;
--ai-border-hover-color: #d1d5db;

/* 状态色 */
--ai-success-color: #10b981;
--ai-warning-color: #f59e0b;
--ai-error-color: #ef4444;
--ai-info-color: #3b82f6;
```

### 间距

```css
/* 间距比例 */
--ai-spacing-xs: 0.25rem;  /* 4px */
--ai-spacing-sm: 0.5rem;   /* 8px */
--ai-spacing-md: 1rem;     /* 16px */
--ai-spacing-lg: 1.5rem;   /* 24px */
--ai-spacing-xl: 2rem;     /* 32px */
--ai-spacing-2xl: 3rem;    /* 48px */
```

### 排版

```css
/* 字体大小 */
--ai-font-size-xs: 0.75rem;   /* 12px */
--ai-font-size-sm: 0.875rem;  /* 14px */
--ai-font-size-base: 1rem;    /* 16px */
--ai-font-size-lg: 1.125rem;  /* 18px */
--ai-font-size-xl: 1.25rem;   /* 20px */
--ai-font-size-2xl: 1.5rem;   /* 24px */

/* 字重 */
--ai-font-weight-normal: 400;
--ai-font-weight-medium: 500;
--ai-font-weight-semibold: 600;
--ai-font-weight-bold: 700;

/* 行高 */
--ai-line-height-tight: 1.25;
--ai-line-height-normal: 1.5;
--ai-line-height-relaxed: 1.75;
```

### 圆角

```css
/* 圆角 */
--ai-radius-sm: 0.25rem;  /* 4px */
--ai-radius-md: 0.5rem;   /* 8px */
--ai-radius-lg: 0.75rem;  /* 12px */
--ai-radius-xl: 1rem;     /* 16px */
--ai-radius-full: 9999px;
```

### 阴影

```css
/* 阴影 */
--ai-shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
--ai-shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
--ai-shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
--ai-shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1);
```

### 过渡

```css
/* 过渡时间 */
--ai-transition-fast: 150ms;
--ai-transition-normal: 300ms;
--ai-transition-slow: 500ms;
```

## 自定义

### 覆盖 CSS 变量

```css
:root {
  /* 覆盖主色调 */
  --ai-primary-color: #8b5cf6;
  --ai-primary-hover-color: #7c3aed;
  --ai-primary-active-color: #6d28d9;

  /* 覆盖背景色 */
  --ai-bg-color: #fafafa;
  --ai-bg-secondary-color: #f5f5f5;

  /* 覆盖圆角 */
  --ai-radius-md: 0.75rem;
}
```

### 暗色模式自定义

```css
.dark {
  /* 覆盖暗色模式颜色 */
  --ai-bg-color: #0f172a;
  --ai-bg-secondary-color: #1e293b;
  --ai-text-color: #f1f5f9;
}
```

## useTheme Hook

通过编程方式管理主题：

```typescript
import { useTheme } from '@vue-assistant-kit/theme'

const {
  theme,
  isDark,
  setTheme,
  toggleTheme,
} = useTheme()

// 设置主题
setTheme('dark')

// 在亮色和暗色之间切换
toggleTheme()

// 检查当前主题
console.log(isDark.value) // true/false
console.log(theme.value) // 'light' | 'dark' | 'system'
```

### 选项

```typescript
const {
  theme,
  isDark,
  setTheme,
  toggleTheme,
} = useTheme({
  defaultTheme: 'system', // 'light' | 'dark' | 'system'
  storageKey: 'ai-theme', // localStorage 键名
  disableTransition: false, // 禁用主题切换时的过渡效果
})
```

## Headless 模式

为了完全的设计自由，可以使用 headless 模式：

```typescript
import '@vue-assistant-kit/theme/headless.css'
```

这只会导入必要的 CSS 变量，不包含任何视觉样式。然后你可以应用自己的样式：

```css
/* 你的自定义样式 */
.ai-chat {
  /* 你的样式 */
}

.ai-message {
  /* 你的样式 */
}
```

## 组件特定变量

### AIChat

```css
--ai-chat-bg-color: var(--ai-bg-color);
--ai-chat-border-color: var(--ai-border-color);
--ai-chat-border-radius: var(--ai-radius-lg);
--ai-chat-shadow: var(--ai-shadow-lg);
```

### Message

```css
--ai-message-bg-color: var(--ai-bg-secondary-color);
--ai-message-text-color: var(--ai-text-color);
--ai-message-border-radius: var(--ai-radius-md);
--ai-message-padding: var(--ai-spacing-md);
```

### ChatInput

```css
--ai-input-bg-color: var(--ai-bg-color);
--ai-input-border-color: var(--ai-border-color);
--ai-input-focus-border-color: var(--ai-primary-color);
--ai-input-border-radius: var(--ai-radius-md);
```

## 与 Tailwind CSS 集成

本主题系统可以很好地与 Tailwind CSS 配合使用：

```typescript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        ai: {
          primary: 'var(--ai-primary-color)',
          'primary-hover': 'var(--ai-primary-hover-color)',
          'bg': 'var(--ai-bg-color)',
          'text': 'var(--ai-text-color)',
        },
      },
    },
  },
}
```

## 最佳实践

1. **导入顺序**：在你的自定义样式之前导入主题样式
2. **CSS 优先级**：使用 CSS 变量便于覆盖
3. **暗色模式**：在亮色和暗色模式下都要测试你的自定义样式
4. **性能**：只导入你需要的主题文件

## 许可证

MIT © vue-assistant-kit
