const express = require('express');
const router = express.Router();
const {
  applyLeave,
  getMyLeaves,
  getAllLeaves,
  updateLeaveStatus,
  getStats,
} = require('../controllers/leaveController');
const authenticate = require('../middleware/auth');
const authorize = require('../middleware/role');
const {
  validateLeaveApplication,
  validateStatusUpdate,
  validatePagination,
} = require('../middleware/validate');

// All leave routes require authentication
router.use(authenticate);

// Dashboard stats (both roles)
router.get('/stats', getStats);

// Employee routes
router.post('/apply', authorize('employee'), validateLeaveApplication, applyLeave);
router.get('/my-leaves', authorize('employee'), validatePagination, getMyLeaves);

// Employer routes
router.get('/all', authorize('employer'), validatePagination, getAllLeaves);
router.put('/:id/status', authorize('employer'), validateStatusUpdate, updateLeaveStatus);

module.exports = router;
