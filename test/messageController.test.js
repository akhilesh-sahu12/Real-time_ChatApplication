const request = require('supertest');
const messageModel = require('../src/models/messageModel');
const app = require('../server'); 
const messageController = require('../src/controllers/messageController');

// Mock message data for testing
const mockMessages = [
  { id: 1, content: 'Message 1', senderId: 1, recipientId: 2 },
  { id: 2, content: 'Message 2', senderId: 2, recipientId: 1 },
];

// Mock message model methods
jest.mock('../models/messageModel', () => ({
  create: jest.fn(),
  findAll: jest.fn(() => mockMessages),
}));

describe('Message Controller', () => {
  describe('sendMessage', () => {
    test('It should respond with 201 status code and create a new message', async () => {
      const req = {
        body: {
          content: 'New message',
          senderId: 1,
          recipientId: 2,
        },
      };
      const res = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };

      await messageController.sendMessage(req, res);

      expect(messageModel.create).toHaveBeenCalledWith({ content: 'New message', senderId: 1, recipientId: 2 });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ message: 'Message sent successfully', data: mockMessages[0] });
    });
  });

  describe('getMessages', () => {
    test('It should respond with 200 status code and retrieve all messages', async () => {
      const req = {};
      const res = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };

      await messageController.getMessages(req, res);

      expect(messageModel.findAll).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockMessages);
    });
  });
});
