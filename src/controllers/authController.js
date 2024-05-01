const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const authController = {
  async register(req, res) {
    try {
      const { username, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await userModel.create({ username, password: hashedPassword });
      res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  async login(req, res) {
    try {
      const { username, password } = req.body;
      const user = await userModel.findOne({ where: { username } });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  async getUserProfile(req, res) {
    try {
      // User ID is extracted from JWT token, which is attached in the request header
      const userId = req.userId;
      const user = await userModel.findByPk(userId, { attributes: { exclude: ['password'] } });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

async getAllUsers(req, res) {
  try {
    // Retrieve all users from the database
    const users = await userModel.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
};


module.exports = authController;
