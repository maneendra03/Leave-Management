<template>
  <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-surface-100">Employer Dashboard</h1>
      <p class="text-surface-400 mt-1">Review and manage employee leave requests</p>
    </div>

    <!-- Stats -->
    <StatsCards :data="stats" :loading="statsLoading" class="mb-8" />

    <!-- Controls -->
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-lg font-semibold text-surface-100">All Leave Requests</h2>
      <select
        v-model="statusFilter"
        class="bg-surface-800 border border-surface-700 rounded-lg px-3 py-1.5 text-sm text-surface-300 focus:outline-none focus:ring-2 focus:ring-primary-500/50"
        id="employer-status-filter"
      >
        <option value="">All Status</option>
        <option value="pending">Pending</option>
        <option value="approved">Approved</option>
        <option value="rejected">Rejected</option>
      </select>
    </div>

    <!-- Loading state -->
    <div v-if="leavesLoading" class="space-y-4">
      <div v-for="n in 4" :key="n" class="card animate-pulse">
        <div class="h-4 bg-surface-800 rounded w-1/4 mb-3"></div>
        <div class="h-3 bg-surface-800 rounded w-1/2 mb-2"></div>
        <div class="h-3 bg-surface-800 rounded w-3/4"></div>
      </div>
    </div>

    <!-- Empty state -->
    <div v-else-if="leaves.length === 0" class="card text-center py-16">
      <svg class="w-16 h-16 text-surface-700 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
      </svg>
      <p class="text-surface-400 font-medium text-lg">No leave requests</p>
      <p class="text-surface-500 text-sm mt-1">
        {{ statusFilter ? 'No requests match the selected filter.' : 'There are no leave requests from employees yet.' }}
      </p>
    </div>

    <!-- Leave list -->
    <div v-else class="space-y-4">
      <LeaveCard
        v-for="leave in leaves"
        :key="leave._id"
        :leave="leave"
        :show-actions="true"
        :action-loading="actionLoadingId === leave._id"
        @approve="handleAction(leave._id, 'approved')"
        @reject="handleAction(leave._id, 'rejected')"
      />
    </div>

    <!-- Pagination -->
    <Pagination
      :current-page="pagination.currentPage"
      :total-pages="pagination.totalPages"
      @page-change="handlePageChange"
    />
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, watch } from 'vue'
import { leaveService } from '../services/leaveService'
import { useToastStore } from '../stores/toast'
import StatsCards from '../components/StatsCards.vue'
import LeaveCard from '../components/LeaveCard.vue'
import Pagination from '../components/Pagination.vue'

const toast = useToastStore()

const stats = ref({ total: 0, pending: 0, approved: 0, rejected: 0 })
const statsLoading = ref(true)
const leaves = ref([])
const leavesLoading = ref(true)
const actionLoadingId = ref(null)
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

    const response = await leaveService.getAllLeaves(params)
    leaves.value = response.data.leaves
    Object.assign(pagination, response.data.pagination)
  } catch {
    toast.error('Failed to load leave requests')
  } finally {
    leavesLoading.value = false
  }
}

async function handleAction(leaveId, status) {
  try {
    actionLoadingId.value = leaveId
    await leaveService.updateLeaveStatus(leaveId, status)
    toast.success(`Leave request ${status} successfully!`)
    await Promise.all([fetchStats(), fetchLeaves()])
  } catch (error) {
    toast.error(error.response?.data?.message || `Failed to ${status} leave request`)
  } finally {
    actionLoadingId.value = null
  }
}

function handlePageChange(page) {
  pagination.currentPage = page
  fetchLeaves()
}

watch(statusFilter, () => {
  pagination.currentPage = 1
  fetchLeaves()
})

onMounted(() => {
  fetchStats()
  fetchLeaves()
})
</script>
