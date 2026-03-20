const Leave = require('../models/Leave');

/**
 * @desc    Apply for leave (Employee)
 * @route   POST /api/leave/apply
 * @access  Private (Employee)
 */
const applyLeave = async (req, res, next) => {
  try {
    const { leaveType, startDate, endDate, reason } = req.body;

    // Additional date validation
    const start = new Date(startDate);
    const end = new Date(endDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (start < today) {
      return res.status(400).json({
        success: false,
        message: 'Start date cannot be in the past.',
      });
    }

    // Check for overlapping leave requests
    const overlapping = await Leave.findOne({
      userId: req.user._id,
      status: { $ne: 'rejected' },
      $or: [
        { startDate: { $lte: end }, endDate: { $gte: start } },
      ],
    });

    if (overlapping) {
      return res.status(409).json({
        success: false,
        message: 'You already have a leave request that overlaps with these dates.',
      });
    }

    const leave = await Leave.create({
      userId: req.user._id,
      leaveType,
      startDate: start,
      endDate: end,
      reason,
    });

    res.status(201).json({
      success: true,
      message: 'Leave application submitted successfully.',
      data: { leave },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get my leaves with pagination & optional status filter (Employee)
 * @route   GET /api/leave/my-leaves
 * @access  Private (Employee)
 */
const getMyLeaves = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const statusFilter = req.query.status;

    const query = { userId: req.user._id };
    if (statusFilter) {
      query.status = statusFilter;
    }

    const [leaves, total] = await Promise.all([
      Leave.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Leave.countDocuments(query),
    ]);

    res.status(200).json({
      success: true,
      data: {
        leaves,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          totalItems: total,
          itemsPerPage: limit,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all leaves with pagination & optional status filter (Employer)
 * @route   GET /api/leave/all
 * @access  Private (Employer)
 */
const getAllLeaves = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const statusFilter = req.query.status;

    const query = {};
    if (statusFilter) {
      query.status = statusFilter;
    }

    const [leaves, total] = await Promise.all([
      Leave.find(query)
        .populate('userId', 'name email')
        .populate('reviewedBy', 'name')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Leave.countDocuments(query),
    ]);

    res.status(200).json({
      success: true,
      data: {
        leaves,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          totalItems: total,
          itemsPerPage: limit,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update leave status — approve or reject (Employer)
 * @route   PUT /api/leave/:id/status
 * @access  Private (Employer)
 */
const updateLeaveStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const leave = await Leave.findById(id);
    if (!leave) {
      return res.status(404).json({
        success: false,
        message: 'Leave request not found.',
      });
    }

    if (leave.status !== 'pending') {
      return res.status(400).json({
        success: false,
        message: `Leave request has already been ${leave.status}.`,
      });
    }

    leave.status = status;
    leave.reviewedBy = req.user._id;
    leave.reviewedAt = new Date();
    await leave.save();

    // Populate user info for the response
    await leave.populate('userId', 'name email');
    await leave.populate('reviewedBy', 'name');

    res.status(200).json({
      success: true,
      message: `Leave request has been ${status}.`,
      data: { leave },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get dashboard statistics
 * @route   GET /api/leave/stats
 * @access  Private
 */
const getStats = async (req, res, next) => {
  try {
    const query = req.user.role === 'employee' ? { userId: req.user._id } : {};

    const [total, pending, approved, rejected] = await Promise.all([
      Leave.countDocuments(query),
      Leave.countDocuments({ ...query, status: 'pending' }),
      Leave.countDocuments({ ...query, status: 'approved' }),
      Leave.countDocuments({ ...query, status: 'rejected' }),
    ]);

    res.status(200).json({
      success: true,
      data: {
        stats: { total, pending, approved, rejected },
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  applyLeave,
  getMyLeaves,
  getAllLeaves,
  updateLeaveStatus,
  getStats,
};
