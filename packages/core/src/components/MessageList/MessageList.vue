<script setup lang="ts">
import { ref, computed, watch, nextTick, onMounted } from 'vue'
import { useAIChatContext } from '../../hooks/useAIChatContext'
import type { MessageListProps, MessageListEmits, Message } from '../../types'

const props = withDefaults(defineProps<MessageListProps>(), {
  virtualScroll: false,
  itemHeight: 80,
  autoScroll: true,
  scrollBehavior: 'smooth',
  showAvatar: true,
  showTime: true,
  groupByRole: false,
  showTimeDivider: false,
})

const emit = defineEmits<MessageListEmits>()

// Get context
const context = useAIChatContext()

// Use provided messages or context messages
const messages = computed(() => props.messages || context.messages.value)

// Scroll container ref
const scrollContainerRef = ref<HTMLElement | null>(null)

// Auto scroll state
const shouldAutoScroll = ref(true)

// Check if user is at bottom
const isAtBottom = () => {
  if (!scrollContainerRef.value) return true
  const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.value
  return scrollHeight - scrollTop - clientHeight < 10
}

// Scroll to bottom
const scrollToBottom = (behavior: ScrollBehavior = props.scrollBehavior) => {
  if (!scrollContainerRef.value || !shouldAutoScroll.value) return
  nextTick(() => {
    if(isAtBottom()){
      return
    }
    scrollContainerRef.value?.scrollTo({
      top: scrollContainerRef.value.scrollHeight,
      behavior,
    })
  })
}

// Handle scroll event
const handleScroll = (event: Event) => {
  emit('scroll', event)

  if (!scrollContainerRef.value) return

  const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.value

  // Check if reached top
  if (scrollTop === 0) {
    emit('reach-top')
  }

  // Check if reached bottom
  if (scrollHeight - scrollTop - clientHeight < 10) {
    emit('reach-bottom')
    shouldAutoScroll.value = true
  } else {
    // User scrolled up, disable auto scroll
    shouldAutoScroll.value = false
  }
}

// Watch messages and auto scroll
watch(
  messages,
  () => {
    if (props.autoScroll && shouldAutoScroll.value) {
      scrollToBottom()
    }
  },
  { deep: true }
)

// Watch streaming state
watch(
  () => context.isStreaming.value,
  (isStreaming) => {
    if (isStreaming && props.autoScroll) {
      shouldAutoScroll.value = true
      scrollToBottom('auto')
    }
  }
)

// Handle message click
const handleMessageClick = (message: Message) => {
  emit('message-click', message)
}

// Group messages by role
const groupedMessages = computed(() => {
  if (!props.groupByRole) {
    return messages.value.map((msg) => [msg])
  }

  const groups: Message[][] = []
  let currentGroup: Message[] = []

  messages.value.forEach((msg) => {
    if (currentGroup.length === 0 || currentGroup[0].role === msg.role) {
      currentGroup.push(msg)
    } else {
      groups.push(currentGroup)
      currentGroup = [msg]
    }
  })

  if (currentGroup.length > 0) {
    groups.push(currentGroup)
  }

  return groups
})

onMounted(() => {
  if (props.autoScroll) {
    scrollToBottom('auto')
  }
})
</script>

<template>
  <div
    ref="scrollContainerRef"
    class="ai-chat-message-list"
    @scroll="handleScroll"
  >
    <!-- Load more slot (for loading history) -->
    <slot name="load-more" />

    <!-- Empty state -->
    <div v-if="messages.length === 0" class="ai-chat-message-list__empty">
      <slot name="empty" />
    </div>

    <!-- Message groups -->
    <div
      v-for="(group, groupIndex) in groupedMessages"
      :key="`group-${groupIndex}`"
      class="ai-chat-message-list__group"
      :class="`ai-chat-message-list__group--${group[0].role}`"
    >
      <!-- Time divider -->
      <div
        v-if="showTimeDivider && groupIndex > 0"
        class="ai-chat-message-list__divider"
      >
        <slot
          name="time-divider"
          :date="group[0].createdAt"
        />
      </div>

      <!-- Messages in group -->
      <div
        v-for="message in group"
        :key="message.id"
        class="ai-chat-message-list__item"
        @click="handleMessageClick(message)"
      >
        <!-- Message item slot -->
        <slot
          name="message-item"
          :message="message"
          :is-streaming="context.isStreaming.value"
        >
          <!-- Default message rendering -->
          <div
            class="ai-chat-message"
            :class="`ai-chat-message-${message.role}`"
          >
            <div class="ai-chat-message__content">
              {{ message.content }}
            </div>
          </div>
        </slot>
      </div>
    </div>

    <!-- Loading slot -->
    <div v-if="context.isLoading.value" class="ai-chat-message-list__loading">
      <slot name="loading" />
    </div>

    <!-- Default slot -->
    <slot />
  </div>
</template>

<style scoped>
/* 组件特定样式 - 仅包含无法通过全局类实现的样式 */
</style>
