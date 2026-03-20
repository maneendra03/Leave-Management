<template>
  <div class="min-h-screen bg-surface-950">
    <Navbar v-if="authStore.isAuthenticated" />
    <Toast />
    <router-view v-slot="{ Component }">
      <transition name="page" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useAuthStore } from './stores/auth'
import Navbar from './components/Navbar.vue'
import Toast from './components/Toast.vue'

const authStore = useAuthStore()

onMounted(() => {
  authStore.initAuth()
})
</script>
