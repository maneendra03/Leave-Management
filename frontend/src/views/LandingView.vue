<template>
  <div class="min-h-screen bg-surface-950">
    <!-- Navigation -->
    <nav class="fixed top-0 w-full z-50 border-b border-surface-800/50 bg-surface-950/80 backdrop-blur-xl">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center gap-2.5">
            <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
              <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            <span class="text-lg font-bold text-surface-100">HuskyVoice AI</span>
          </div>
          <div class="flex items-center gap-4">
            <router-link to="/login" class="text-sm font-medium text-surface-400 hover:text-surface-200 transition-colors">
              Log in
            </router-link>
            <router-link to="/signup" class="bg-surface-100 hover:bg-white text-surface-900 font-semibold text-sm px-5 py-2 rounded-lg transition-all duration-200">
              Get Started
            </router-link>
          </div>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section class="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="max-w-3xl">
          <div class="inline-flex items-center gap-2 text-sm text-primary-400 bg-primary-500/10 border border-primary-500/20 rounded-full px-4 py-1.5 mb-8">
            <span class="w-1.5 h-1.5 rounded-full bg-primary-400"></span>
            Internal Leave Management Portal
          </div>
          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-surface-50 tracking-tight leading-[1.1]">
            Manage employee leave
            <br />
            <span class="bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">with complete clarity.</span>
          </h1>
          <p class="mt-6 text-lg text-surface-400 leading-relaxed max-w-xl">
            A streamlined internal tool for submitting, tracking, and approving leave requests. Built to replace spreadsheets and manual tracking with a clean, reliable workflow.
          </p>
          <div class="mt-10 flex flex-wrap gap-4">
            <router-link to="/signup" class="bg-surface-100 hover:bg-white text-surface-900 font-semibold text-base px-8 py-3 rounded-lg transition-all duration-200 inline-flex items-center gap-2">
              Get Started
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
            </router-link>
            <router-link to="/login" class="bg-surface-800 hover:bg-surface-700 text-surface-200 font-medium text-base px-8 py-3 rounded-lg border border-surface-700 transition-all duration-200">
              Sign in to your account
            </router-link>
          </div>
        </div>
      </div>
      <!-- Background gradients -->
      <div class="absolute top-20 right-0 w-[500px] h-[500px] bg-primary-600/8 rounded-full blur-3xl -z-10"></div>
      <div class="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-accent-600/6 rounded-full blur-3xl -z-10"></div>
    </section>

    <!-- Stats Bar -->
    <section class="border-y border-surface-800/50 bg-surface-900/40">
      <div class="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div>
            <p class="text-3xl font-bold text-surface-100">24/7</p>
            <p class="text-sm text-surface-500 mt-1">Always accessible</p>
          </div>
          <div>
            <p class="text-3xl font-bold text-surface-100">100%</p>
            <p class="text-sm text-surface-500 mt-1">Digital tracking</p>
          </div>
          <div>
            <p class="text-3xl font-bold text-surface-100">Instant</p>
            <p class="text-sm text-surface-500 mt-1">Status updates</p>
          </div>
          <div>
            <p class="text-3xl font-bold text-surface-100">Secure</p>
            <p class="text-sm text-surface-500 mt-1">Role-based access</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-20 lg:py-28">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="max-w-2xl mb-16">
          <h2 class="text-3xl sm:text-4xl font-bold text-surface-100 tracking-tight">How it works</h2>
          <p class="mt-4 text-surface-400 text-lg">From request to approval in three straightforward steps. No paperwork, no confusion.</p>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <!-- Step 1 -->
          <div class="bg-surface-900/60 border border-surface-800 rounded-2xl p-8 hover:border-surface-700 transition-all duration-300">
            <div class="w-10 h-10 rounded-xl bg-primary-500/15 flex items-center justify-center mb-5">
              <svg class="w-5 h-5 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
              </svg>
            </div>
            <p class="text-xs font-semibold text-primary-400 uppercase tracking-wider mb-2">Step 1</p>
            <h3 class="text-lg font-semibold text-surface-100 mb-2">Submit a request</h3>
            <p class="text-sm text-surface-400 leading-relaxed">Employees select the leave type, pick dates, and add a reason. Built-in validation prevents overlapping or past-date requests automatically.</p>
          </div>

          <!-- Step 2 -->
          <div class="bg-surface-900/60 border border-surface-800 rounded-2xl p-8 hover:border-surface-700 transition-all duration-300">
            <div class="w-10 h-10 rounded-xl bg-emerald-500/15 flex items-center justify-center mb-5">
              <svg class="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p class="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">Step 2</p>
            <h3 class="text-lg font-semibold text-surface-100 mb-2">Review and approve</h3>
            <p class="text-sm text-surface-400 leading-relaxed">Managers see all pending requests on a consolidated dashboard. Approve or decline with a single click, with instant notifications.</p>
          </div>

          <!-- Step 3 -->
          <div class="bg-surface-900/60 border border-surface-800 rounded-2xl p-8 hover:border-surface-700 transition-all duration-300">
            <div class="w-10 h-10 rounded-xl bg-amber-500/15 flex items-center justify-center mb-5">
              <svg class="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
              </svg>
            </div>
            <p class="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2">Step 3</p>
            <h3 class="text-lg font-semibold text-surface-100 mb-2">Track everything</h3>
            <p class="text-sm text-surface-400 leading-relaxed">Real-time dashboard with leave statistics, status filters, and complete history. Both employees and managers get full visibility.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Capabilities Section -->
    <section class="py-20 lg:py-28 border-t border-surface-800/50">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <h2 class="text-3xl sm:text-4xl font-bold text-surface-100 tracking-tight mb-6">Built for real teams</h2>
            <p class="text-surface-400 text-lg leading-relaxed mb-8">
              HuskyVoice AI Leave Management handles the details so your team can focus on what matters. Production-grade security and validation from the start.
            </p>
            <ul class="space-y-4">
              <li class="flex items-start gap-3">
                <div class="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                  <svg class="w-3 h-3 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg>
                </div>
                <span class="text-surface-300 text-sm">JWT authentication with bcrypt password hashing</span>
              </li>
              <li class="flex items-start gap-3">
                <div class="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                  <svg class="w-3 h-3 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg>
                </div>
                <span class="text-surface-300 text-sm">Separate Employee and Employer dashboards</span>
              </li>
              <li class="flex items-start gap-3">
                <div class="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                  <svg class="w-3 h-3 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg>
                </div>
                <span class="text-surface-300 text-sm">Sick, casual, earned, and unpaid leave types</span>
              </li>
              <li class="flex items-start gap-3">
                <div class="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                  <svg class="w-3 h-3 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg>
                </div>
                <span class="text-surface-300 text-sm">Overlap detection prevents conflicting dates</span>
              </li>
              <li class="flex items-start gap-3">
                <div class="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                  <svg class="w-3 h-3 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg>
                </div>
                <span class="text-surface-300 text-sm">Rate limiting and HTTP security headers</span>
              </li>
            </ul>
          </div>

          <!-- Mock UI Preview -->
          <div class="bg-surface-900 border border-surface-800 rounded-2xl p-6">
            <div class="flex items-center gap-2 mb-5">
              <div class="w-2.5 h-2.5 rounded-full bg-red-500/60"></div>
              <div class="w-2.5 h-2.5 rounded-full bg-amber-500/60"></div>
              <div class="w-2.5 h-2.5 rounded-full bg-emerald-500/60"></div>
              <span class="text-xs text-surface-600 ml-2">Leave Dashboard</span>
            </div>
            <div class="space-y-3">
              <div class="flex items-center justify-between p-3.5 bg-surface-800/60 rounded-xl border border-surface-700/50">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 bg-surface-700 rounded-full flex items-center justify-center text-xs font-bold text-surface-300">RS</div>
                  <div>
                    <p class="text-sm font-medium text-surface-200">Sick Leave</p>
                    <p class="text-xs text-surface-500">Mar 21 - Mar 23, 2026</p>
                  </div>
                </div>
                <span class="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">Approved</span>
              </div>
              <div class="flex items-center justify-between p-3.5 bg-surface-800/60 rounded-xl border border-surface-700/50">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 bg-surface-700 rounded-full flex items-center justify-center text-xs font-bold text-surface-300">AK</div>
                  <div>
                    <p class="text-sm font-medium text-surface-200">Casual Leave</p>
                    <p class="text-xs text-surface-500">Mar 28 - Mar 28, 2026</p>
                  </div>
                </div>
                <span class="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/20">Pending</span>
              </div>
              <div class="flex items-center justify-between p-3.5 bg-surface-800/60 rounded-xl border border-surface-700/50">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 bg-surface-700 rounded-full flex items-center justify-center text-xs font-bold text-surface-300">PV</div>
                  <div>
                    <p class="text-sm font-medium text-surface-200">Earned Leave</p>
                    <p class="text-xs text-surface-500">Apr 5 - Apr 12, 2026</p>
                  </div>
                </div>
                <span class="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-red-500/15 text-red-400 border border-red-500/20">Rejected</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 lg:py-28 border-t border-surface-800/50">
      <div class="max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <h2 class="text-3xl sm:text-4xl font-bold text-surface-100 tracking-tight">Ready to get started?</h2>
        <p class="mt-4 text-surface-400 text-lg max-w-lg mx-auto">Create your account to start managing leave requests for your team today.</p>
        <div class="mt-8 flex flex-wrap justify-center gap-4">
          <router-link to="/signup" class="bg-surface-100 hover:bg-white text-surface-900 font-semibold text-base px-8 py-3 rounded-lg transition-all duration-200 inline-flex items-center gap-2">
            Create free account
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
          </router-link>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="border-t border-surface-800/50 bg-surface-950">
      <div class="max-w-7xl mx-auto px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div class="flex items-center gap-2">
          <div class="w-6 h-6 rounded bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
            <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
          </div>
          <span class="text-sm font-semibold text-surface-300">HuskyVoice AI</span>
        </div>
        <p class="text-xs text-surface-600">Leave Management System</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
</script>
