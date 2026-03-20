<template>
  <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-surface-100">My Dashboard</h1>
      <p class="text-surface-400 mt-1">Manage your leave applications</p>
    </div>

    <!-- Stats -->
    <StatsCards :data="stats" :loading="statsLoading" class="mb-8" />

    <!-- Main grid -->
    <div class="grid lg:grid-cols-5 gap-8">
      <!-- Leave Form (2/5) -->
      <div class="lg:col-span-2">
        <LeaveForm :loading="applyLoading" @submit="handleApplyLeave" />
      </div>

      <!-- Leave History (3/5) -->
      <div class="lg:col-span-3">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-semibold text-surface-100">Leave History</h2>
          <!-- Status filter -->
          <select
            v-model="statusFilter"
            class="bg-surface-800 border border-surface-700 rounded-lg px-3 py-1.5 text-sm text-surface-300 focus:outline-none focus:ring-2 focus:ring-primary-500/50"
            id="status-filter"
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        <!-- Loading state -->
        <div v-if="leavesLoading" class="space-y-4">
          <div v-for="n in 3" :key="n" class="card animate-pulse">
            <div class="h-4 bg-surface-800 rounded w-1/4 mb-3"></div>
            <div class="h-3 bg-surface-800 rounded w-1/2 mb-2"></div>
            <div class="h-3 bg-surface-800 rounded w-3/4"></div>
          </div>
        </div>

        <!-- Empty state -->
        <div v-else-if="leaves.length === 0" class="card text-center py-12">
          <svg class="w-12 h-12 text-surface-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p class="text-surface-400 font-medium">No leave requests found</p>
          <p class="text-surface-500 text-sm mt-1">Submit your first leave application using the form.</p>
        </div>

        <!-- Leave list -->
        <div v-else class="space-y-4">
          <LeaveCard v-for="leave in leaves" :key="leave._id" :leave="leave" />
        </div>

        <!-- Pagination -->
        <Pagination
          :current-page="pagination.currentPage"
          :total-pages="pagination.totalPages"
          @page-change="handlePageChange"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, watch } from 'vue'
import { leaveService } from '../services/leaveService'
import { useToastStore } from '../stores/toast'
import StatsCards from '../components/StatsCards.vue'
import LeaveForm from '../components/LeaveForm.vue'
import LeaveCard from '../components/LeaveCard.vue'
import Pagination from '../components/Pagination.vue'

const toast = useToastStore()

const stats = ref({ total: 0, pending: 0, approved: 0, rejected: 0 })
const statsLoading = ref(true)
const leaves = ref([])
const leavesLoading = ref(true)
const applyLoading = ref(false)
const statusFilter = ref('')
const pagination = reactive({
  currentPage: 1,
  totalPages: 1,
  totalItems: 0,
})

async function fetchStats() {
  try {
    statsLoading.value = true
    const response = await leaveService.getStats()
    stats.value = response.data.stats
  } catch {
    toast.error('Failed to load stats')
  } finally {
    statsLoading.value = false
  }
}

async function fetchLeaves() {
  try {
    leavesLoading.value = true
    const params = {
      page: pagination.currentPage,
      limit: 10,
    }
    if (statusFilter.value) params.status = statusFilter.value

    const response = await leaveService.getMyLeaves(params)
    leaves.value = response.data.leaves
    Object.assign(pagination, response.data.pagination)
  } catch {
    toast.error('Failed to load leave requests')
  } finally {
    leavesLoading.value = false
  }
}

async function handleApplyLeave(formData) {
  try {
    applyLoading.value = true
    await leaveService.applyLeave(formData)
    toast.success('Leave application submitted successfully!')
    await Promise.all([fetchStats(), fetchLeaves()])
  } catch (error) {
    toast.error(error.response?.data?.message || 'Failed to submit leave application')
  } finally {
    applyLoading.value = false
  }
}

function handlePageChange(page) {
  pagination.currentPage = page
  fetchLeaves()
}

// Re-fetch when filter changes
watch(statusFilter, () => {
  pagination.currentPage = 1
  fetchLeaves()
})

onMounted(() => {
  fetchStats()
  fetchLeaves()
})
</script>
