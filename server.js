const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const sequelize = require('./config/postgres');
require('dotenv').config();

const port = process.env.PORT || 3000;


// Test the connection
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

// Invoke the function to test the connection
testConnection();

// Export the Sequelize instance
module.exports = sequelize;

// Import routes
const authRoutes = require('./src/routes/authRoutes');

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
