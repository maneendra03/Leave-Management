<template>
  <form @submit.prevent="handleSubmit" class="card space-y-5">
    <h3 class="text-lg font-semibold text-surface-100 flex items-center gap-2">
      <svg class="w-5 h-5 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
      </svg>
      Apply for Leave
    </h3>

    <!-- Leave Type -->
    <div>
      <label class="block text-sm font-medium text-surface-300 mb-1.5">Leave Type</label>
      <select
        v-model="form.leaveType"
        class="input-field"
        id="leave-type-select"
        required
      >
        <option value="" disabled>Select leave type</option>
        <option value="sick">Sick Leave</option>
        <option value="casual">Casual Leave</option>
        <option value="earned">Earned Leave</option>
        <option value="unpaid">Unpaid Leave</option>
      </select>
      <p v-if="errors.leaveType" class="text-xs text-red-400 mt-1">{{ errors.leaveType }}</p>
    </div>

    <!-- Dates -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <label class="block text-sm font-medium text-surface-300 mb-1.5">Start Date</label>
        <input
          type="date"
          v-model="form.startDate"
          :min="today"
          class="input-field"
          id="start-date-input"
          required
        />
        <p v-if="errors.startDate" class="text-xs text-red-400 mt-1">{{ errors.startDate }}</p>
      </div>
      <div>
        <label class="block text-sm font-medium text-surface-300 mb-1.5">End Date</label>
        <input
          type="date"
          v-model="form.endDate"
          :min="form.startDate || today"
          class="input-field"
          id="end-date-input"
          required
        />
        <p v-if="errors.endDate" class="text-xs text-red-400 mt-1">{{ errors.endDate }}</p>
      </div>
    </div>

    <!-- Reason -->
    <div>
      <label class="block text-sm font-medium text-surface-300 mb-1.5">Reason</label>
      <textarea
        v-model="form.reason"
        rows="3"
        class="input-field resize-none"
        placeholder="Briefly describe your reason for leave..."
        id="leave-reason-input"
        required
      ></textarea>
      <div class="flex justify-between mt-1">
        <p v-if="errors.reason" class="text-xs text-red-400">{{ errors.reason }}</p>
        <p class="text-xs text-surface-500 ml-auto">{{ form.reason.length }}/500</p>
      </div>
    </div>

    <!-- Submit -->
    <button
      type="submit"
      :disabled="loading"
      class="btn-primary w-full flex items-center justify-center gap-2"
      id="apply-leave-btn"
    >
      <svg
        v-if="loading"
        class="w-5 h-5 animate-spin"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
      </svg>
      <span>{{ loading ? 'Submitting...' : 'Submit Application' }}</span>
    </button>
  </form>
</template>

<script setup>
import { ref, reactive } from 'vue'

const emit = defineEmits(['submit'])

const props = defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
})

const today = new Date().toISOString().split('T')[0]

const form = reactive({
  leaveType: '',
  startDate: '',
  endDate: '',
  reason: '',
})

const errors = reactive({
  leaveType: '',
  startDate: '',
  endDate: '',
  reason: '',
})

function validate() {
  let valid = true
  errors.leaveType = ''
  errors.startDate = ''
  errors.endDate = ''
  errors.reason = ''

  if (!form.leaveType) {
    errors.leaveType = 'Please select a leave type'
    valid = false
  }
  if (!form.startDate) {
    errors.startDate = 'Start date is required'
    valid = false
  }
  if (!form.endDate) {
    errors.endDate = 'End date is required'
    valid = false
  }
  if (form.startDate && form.endDate && form.endDate < form.startDate) {
    errors.endDate = 'End date must be on or after start date'
    valid = false
  }
  if (!form.reason || form.reason.trim().length < 5) {
    errors.reason = 'Reason must be at least 5 characters'
    valid = false
  }
  if (form.reason.length > 500) {
    errors.reason = 'Reason cannot exceed 500 characters'
    valid = false
  }

  return valid
}

function handleSubmit() {
  if (!validate()) return

  emit('submit', { ...form })

  // Reset form
  form.leaveType = ''
  form.startDate = ''
  form.endDate = ''
  form.reason = ''
}
</script>
