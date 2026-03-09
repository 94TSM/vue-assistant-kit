<script setup lang="ts">
import { computed, provide, watch } from 'vue';
import { useChat } from '../../hooks/useChat';
import { AIChatContextKey } from '../../hooks/useAIChatContext';
import type { AIChatProps, AIChatEmits, Message } from '../../types';

const props = withDefaults(defineProps<AIChatProps>(), {
  api: '/api/chat',
  initialMessages: () => [],
  maxRetries: 3,
  timeout: 30000,
  disabled: false,
  autoScroll: true,
});

const emit = defineEmits<AIChatEmits>();

// Use chat hook
const chat = useChat({
  api: props.api,
  initialMessages: props.initialMessages,
  modelId: props.modelId,
  headers: props.headers,
  body: props.body,
  persistenceKey: props.persistenceKey,
  maxRetries: props.maxRetries,
  timeout: props.timeout,
  onSend: (message) => emit('send', message),
  onReceive: (message) => emit('receive', message),
  onError: (error) => emit('error', error),
  onAbort: () => emit('abort'),
});

// Controlled mode support
if (props.messages) {
  watch(
    () => props.messages,
    (newMessages = []) => {
      chat.setMessages(newMessages);
    },
    { immediate: true, deep: true },
  );

  watch(
    chat.messages,
    (newMessages) => {
      emit('update:messages', newMessages);
    },
    { deep: true },
  );
}

// Disabled state
const disabled = computed(() => props.disabled);

// Retry handler
const handleRetry = async (messageId: string) => {
  const message = chat.messages.value.find((msg) => msg.id === messageId);
  if (message) {
    emit('retry', message);
  }
  await chat.retry(messageId);
};

// Delete handler
const handleDelete = (messageId: string) => {
  emit('delete', messageId);
  chat.delete(messageId);
};

// Provide context to children
provide(AIChatContextKey, {
  messages: chat.messages,
  input: chat.input,
  isLoading: chat.isLoading,
  isStreaming: chat.isStreaming,
  error: chat.error,
  disabled,
  send: chat.send,
  reload: chat.reload,
  abort: chat.abort,
  retry: handleRetry,
  delete: handleDelete,
  edit: chat.edit,
  setMessages: chat.setMessages,
  addMessage: chat.addMessage,
  updateMessage: chat.updateMessage,
});
</script>

<template>
  <div class="ai-chat" :class="{ 'ai-chat--disabled': disabled }">
    <!-- Header slot -->
    <slot
      name="header"
      :messages="chat.messages.value"
      :is-loading="chat.isLoading.value"
      :is-streaming="chat.isStreaming.value"
    />

    <!-- Empty state slot -->
    <slot
      v-if="chat.messages.value.length === 0"
      name="empty"
      :send="chat.send"
    />

    <!-- Default slot for content -->
    <slot
      :messages="chat.messages.value"
      :input="chat.input.value"
      :is-loading="chat.isLoading.value"
      :is-streaming="chat.isStreaming.value"
      :error="chat.error.value"
      :send="chat.send"
      :abort="chat.abort"
      :reload="chat.reload"
    />

    <!-- Footer slot -->
    <slot
      name="footer"
      :messages="chat.messages.value"
      :is-loading="chat.isLoading.value"
      :is-streaming="chat.isStreaming.value"
    />
  </div>
</template>

<style scoped>
/* 组件特定样式 - 仅包含无法通过全局类实现的样式 */
</style>
