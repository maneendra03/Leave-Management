<template>
  <div class="card-hover animate-slide-up">
    <div class="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
      <!-- Left: Leave details -->
      <div class="flex-1 min-w-0">
        <div class="flex items-center gap-3 mb-2">
          <span :class="statusBadgeClass" class="flex-shrink-0">
            {{ leave.status }}
          </span>
          <span class="badge bg-surface-800 text-surface-300 border border-surface-700 capitalize">
            {{ leave.leaveType }}
          </span>
        </div>

        <!-- Employee name (employer view only) -->
        <p v-if="leave.userId?.name" class="text-sm text-surface-400 mb-1">
          <span class="text-surface-500">Employee:</span>
          <span class="text-surface-200 font-medium ml-1">{{ leave.userId.name }}</span>
          <span v-if="leave.userId.email" class="text-surface-500 ml-1">({{ leave.userId.email }})</span>
        </p>

        <!-- Dates -->
        <div class="flex items-center gap-2 text-sm text-surface-400 mb-2">
          <svg class="w-4 h-4 text-surface-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>{{ formatDate(leave.startDate) }}</span>
          <span class="text-surface-600">→</span>
          <span>{{ formatDate(leave.endDate) }}</span>
          <span class="text-surface-500">({{ dayCount }} day{{ dayCount !== 1 ? 's' : '' }})</span>
        </div>

        <!-- Reason -->
        <p class="text-sm text-surface-300 leading-relaxed">{{ leave.reason }}</p>

        <!-- Reviewed by -->
        <p v-if="leave.reviewedBy?.name" class="text-xs text-surface-500 mt-2">
          {{ leave.status === 'approved' ? 'Approved' : 'Rejected' }} by {{ leave.reviewedBy.name }}
          <span v-if="leave.reviewedAt"> on {{ formatDate(leave.reviewedAt) }}</span>
        </p>
      </div>

      <!-- Right: Action buttons (employer view, pending only) -->
      <div v-if="showActions && leave.status === 'pending'" class="flex sm:flex-col gap-2 flex-shrink-0">
        <button
          @click="$emit('approve', leave._id)"
          :disabled="actionLoading"
          class="btn-success text-sm flex items-center gap-1.5"
          :id="'approve-btn-' + leave._id"
        >
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          Approve
        </button>
        <button
          @click="$emit('reject', leave._id)"
          :disabled="actionLoading"
          class="btn-danger text-sm flex items-center gap-1.5"
          :id="'reject-btn-' + leave._id"
        >
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
          Reject
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  leave: {
    type: Object,
    required: true,
  },
  showActions: {
    type: Boolean,
    default: false,
  },
  actionLoading: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['approve', 'reject'])

const statusBadgeClass = computed(() => {
  switch (props.leave.status) {
    case 'pending':
      return 'badge-pending'
    case 'approved':
      return 'badge-approved'
    case 'rejected':
      return 'badge-rejected'
    default:
      return 'badge-pending'
  }
})

const dayCount = computed(() => {
  if (!props.leave.startDate || !props.leave.endDate) return 0
  const diff = new Date(props.leave.endDate) - new Date(props.leave.startDate)
  return Math.ceil(diff / (1000 * 60 * 60 * 24)) + 1
})

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}
</script>
