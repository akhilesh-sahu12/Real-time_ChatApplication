const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

// Route: POST /api/chat/send
router.post('/send', chatController.sendMessage);

// Route: POST /api/chat/send
router.post('/send-message', chatController.sendBroadcastMessage);

// Route: POST /api/chat/messages
router.get('/messages', chatController.getMessages);

module.exports = router;
