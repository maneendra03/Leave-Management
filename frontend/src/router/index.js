import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const routes = [
  {
    path: '/',
    name: 'Landing',
    component: () => import('../views/LandingView.vue'),
    meta: { public: true },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/LoginView.vue'),
    meta: { guest: true },
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import('../views/SignupView.vue'),
    meta: { guest: true },
  },
  {
    path: '/employee/dashboard',
    name: 'EmployeeDashboard',
    component: () => import('../views/EmployeeDashboard.vue'),
    meta: { requiresAuth: true, role: 'employee' },
  },
  {
    path: '/employer/dashboard',
    name: 'EmployerDashboard',
    component: () => import('../views/EmployerDashboard.vue'),
    meta: { requiresAuth: true, role: 'employer' },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

// Navigation guards
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  // If route requires auth and user is not authenticated
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return next({ name: 'Login' })
  }

  // If guest-only route and user is authenticated (redirect to dashboard)
  if (to.meta.guest && authStore.isAuthenticated) {
    const dashboard = authStore.isEmployee
      ? 'EmployeeDashboard'
      : 'EmployerDashboard'
    return next({ name: dashboard })
  }

  // If route has role restriction and user doesn't have the right role
  if (to.meta.role && authStore.user?.role !== to.meta.role) {
    const dashboard = authStore.isEmployee
      ? 'EmployeeDashboard'
      : 'EmployerDashboard'
    return next({ name: dashboard })
  }

  next()
})

export default router
