<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import type { MessageProps, MessageEmits } from '../../types'

const props = withDefaults(defineProps<MessageProps>(), {
  showAvatar: true,
  showTime: true,
  showCopy: true,
  showRetry: true,
  showEdit: true,
  showDelete: true,
  streamingSpeed: 30,
  enableMarkdown: true,
  enableCodeHighlight: true,
})

const emit = defineEmits<MessageEmits>()

// Display content (for streaming animation)
const displayContent = ref('')
let animationFrame: number | null = null
let currentIndex = 0

// Streaming animation
watch(
  () => props.message.content,
  (newContent) => {
    if (props.message.status === 'streaming') {
      // Start streaming animation
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }

      const animate = () => {
        if (currentIndex < newContent.length) {
          displayContent.value = newContent.slice(0, currentIndex + 1)
          currentIndex++
          animationFrame = window.setTimeout(
            () => requestAnimationFrame(animate),
            props.streamingSpeed
          )
        }
      }

      animate()
    } else {
      // Show full content immediately
      displayContent.value = newContent
      currentIndex = newContent.length
    }
  },
  { immediate: true }
)

// Cleanup animation on unmount
onMounted(() => {
  return () => {
    if (animationFrame) {
      clearTimeout(animationFrame)
    }
  }
})

// Computed content to display
const contentToDisplay = computed(() => {
  if (props.message.status === 'streaming') {
    return displayContent.value
  }
  return props.message.content
})

// Avatar URL
const avatarUrl = computed(() => {
  if (props.message.role === 'user') {
    return props.userAvatar
  }
  return props.assistantAvatar
})

// Handle copy
const handleCopy = async () => {
  try {
    await navigator.clipboard.writeText(props.message.content)
    emit('copy', props.message)
  } catch (err) {
    console.error('Failed to copy:', err)
  }
}

// Handle retry
const handleRetry = () => {
  emit('retry', props.message)
}

// Handle edit
const handleEdit = () => {
  emit('edit', props.message)
}

// Handle delete
const handleDelete = () => {
  emit('delete', props.message.id)
}

// Format time
const formatTime = (date?: Date) => {
  if (!date) return ''
  return new Date(date).toLocaleTimeString()
}
</script>

<template>
  <div
    class="ai-chat-message"
    :class="[
      `ai-chat-message-${message.role}`,
      message.status === 'streaming' ? 'ai-chat-message--streaming' : '',
      message.status === 'error' ? 'ai-chat-message--error' : '',
    ]"
  >
    <!-- Header slot -->
    <slot name="header" :message="message">
      <div class="ai-chat-message__header">
        <!-- Avatar -->
        <slot name="avatar" :message="message">
          <div
            v-if="showAvatar"
            class="ai-chat-message__avatar"
            :class="`ai-chat-message__avatar--${message.role}`"
          >
            <img v-if="avatarUrl" :src="avatarUrl" alt="avatar" />
            <span v-else>{{ message.role === 'user' ? 'U' : 'AI' }}</span>
          </div>
        </slot>

        <!-- Time -->
        <span v-if="showTime" class="ai-chat-message__time">
          {{ formatTime(message.createdAt) }}
        </span>
      </div>
    </slot>

    <!-- Content slot -->
    <slot name="content" :message="message" :content="contentToDisplay">
      <div class="ai-chat-message__content">
        <!-- Status indicators -->
        <div v-if="message.status === 'pending'" class="ai-chat-message__status">
          <span class="ai-chat-message__loading">Thinking...</span>
        </div>

        <div v-else-if="message.status === 'streaming'" class="message__streaming">
          {{ contentToDisplay }}
          <span class="ai-chat-message__cursor">|</span>
        </div>

        <div v-else-if="message.status === 'error'" class="ai-chat-message__error">
          <slot name="error" :message="message" :error="message.error">
            <div class="ai-chat-message__error-content">
              <span class="ai-chat-message__error-icon">⚠️</span>
              <span>{{ message.error || 'An error occurred' }}</span>
            </div>
          </slot>
        </div>

        <div v-else class="ai-chat-message__text">
          {{ contentToDisplay }}
        </div>
      </div>
    </slot>

    <!-- Actions slot -->
    <slot name="actions" :message="message">
      <div class="ai-chat-message__actions">
        <button
          v-if="showCopy && message.status === 'success'"
          class="ai-chat-message__action"
          @click="handleCopy"
          title="Copy"
        >
          📋
        </button>

        <button
          v-if="showRetry && message.status === 'error'"
          class="ai-chat-message__action"
          @click="handleRetry"
          title="Retry"
        >
          🔄
        </button>

        <button
          v-if="showEdit && message.role === 'user'"
          class="ai-chat-message__action"
          @click="handleEdit"
          title="Edit"
        >
          ✏️
        </button>

        <button
          v-if="showDelete"
          class="ai-chat-message__action"
          @click="handleDelete"
          title="Delete"
        >
          🗑️
        </button>
      </div>
    </slot>

    <!-- Footer slot -->
    <slot name="footer" :message="message" />
  </div>
</template>

<style scoped>
/* 组件特定样式 - 仅包含无法通过全局类实现的样式 */
.message__streaming {
  position: relative;
}
</style>
