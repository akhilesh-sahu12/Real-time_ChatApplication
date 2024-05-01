const chatService = require('../services/chatService');
const { broadcastMessage } = require('../utils/websocket');

exports.sendMessage = async (req, res) => {
    try {
        console.log(req.body);
        await chatService.sendMessage(req.body);
        console.log(req.body);
        res.status(200).end();
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getMessages = async (req, res) => {
    try {
        const messages = await chatService.getMessages(req.query);
        res.json(messages);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};



exports.sendBroadcastMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const wss = req.app.get('wss');
        broadcastMessage(wss, message);
        res.status(200).json({ success: true, message: 'Message sent to WebSocket clients' });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};
