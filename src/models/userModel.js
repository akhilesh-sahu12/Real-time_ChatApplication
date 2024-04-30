const { DataTypes } = require('sequelize');

// import the Sequelize connection configuration for PostgreSQL
const sequelize = require('../../config/postgres');

// Define the User model
const User = sequelize.define('user', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

// Synchronize the model with the database
(async () => {
  try {
    await sequelize.authenticate(); // Test the database connection
    console.log('Connection to PostgreSQL database has been established successfully');

    await User.sync(); // Synchronize the User model with the database
    console.log('User model synchronized with the database');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

module.exports = User;
