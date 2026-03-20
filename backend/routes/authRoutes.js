const express = require('express');
const router = express.Router();
const { signup, login, getMe } = require('../controllers/authController');
const { validateSignup, validateLogin } = require('../middleware/validate');
const authenticate = require('../middleware/auth');

// Public routes
router.post('/signup', validateSignup, signup);
router.post('/login', validateLogin, login);

// Protected routes
router.get('/me', authenticate, getMe);

module.exports = router;
