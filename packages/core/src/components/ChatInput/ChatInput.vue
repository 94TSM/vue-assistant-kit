<script setup lang="ts">
import { ref, computed, watch, onMounted, nextTick } from 'vue'
import { useAIChatContext } from '../../hooks/useAIChatContext'
import type { ChatInputProps, ChatInputEmits } from '../../types'

const props = withDefaults(defineProps<ChatInputProps>(), {
  modelValue: '',
  placeholder: 'Type a message...',
  disabled: false,
  autoFocus: false,
  autoResize: true,
  minRows: 1,
  maxRows: 5,
  maxLength: 4000,
  enableShortcut: true,
  submitKey: 'enter',
  clearOnSend: true,
  showSendButton: true,
  showAbortButton: true,
})

const emit = defineEmits<ChatInputEmits>()

const context = useAIChatContext()

// Input value
const inputValue = ref(props.modelValue)

// Textarea ref
const textareaRef = ref<HTMLTextAreaElement | null>(null)

// Sync with v-model
watch(
  () => props.modelValue,
  (newValue) => {
    inputValue.value = newValue
  }
)

watch(inputValue, (newValue) => {
  emit('update:modelValue', newValue)
})

// Computed disabled state
const isDisabled = computed(() => props.disabled || context.disabled.value)

// Computed loading state
const isLoading = computed(() => context.isLoading.value)

// Auto resize textarea
const adjustHeight = () => {
  if (!textareaRef.value || !props.autoResize) return

  const textarea = textareaRef.value
  textarea.style.height = 'auto'

  const lineHeight = parseInt(getComputedStyle(textarea).lineHeight)
  const minHeight = lineHeight * props.minRows
  const maxHeight = lineHeight * props.maxRows

  const newHeight = Math.min(Math.max(textarea.scrollHeight, minHeight), maxHeight)
  textarea.style.height = `${newHeight}px`
}

// Watch input value and adjust height
watch(inputValue, () => {
  nextTick(adjustHeight)
})

// Handle keydown
const handleKeydown = (event: KeyboardEvent) => {
  if (!props.enableShortcut || isDisabled.value) return

  const isEnterKey = event.key === 'Enter'
  const isShiftPressed = event.shiftKey
  const isCtrlPressed = event.ctrlKey || event.metaKey

  if (props.submitKey === 'enter') {
    // Enter to send, Shift+Enter to newline
    if (isEnterKey && !isShiftPressed && !isCtrlPressed) {
      event.preventDefault()
      handleSend()
    }
  } else {
    // Ctrl+Enter to send, Enter to newline
    if (isEnterKey && isCtrlPressed) {
      event.preventDefault()
      handleSend()
    }
  }
}

// Handle send
const handleSend = () => {
  const content = inputValue.value.trim()

  // Validate
  if (!content || content.length > props.maxLength) {
    return
  }

  context.send(content)

  // Clear input
  if (props.clearOnSend) {
    inputValue.value = ''
    nextTick(adjustHeight)
  }
}

// Handle abort
const handleAbort = () => {
  emit('abort')
  context.abort()
}

// Handle focus
const handleFocus = () => {
  emit('focus')
}

// Handle blur
const handleBlur = () => {
  emit('blur')
}

// Focus on mount
onMounted(() => {
  if (props.autoFocus && textareaRef.value) {
    textareaRef.value.focus()
  }
  adjustHeight()
})

// Expose methods
defineExpose({
  focus: () => textareaRef.value?.focus(),
  blur: () => textareaRef.value?.blur(),
})
</script>

<template>
  <div class="ai-chat-input-container" :class="{ 'ai-chat-input-container--disabled': isDisabled }">
    <!-- Prefix slot -->
    <slot name="prefix" />

    <!-- Input area -->
    <div class="ai-chat-input-wrapper">
      <textarea
        ref="textareaRef"
        v-model="inputValue"
        class="ai-chat-textarea"
        :placeholder="placeholder"
        :disabled="isDisabled"
        :maxlength="maxLength"
        :rows="minRows"
        @keydown="handleKeydown"
        @focus="handleFocus"
        @blur="handleBlur"
        data-testid="chat-input"
      />

      <!-- Character count -->
      <div
        v-if="maxLength > 0"
        class="ai-chat-input-count"
        :class="{ 'ai-chat-input-count--exceeded': inputValue.length > maxLength }"
      >
        {{ inputValue.length }} / {{ maxLength }}
      </div>
    </div>

    <!-- Suffix slot -->
    <slot name="suffix" />

    <!-- Send/Abort buttons -->
    <div class="ai-chat-input-actions">
      <!-- Send button -->
      <slot
        name="send-button"
        :disabled="isDisabled || !inputValue.trim() || isLoading"
        :send="handleSend"
      >
        <button
          v-if="showSendButton && !isLoading"
          class="ai-chat-button ai-chat-button--send"
          :disabled="isDisabled || !inputValue.trim()"
          @click="handleSend"
          title="Send message"
        >
          ➤
        </button>
      </slot>

      <!-- Abort button -->
      <slot
        name="abort-button"
        :abort="handleAbort"
      >
        <button
          v-if="showAbortButton && isLoading"
          class="ai-chat-button ai-chat-button--abort"
          @click="handleAbort"
          title="Stop generating"
        >
          ⏹
        </button>
      </slot>
    </div>

    <!-- Footer slot -->
    <slot name="footer" />

    <!-- Default slot -->
    <slot />
  </div>
</template>

<style scoped>
/* 组件特定样式 - 仅包含无法通过全局类实现的样式 */
</style>
