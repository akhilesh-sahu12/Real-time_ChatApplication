const Message = require('../models/messageModel');

const messageController = {
  async sendMessage(req, res) {
    try {
      const { content, senderId, recipientId } = req.body;
      const newMessage = await Message.create({ content, senderId, recipientId });
      res.status(201).json({ message: 'Message sent successfully', data: newMessage });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  async getMessages(req, res) {
    try {
      const messages = await Message.findAll();
      res.status(200).json(messages);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};

module.exports = messageController;
