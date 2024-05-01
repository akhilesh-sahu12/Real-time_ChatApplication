const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

// Route: POST /api/messages
router.post('/', messageController.sendMessage);

// Route: GET /api/messages
router.get('/', messageController.getMessages);

module.exports = router;
