const request = require('supertest');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../src/models/userModel'); 
const app = require('../server'); 
const authController = require('../src/controllers/authController');

// Mock user data for testing
const mockUser = {
  id: 1,
  username: 'testuser',
  password: 'testpassword',
};

// Mock user model methods
jest.mock('../models/userModel', () => ({
  create: jest.fn(() => mockUser),
  findOne: jest.fn(),
  findByPk: jest.fn(() => mockUser),
  findAll: jest.fn(() => [mockUser]),
}));

// Mock bcrypt methods
jest.mock('bcrypt', () => ({
  hash: jest.fn(() => 'hashedPassword'),
  compare: jest.fn(() => true),
}));

// Mock jwt method
jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(() => 'mockToken'),
}));

describe('Auth Controller', () => {
  describe('register', () => {
    test('It should respond with 201 status code and create a new user', async () => {
      const req = {
        body: {
          username: 'testuser',
          password: 'testpassword',
        },
      };
      const res = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };

      await authController.register(req, res);

      expect(userModel.create).toHaveBeenCalledWith({ username: 'testuser', password: 'hashedPassword' });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ message: 'User created successfully', user: mockUser });
    });
  });

  describe('login', () => {
    test('It should respond with 200 status code and generate a JWT token', async () => {
      const req = {
        body: {
          username: 'testuser',
          password: 'testpassword',
        },
      };
      const res = {
        json: jest.fn(),
      };

      await authController.login(req, res);

      expect(userModel.findOne).toHaveBeenCalledWith({ where: { username: 'testuser' } });
      expect(bcrypt.compare).toHaveBeenCalledWith('testpassword', 'testpassword');
      expect(jwt.sign).toHaveBeenCalledWith({ userId: 1 }, process.env.JWT_SECRET, { expiresIn: '1h' });
      expect(res.json).toHaveBeenCalledWith({ token: 'mockToken' });
    });

    test('It should respond with 401 status code for invalid credentials', async () => {
      const req = {
        body: {
          username: 'invaliduser',
          password: 'invalidpassword',
        },
      };
      const res = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };

      await authController.login(req, res);

      expect(userModel.findOne).toHaveBeenCalledWith({ where: { username: 'invaliduser' } });
      expect(bcrypt.compare).toHaveBeenCalledTimes(0);
      expect(jwt.sign).toHaveBeenCalledTimes(0);
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ error: 'Invalid username or password' });
    });
  });

  describe('getUserProfile', () => {
    test('It should respond with user profile data', async () => {
      const req = { userId: 1 };
      const res = {
        json: jest.fn(),
      };

      await authController.getUserProfile(req, res);

      expect(userModel.findByPk).toHaveBeenCalledWith(1, { attributes: { exclude: ['password'] } });
      expect(res.json).toHaveBeenCalledWith(mockUser);
    });

    test('It should respond with 404 status code for user not found', async () => {
      const req = { userId: 999 };
      const res = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };

      await authController.getUserProfile(req, res);

      expect(userModel.findByPk).toHaveBeenCalledWith(999, { attributes: { exclude: ['password'] } });
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'User not found' });
    });
  });

  describe('getAllUsers', () => {
    test('It should respond with 200 status code and retrieve all users', async () => {
      const req = {};
      const res = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };

      await authController.getAllUsers(req, res);

      expect(userModel.findAll).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([mockUser]);
    });
  });
});
