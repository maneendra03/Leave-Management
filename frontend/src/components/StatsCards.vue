<template>
  <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
    <div
      v-for="stat in stats"
      :key="stat.label"
      class="card-hover group"
    >
      <div class="flex items-center justify-between mb-3">
        <div :class="stat.iconBg" class="w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-200 group-hover:scale-110">
          <component :is="stat.icon" class="w-5 h-5" :class="stat.iconColor" />
        </div>
        <span class="text-2xl font-bold text-surface-100">
          {{ loading ? '—' : stat.value }}
        </span>
      </div>
      <p class="text-sm text-surface-400 font-medium">{{ stat.label }}</p>
    </div>
  </div>
</template>

<script setup>
import { computed, h } from 'vue'

const props = defineProps({
  data: {
    type: Object,
    default: () => ({ total: 0, pending: 0, approved: 0, rejected: 0 }),
  },
  loading: {
    type: Boolean,
    default: false,
  },
})

// SVG icon components
const TotalIcon = {
  render() {
    return h('svg', { fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', 'stroke-width': '2' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' })
    ])
  }
}

const PendingIcon = {
  render() {
    return h('svg', { fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', 'stroke-width': '2' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' })
    ])
  }
}

const ApprovedIcon = {
  render() {
    return h('svg', { fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', 'stroke-width': '2' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' })
    ])
  }
}

const RejectedIcon = {
  render() {
    return h('svg', { fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', 'stroke-width': '2' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z' })
    ])
  }
}

const stats = computed(() => [
  {
    label: 'Total Requests',
    value: props.data.total,
    icon: TotalIcon,
    iconBg: 'bg-primary-500/15',
    iconColor: 'text-primary-400',
  },
  {
    label: 'Pending',
    value: props.data.pending,
    icon: PendingIcon,
    iconBg: 'bg-amber-500/15',
    iconColor: 'text-amber-400',
  },
  {
    label: 'Approved',
    value: props.data.approved,
    icon: ApprovedIcon,
    iconBg: 'bg-emerald-500/15',
    iconColor: 'text-emerald-400',
  },
  {
    label: 'Rejected',
    value: props.data.rejected,
    icon: RejectedIcon,
    iconBg: 'bg-red-500/15',
    iconColor: 'text-red-400',
  },
])
</script>
