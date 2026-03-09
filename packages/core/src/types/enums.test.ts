import { describe, it, expect } from 'vitest'
import type {
  MessageRole,
  MessageStatus,
  StreamProtocol,
  ThemeMode,
  ContentBlockType,
  ThinkingStepStatus,
  ActionType,
  ActionLayout,
  LoadingMode,
  TimeMode,
} from './enums'

describe('Enum Types', () => {
  describe('MessageRole', () => {
    it('should support all message roles', () => {
      const roles: MessageRole[] = ['user', 'assistant', 'system']
      expect(roles).toHaveLength(3)
      expect(roles).toContain('user')
      expect(roles).toContain('assistant')
      expect(roles).toContain('system')
    })

    it('should allow user role', () => {
      const role: MessageRole = 'user'
      expect(role).toBe('user')
    })

    it('should allow assistant role', () => {
      const role: MessageRole = 'assistant'
      expect(role).toBe('assistant')
    })

    it('should allow system role', () => {
      const role: MessageRole = 'system'
      expect(role).toBe('system')
    })
  })

  describe('MessageStatus', () => {
    it('should support all message statuses', () => {
      const statuses: MessageStatus[] = ['pending', 'streaming', 'success', 'error', 'aborted']
      expect(statuses).toHaveLength(5)
      expect(statuses).toContain('pending')
      expect(statuses).toContain('streaming')
      expect(statuses).toContain('success')
      expect(statuses).toContain('error')
      expect(statuses).toContain('aborted')
    })

    it('should allow pending status', () => {
      const status: MessageStatus = 'pending'
      expect(status).toBe('pending')
    })

    it('should allow streaming status', () => {
      const status: MessageStatus = 'streaming'
      expect(status).toBe('streaming')
    })

    it('should allow success status', () => {
      const status: MessageStatus = 'success'
      expect(status).toBe('success')
    })

    it('should allow error status', () => {
      const status: MessageStatus = 'error'
      expect(status).toBe('error')
    })

    it('should allow aborted status', () => {
      const status: MessageStatus = 'aborted'
      expect(status).toBe('aborted')
    })
  })

  describe('StreamProtocol', () => {
    it('should support all stream protocols', () => {
      const protocols: StreamProtocol[] = ['sse', 'fetch', 'websocket']
      expect(protocols).toHaveLength(3)
      expect(protocols).toContain('sse')
      expect(protocols).toContain('fetch')
      expect(protocols).toContain('websocket')
    })

    it('should allow sse protocol', () => {
      const protocol: StreamProtocol = 'sse'
      expect(protocol).toBe('sse')
    })

    it('should allow fetch protocol', () => {
      const protocol: StreamProtocol = 'fetch'
      expect(protocol).toBe('fetch')
    })

    it('should allow websocket protocol', () => {
      const protocol: StreamProtocol = 'websocket'
      expect(protocol).toBe('websocket')
    })
  })

  describe('ThemeMode', () => {
    it('should support all theme modes', () => {
      const modes: ThemeMode[] = ['light', 'dark', 'auto']
      expect(modes).toHaveLength(3)
      expect(modes).toContain('light')
      expect(modes).toContain('dark')
      expect(modes).toContain('auto')
    })

    it('should allow light mode', () => {
      const mode: ThemeMode = 'light'
      expect(mode).toBe('light')
    })

    it('should allow dark mode', () => {
      const mode: ThemeMode = 'dark'
      expect(mode).toBe('dark')
    })

    it('should allow auto mode', () => {
      const mode: ThemeMode = 'auto'
      expect(mode).toBe('auto')
    })
  })

  describe('ContentBlockType', () => {
    it('should support all content block types', () => {
      const types: ContentBlockType[] = ['text', 'image', 'audio', 'video', 'file', 'chart', 'reference']
      expect(types).toHaveLength(7)
      expect(types).toContain('text')
      expect(types).toContain('image')
      expect(types).toContain('audio')
      expect(types).toContain('video')
      expect(types).toContain('file')
      expect(types).toContain('chart')
      expect(types).toContain('reference')
    })

    it('should allow text type', () => {
      const type: ContentBlockType = 'text'
      expect(type).toBe('text')
    })

    it('should allow image type', () => {
      const type: ContentBlockType = 'image'
      expect(type).toBe('image')
    })

    it('should allow audio type', () => {
      const type: ContentBlockType = 'audio'
      expect(type).toBe('audio')
    })

    it('should allow video type', () => {
      const type: ContentBlockType = 'video'
      expect(type).toBe('video')
    })

    it('should allow file type', () => {
      const type: ContentBlockType = 'file'
      expect(type).toBe('file')
    })

    it('should allow chart type', () => {
      const type: ContentBlockType = 'chart'
      expect(type).toBe('chart')
    })

    it('should allow reference type', () => {
      const type: ContentBlockType = 'reference'
      expect(type).toBe('reference')
    })
  })

  describe('ThinkingStepStatus', () => {
    it('should support all thinking step statuses', () => {
      const statuses: ThinkingStepStatus[] = ['pending', 'processing', 'done', 'error']
      expect(statuses).toHaveLength(4)
      expect(statuses).toContain('pending')
      expect(statuses).toContain('processing')
      expect(statuses).toContain('done')
      expect(statuses).toContain('error')
    })

    it('should allow pending status', () => {
      const status: ThinkingStepStatus = 'pending'
      expect(status).toBe('pending')
    })

    it('should allow processing status', () => {
      const status: ThinkingStepStatus = 'processing'
      expect(status).toBe('processing')
    })

    it('should allow done status', () => {
      const status: ThinkingStepStatus = 'done'
      expect(status).toBe('done')
    })

    it('should allow error status', () => {
      const status: ThinkingStepStatus = 'error'
      expect(status).toBe('error')
    })
  })

  describe('ActionType', () => {
    it('should support all action types', () => {
      const types: ActionType[] = ['button', 'link', 'form', 'modal']
      expect(types).toHaveLength(4)
      expect(types).toContain('button')
      expect(types).toContain('link')
      expect(types).toContain('form')
      expect(types).toContain('modal')
    })

    it('should allow button type', () => {
      const type: ActionType = 'button'
      expect(type).toBe('button')
    })

    it('should allow link type', () => {
      const type: ActionType = 'link'
      expect(type).toBe('link')
    })

    it('should allow form type', () => {
      const type: ActionType = 'form'
      expect(type).toBe('form')
    })

    it('should allow modal type', () => {
      const type: ActionType = 'modal'
      expect(type).toBe('modal')
    })
  })

  describe('ActionLayout', () => {
    it('should support all action layouts', () => {
      const layouts: ActionLayout[] = ['horizontal', 'vertical', 'grid']
      expect(layouts).toHaveLength(3)
      expect(layouts).toContain('horizontal')
      expect(layouts).toContain('vertical')
      expect(layouts).toContain('grid')
    })

    it('should allow horizontal layout', () => {
      const layout: ActionLayout = 'horizontal'
      expect(layout).toBe('horizontal')
    })

    it('should allow vertical layout', () => {
      const layout: ActionLayout = 'vertical'
      expect(layout).toBe('vertical')
    })

    it('should allow grid layout', () => {
      const layout: ActionLayout = 'grid'
      expect(layout).toBe('grid')
    })
  })

  describe('LoadingMode', () => {
    it('should support all loading modes', () => {
      const modes: LoadingMode[] = ['skeleton', 'dots']
      expect(modes).toHaveLength(2)
      expect(modes).toContain('skeleton')
      expect(modes).toContain('dots')
    })

    it('should allow skeleton mode', () => {
      const mode: LoadingMode = 'skeleton'
      expect(mode).toBe('skeleton')
    })

    it('should allow dots mode', () => {
      const mode: LoadingMode = 'dots'
      expect(mode).toBe('dots')
    })
  })

  describe('TimeMode', () => {
    it('should support all time modes', () => {
      const modes: TimeMode[] = ['relative', 'absolute']
      expect(modes).toHaveLength(2)
      expect(modes).toContain('relative')
      expect(modes).toContain('absolute')
    })

    it('should allow relative mode', () => {
      const mode: TimeMode = 'relative'
      expect(mode).toBe('relative')
    })

    it('should allow absolute mode', () => {
      const mode: TimeMode = 'absolute'
      expect(mode).toBe('absolute')
    })
  })
})
