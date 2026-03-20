import api from './api'

export const leaveService = {
  async applyLeave(data) {
    const response = await api.post('/leave/apply', data)
    return response.data
  },

  async getMyLeaves(params = {}) {
    const response = await api.get('/leave/my-leaves', { params })
    return response.data
  },

  async getAllLeaves(params = {}) {
    const response = await api.get('/leave/all', { params })
    return response.data
  },

  async updateLeaveStatus(id, status) {
    const response = await api.put(`/leave/${id}/status`, { status })
    return response.data
  },

  async getStats() {
    const response = await api.get('/leave/stats')
    return response.data
  },
}
