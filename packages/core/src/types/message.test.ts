import { describe, it, expect } from 'vitest'
import type {
  ToolInvocation,
  ContentBlock,
  BaseMessage,
  Message,
  MessageCreateOptions,
  MessageUpdateOptions,
  ReferenceCitation,
  ThinkingStep,
} from './message'
import type { MessageRole, MessageStatus, ContentBlockType } from './enums'

describe('Message Types', () => {
  describe('ToolInvocation', () => {
    it('should create a valid tool invocation', () => {
      const toolInvocation: ToolInvocation = {
        toolCallId: 'call-123',
        toolName: 'search',
        args: { query: 'test' },
        state: 'call',
      }

      expect(toolInvocation.toolCallId).toBe('call-123')
      expect(toolInvocation.toolName).toBe('search')
      expect(toolInvocation.args).toEqual({ query: 'test' })
      expect(toolInvocation.state).toBe('call')
    })

    it('should support all tool invocation states', () => {
      const states: ToolInvocation['state'][] = [
        'partial-call',
        'call',
        'partial-result',
        'result',
      ]
      expect(states).toHaveLength(4)
    })

    it('should support result field', () => {
      const toolInvocation: ToolInvocation = {
        toolCallId: 'call-123',
        toolName: 'search',
        args: { query: 'test' },
        state: 'result',
        result: { data: 'search results' },
      }

      expect(toolInvocation.result).toEqual({ data: 'search results' })
    })
  })

  describe('ContentBlock', () => {
    it('should create a valid text content block', () => {
      const contentBlock: ContentBlock = {
        type: 'text',
        text: 'Hello, world!',
      }

      expect(contentBlock.type).toBe('text')
      expect(contentBlock.text).toBe('Hello, world!')
    })

    it('should create a valid image content block', () => {
      const contentBlock: ContentBlock = {
        type: 'image',
        url: 'https://example.com/image.jpg',
        mimeType: 'image/jpeg',
      }

      expect(contentBlock.type).toBe('image')
      expect(contentBlock.url).toBe('https://example.com/image.jpg')
      expect(contentBlock.mimeType).toBe('image/jpeg')
    })

    it('should support all content block types', () => {
      const types: ContentBlockType[] = [
        'text',
        'image',
        'audio',
        'video',
        'file',
        'chart',
        'reference',
      ]
      expect(types).toHaveLength(7)
    })

    it('should support custom data and metadata', () => {
      const contentBlock: ContentBlock = {
        type: 'chart',
        data: { chartType: 'bar', values: [1, 2, 3] },
        metadata: { title: 'Sales Data' },
      }

      expect(contentBlock.data).toEqual({ chartType: 'bar', values: [1, 2, 3] })
      expect(contentBlock.metadata).toEqual({ title: 'Sales Data' })
    })
  })

  describe('BaseMessage', () => {
    it('should create a valid base message', () => {
      const message: BaseMessage = {
        id: 'msg-123',
        role: 'user',
        content: 'Hello',
        createdAt: new Date('2024-01-01'),
        status: 'success',
      }

      expect(message.id).toBe('msg-123')
      expect(message.role).toBe('user')
      expect(message.content).toBe('Hello')
      expect(message.createdAt).toEqual(new Date('2024-01-01'))
      expect(message.status).toBe('success')
    })

    it('should support optional fields', () => {
      const message: BaseMessage = {
        id: 'msg-123',
        role: 'assistant',
        content: 'Hi there!',
      }

      expect(message.createdAt).toBeUndefined()
      expect(message.status).toBeUndefined()
    })
  })

  describe('Message', () => {
    it('should create a valid message with all fields', () => {
      const message: Message = {
        id: 'msg-123',
        role: 'user',
        content: 'Hello',
        createdAt: new Date('2024-01-01'),
        status: 'success',
        contentBlocks: [
          { type: 'text', text: 'Hello' },
          { type: 'image', url: 'https://example.com/image.jpg' },
        ],
        toolInvocations: [
          {
            toolCallId: 'call-123',
            toolName: 'search',
            args: { query: 'test' },
            state: 'result',
            result: { data: 'results' },
          },
        ],
        parentId: 'msg-122',
        metadata: { userId: 'user-123' },
        error: undefined,
        modelId: 'gpt-4',
        finishReason: 'stop',
      }

      expect(message.id).toBe('msg-123')
      expect(message.contentBlocks).toHaveLength(2)
      expect(message.toolInvocations).toHaveLength(1)
      expect(message.parentId).toBe('msg-122')
      expect(message.metadata).toEqual({ userId: 'user-123' })
      expect(message.modelId).toBe('gpt-4')
      expect(message.finishReason).toBe('stop')
    })

    it('should support custom metadata type', () => {
      interface CustomMetadata {
        userId: string
        sessionId: string
        tags: string[]
      }

      const message: Message<CustomMetadata> = {
        id: 'msg-123',
        role: 'user',
        content: 'Hello',
        metadata: {
          userId: 'user-123',
          sessionId: 'session-456',
          tags: ['important', 'urgent'],
        },
      }

      expect(message.metadata?.userId).toBe('user-123')
      expect(message.metadata?.sessionId).toBe('session-456')
      expect(message.metadata?.tags).toEqual(['important', 'urgent'])
    })

    it('should support error message', () => {
      const message: Message = {
        id: 'msg-123',
        role: 'assistant',
        content: '',
        status: 'error',
        error: 'Failed to generate response',
      }

      expect(message.status).toBe('error')
      expect(message.error).toBe('Failed to generate response')
    })

    it('should support all finish reasons', () => {
      const reasons: Message['finishReason'][] = ['stop', 'length', 'tool-calls', 'error']
      expect(reasons).toHaveLength(4)
    })
  })

  describe('MessageCreateOptions', () => {
    it('should create valid message create options', () => {
      const options: MessageCreateOptions = {
        role: 'user',
        content: 'Hello',
        id: 'msg-123',
        createdAt: new Date('2024-01-01'),
        parentId: 'msg-122',
        metadata: { userId: 'user-123' },
      }

      expect(options.role).toBe('user')
      expect(options.content).toBe('Hello')
      expect(options.id).toBe('msg-123')
      expect(options.parentId).toBe('msg-122')
      expect(options.metadata).toEqual({ userId: 'user-123' })
    })

    it('should support minimal options', () => {
      const options: MessageCreateOptions = {
        role: 'assistant',
        content: 'Hi there!',
      }

      expect(options.id).toBeUndefined()
      expect(options.createdAt).toBeUndefined()
      expect(options.parentId).toBeUndefined()
      expect(options.metadata).toBeUndefined()
    })
  })

  describe('MessageUpdateOptions', () => {
    it('should create valid message update options', () => {
      const options: MessageUpdateOptions = {
        content: 'Updated content',
        status: 'success',
        error: undefined,
        metadata: { updated: true },
        contentBlocks: [{ type: 'text', text: 'Updated content' }],
        toolInvocations: [],
      }

      expect(options.content).toBe('Updated content')
      expect(options.status).toBe('success')
      expect(options.metadata).toEqual({ updated: true })
      expect(options.contentBlocks).toHaveLength(1)
      expect(options.toolInvocations).toEqual([])
    })

    it('should support partial updates', () => {
      const options: MessageUpdateOptions = {
        status: 'streaming',
      }

      expect(options.content).toBeUndefined()
      expect(options.error).toBeUndefined()
      expect(options.contentBlocks).toBeUndefined()
      expect(options.toolInvocations).toBeUndefined()
    })
  })

  describe('ReferenceCitation', () => {
    it('should create a valid reference citation', () => {
      const citation: ReferenceCitation = {
        id: 'ref-123',
        documentId: 'doc-456',
        documentName: 'Technical Manual.pdf',
        content: 'This is the cited content.',
        pageNumber: 42,
        position: { start: 100, end: 200 },
        score: 0.95,
      }

      expect(citation.id).toBe('ref-123')
      expect(citation.documentId).toBe('doc-456')
      expect(citation.documentName).toBe('Technical Manual.pdf')
      expect(citation.pageNumber).toBe(42)
      expect(citation.position).toEqual({ start: 100, end: 200 })
      expect(citation.score).toBe(0.95)
    })

    it('should support optional fields', () => {
      const citation: ReferenceCitation = {
        id: 'ref-123',
        documentId: 'doc-456',
        documentName: 'Document.pdf',
        content: 'Cited content.',
      }

      expect(citation.pageNumber).toBeUndefined()
      expect(citation.position).toBeUndefined()
      expect(citation.score).toBeUndefined()
    })
  })

  describe('ThinkingStep', () => {
    it('should create a valid thinking step', () => {
      const step: ThinkingStep = {
        id: 'step-123',
        title: 'Analyze Problem',
        description: 'Breaking down the problem into smaller parts',
        status: 'done',
        startTime: 1000,
        endTime: 2000,
        duration: 1000,
        details: 'Detailed analysis',
        toolCalls: [
          {
            toolCallId: 'call-123',
            toolName: 'analyze',
            args: {},
            state: 'result',
          },
        ],
      }

      expect(step.id).toBe('step-123')
      expect(step.title).toBe('Analyze Problem')
      expect(step.description).toBe('Breaking down the problem into smaller parts')
      expect(step.status).toBe('done')
      expect(step.startTime).toBe(1000)
      expect(step.endTime).toBe(2000)
      expect(step.duration).toBe(1000)
      expect(step.details).toBe('Detailed analysis')
      expect(step.toolCalls).toHaveLength(1)
    })

    it('should support all thinking step statuses', () => {
      const statuses: ThinkingStep['status'][] = ['pending', 'processing', 'done', 'error']
      expect(statuses).toHaveLength(4)
    })

    it('should support error state', () => {
      const step: ThinkingStep = {
        id: 'step-123',
        title: 'Process Data',
        status: 'error',
        error: 'Failed to process data',
      }

      expect(step.status).toBe('error')
      expect(step.error).toBe('Failed to process data')
    })

    it('should support minimal thinking step', () => {
      const step: ThinkingStep = {
        id: 'step-123',
        title: 'Simple Step',
        status: 'pending',
      }

      expect(step.description).toBeUndefined()
      expect(step.startTime).toBeUndefined()
      expect(step.endTime).toBeUndefined()
      expect(step.duration).toBeUndefined()
      expect(step.error).toBeUndefined()
      expect(step.details).toBeUndefined()
      expect(step.toolCalls).toBeUndefined()
    })
  })
})
