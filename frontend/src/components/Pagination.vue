<template>
  <div v-if="totalPages > 1" class="flex items-center justify-center gap-2 mt-6">
    <button
      @click="$emit('page-change', currentPage - 1)"
      :disabled="currentPage <= 1"
      class="p-2 rounded-lg bg-surface-800 border border-surface-700 text-surface-300 hover:bg-surface-700 
             disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
    >
      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
      </svg>
    </button>

    <template v-for="page in visiblePages" :key="page">
      <button
        v-if="page !== '...'"
        @click="$emit('page-change', page)"
        :class="[
          'w-9 h-9 rounded-lg text-sm font-medium transition-all duration-200',
          page === currentPage
            ? 'bg-primary-600 text-white shadow-glow'
            : 'bg-surface-800 border border-surface-700 text-surface-300 hover:bg-surface-700'
        ]"
      >
        {{ page }}
      </button>
      <span v-else class="text-surface-500 px-1">...</span>
    </template>

    <button
      @click="$emit('page-change', currentPage + 1)"
      :disabled="currentPage >= totalPages"
      class="p-2 rounded-lg bg-surface-800 border border-surface-700 text-surface-300 hover:bg-surface-700 
             disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
    >
      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  currentPage: { type: Number, required: true },
  totalPages: { type: Number, required: true },
})

defineEmits(['page-change'])

const visiblePages = computed(() => {
  const pages = []
  const total = props.totalPages
  const current = props.currentPage

  if (total <= 7) {
    for (let i = 1; i <= total; i++) pages.push(i)
    return pages
  }

  pages.push(1)
  if (current > 3) pages.push('...')

  const start = Math.max(2, current - 1)
  const end = Math.min(total - 1, current + 1)
  for (let i = start; i <= end; i++) pages.push(i)

  if (current < total - 2) pages.push('...')
  pages.push(total)

  return pages
})
</script>
