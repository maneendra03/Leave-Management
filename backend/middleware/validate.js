const { body, param, query } = require('express-validator');
const { validationResult } = require('express-validator');

/**
 * Middleware that checks for validation errors from express-validator
 * and returns a 400 response with structured error messages.
 */
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const messages = errors.array().map((err) => err.msg);
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: messages,
    });
  }
  next();
};

// ── Auth Validators ──────────────────────────────────────────────────────

const validateSignup = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be 2–100 characters'),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
  body('role')
    .notEmpty()
    .withMessage('Role is required')
    .isIn(['employee', 'employer'])
    .withMessage('Role must be either employee or employer'),
  handleValidationErrors,
];

const validateLogin = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('password').notEmpty().withMessage('Password is required'),
  handleValidationErrors,
];

// ── Leave Validators ─────────────────────────────────────────────────────

const validateLeaveApplication = [
  body('leaveType')
    .notEmpty()
    .withMessage('Leave type is required')
    .isIn(['sick', 'casual', 'earned', 'unpaid'])
    .withMessage('Leave type must be one of: sick, casual, earned, unpaid'),
  body('startDate')
    .notEmpty()
    .withMessage('Start date is required')
    .isISO8601()
    .withMessage('Start date must be a valid date'),
  body('endDate')
    .notEmpty()
    .withMessage('End date is required')
    .isISO8601()
    .withMessage('End date must be a valid date')
    .custom((value, { req }) => {
      if (new Date(value) < new Date(req.body.startDate)) {
        throw new Error('End date must be on or after start date');
      }
      return true;
    }),
  body('reason')
    .trim()
    .notEmpty()
    .withMessage('Reason is required')
    .isLength({ min: 5, max: 500 })
    .withMessage('Reason must be 5–500 characters'),
  handleValidationErrors,
];

const validateStatusUpdate = [
  param('id').isMongoId().withMessage('Invalid leave request ID'),
  body('status')
    .notEmpty()
    .withMessage('Status is required')
    .isIn(['approved', 'rejected'])
    .withMessage('Status must be either approved or rejected'),
  handleValidationErrors,
];

const validatePagination = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),
  query('status')
    .optional()
    .isIn(['pending', 'approved', 'rejected'])
    .withMessage('Status filter must be one of: pending, approved, rejected'),
  handleValidationErrors,
];

module.exports = {
  validateSignup,
  validateLogin,
  validateLeaveApplication,
  validateStatusUpdate,
  validatePagination,
};
