<template>
  <div class="min-h-screen flex items-center justify-center px-4 py-12">
    <!-- Background decoration -->
    <div class="fixed inset-0 -z-10 overflow-hidden">
      <div class="absolute top-0 left-1/4 w-96 h-96 bg-primary-600/10 rounded-full blur-3xl"></div>
      <div class="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-600/10 rounded-full blur-3xl"></div>
    </div>

    <div class="w-full max-w-md animate-slide-up">
      <!-- Logo -->
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 mb-4 shadow-glow-lg">
          <svg class="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <h1 class="text-2xl font-bold bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
          HuskyVoice AI
        </h1>
        <p class="text-surface-400 mt-1 text-sm">Sign in to your account</p>
      </div>

      <!-- Form Card -->
      <form @submit.prevent="handleLogin" class="card space-y-5">
        <div>
          <label class="block text-sm font-medium text-surface-300 mb-1.5">Email</label>
          <input
            type="email"
            v-model="form.email"
            class="input-field"
            placeholder="you@example.com"
            id="login-email"
            required
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-surface-300 mb-1.5">Password</label>
          <input
            type="password"
            v-model="form.password"
            class="input-field"
            placeholder="••••••••"
            id="login-password"
            required
          />
        </div>

        <button
          type="submit"
          :disabled="authStore.loading"
          class="btn-primary w-full flex items-center justify-center gap-2"
          id="login-submit-btn"
        >
          <svg
            v-if="authStore.loading"
            class="w-5 h-5 animate-spin"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <span>{{ authStore.loading ? 'Signing in...' : 'Sign In' }}</span>
        </button>

        <p class="text-center text-sm text-surface-400">
          Don't have an account?
          <router-link to="/signup" class="text-primary-400 hover:text-primary-300 font-medium transition-colors" id="goto-signup">
            Create one
          </router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const form = reactive({
  email: '',
  password: '',
})

async function handleLogin() {
  try {
    const response = await authStore.login(form)
    const role = response.data.user.role
    router.push(role === 'employee' ? '/employee/dashboard' : '/employer/dashboard')
  } catch {
    // Error handled by store
  }
}
</script>
