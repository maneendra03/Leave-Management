import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { authService } from '../services/authService'
import { useToastStore } from './toast'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const token = ref(null)
  const loading = ref(false)

  // Getters
  const isAuthenticated = computed(() => !!token.value)
  const isEmployee = computed(() => user.value?.role === 'employee')
  const isEmployer = computed(() => user.value?.role === 'employer')
  const userName = computed(() => user.value?.name || '')

  /**
   * Initialize auth state from localStorage
   */
  function initAuth() {
    const savedToken = localStorage.getItem('token')
    const savedUser = localStorage.getItem('user')
    if (savedToken && savedUser) {
      token.value = savedToken
      try {
        user.value = JSON.parse(savedUser)
      } catch {
        logout()
      }
    }
  }

  /**
   * Sign up a new user
   */
  async function signup(formData) {
    const toast = useToastStore()
    loading.value = true
    try {
      const response = await authService.signup(formData)
      toast.success('Account created successfully! Please log in.')
      return response
    } catch (error) {
      const message = error.response?.data?.message || 'Signup failed'
      toast.error(message)
      throw error
    } finally {
      loading.value = false
    }
  }

  /**
   * Log in an existing user
   */
  async function login(credentials) {
    const toast = useToastStore()
    loading.value = true
    try {
      const response = await authService.login(credentials)
      token.value = response.data.token
      user.value = response.data.user
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('user', JSON.stringify(response.data.user))
      toast.success(`Welcome back, ${response.data.user.name}!`)
      return response
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed'
      toast.error(message)
      throw error
    } finally {
      loading.value = false
    }
  }

  /**
   * Log out the current user
   */
  function logout() {
    user.value = null
    token.value = null
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  return {
    user,
    token,
    loading,
    isAuthenticated,
    isEmployee,
    isEmployer,
    userName,
    initAuth,
    signup,
    login,
    logout,
  }
})
