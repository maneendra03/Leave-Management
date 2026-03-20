<template>
  <div class="fixed top-4 right-4 z-[100] flex flex-col gap-3 pointer-events-none">
    <TransitionGroup name="toast">
      <div
        v-for="toast in toastStore.toasts"
        :key="toast.id"
        :class="toastClasses(toast.type)"
        class="pointer-events-auto max-w-sm w-full px-4 py-3 rounded-xl shadow-2xl flex items-start gap-3 animate-slide-down cursor-pointer"
        @click="toastStore.removeToast(toast.id)"
      >
        <!-- Icon -->
        <div class="flex-shrink-0 mt-0.5">
          <svg v-if="toast.type === 'success'" class="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <svg v-else-if="toast.type === 'error'" class="w-5 h-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <svg v-else class="w-5 h-5 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p class="text-sm font-medium">{{ toast.message }}</p>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup>
import { useToastStore } from '../stores/toast'

const toastStore = useToastStore()

function toastClasses(type) {
  const base = 'border backdrop-blur-xl'
  switch (type) {
    case 'success':
      return `${base} bg-emerald-950/80 border-emerald-800/50 text-emerald-200`
    case 'error':
      return `${base} bg-red-950/80 border-red-800/50 text-red-200`
    default:
      return `${base} bg-primary-950/80 border-primary-800/50 text-primary-200`
  }
}
</script>

<style scoped>
.toast-enter-active {
  transition: all 0.3s ease-out;
}
.toast-leave-active {
  transition: all 0.2s ease-in;
}
.toast-enter-from {
  opacity: 0;
  transform: translateX(100%);
}
.toast-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>
