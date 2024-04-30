const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authUtils = require('../utils/authUtils');

// Route: POST /api/auth/register
router.post('/register', authController.register);

// Route: POST /api/auth/login
router.post('/login', authController.login);

// Route: GET /api/auth/profile
router.get('/profile', authUtils.authenticateToken, authController.getUserProfile);

module.exports = router;