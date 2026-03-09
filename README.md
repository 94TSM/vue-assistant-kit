# vue-assistant-kit

A comprehensive Vue 3 AI chat component library with deep Vercel AI SDK integration.

## Features

- 🚀 **Vue 3.4+ & TypeScript** - Built with the latest Vue 3 features and full TypeScript support
- 🎨 **Themeable** - CSS variables driven theme system with light/dark modes
- 📦 **Monorepo** - Modular architecture with core, theme, pro, and enterprise packages
- 🔌 **Vercel AI SDK** - Deep integration with @ai-sdk/vue for seamless AI interactions
- 🎯 **Tree-shakable** - Import only what you need
- 📱 **Responsive** - Mobile-first design with touch support
- ♿ **Accessible** - WCAG 2.1 AA compliant

## Packages

| Package | Description | Version |
|---------|-------------|---------|
| [@vue-assistant-kit/core](./packages/core) | Core components and hooks | ![npm](https://img.shields.io/npm/v/@vue-assistant-kit/core) |
| [@vue-assistant-kit/theme](./packages/theme) | Theme system | ![npm](https://img.shields.io/npm/v/@vue-assistant-kit/theme) |
| [@vue-assistant-kit/pro](./packages/pro) | Pro version components | ![npm](https://img.shields.io/npm/v/@vue-assistant-kit/pro) |
| [@vue-assistant-kit/enterprise](./packages/enterprise) | Enterprise version components | ![npm](https://img.shields.io/npm/v/@vue-assistant-kit/enterprise) |

## Quick Start

### Installation

```bash
# Using pnpm
pnpm add @vue-assistant-kit/core @vue-assistant-kit/theme

# Using npm
npm install @vue-assistant-kit/core @vue-assistant-kit/theme

# Using yarn
yarn add @vue-assistant-kit/core @vue-assistant-kit/theme
```

### Basic Usage

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

## Development

### Prerequisites

- Node.js >= 18.0.0
- pnpm >= 8.0.0

### Setup

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build all packages
pnpm build

# Run tests
pnpm test

# Lint code
pnpm lint
```

## License

- **Core & Theme**: MIT
- **Pro & Enterprise**: Commercial License

## Contributing

Contributions are welcome! Please read our [Contributing Guide](./CONTRIBUTING.md) for details.

## Documentation

Full documentation is available at [https://vue-assistant-kit.dev](https://vue-assistant-kit.dev)
