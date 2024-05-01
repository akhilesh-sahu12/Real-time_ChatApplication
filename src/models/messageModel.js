const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/postgres');

const Message = sequelize.define('messages', {
    senderId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    recipientId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

// Synchronize the model with the database
(async () => {
    try {
      await sequelize.authenticate(); // Test the database connection
      console.log('Connection to PostgreSQL database has been established successfully');
  
      await Message.sync(); // Synchronize the User model with the database
      console.log('Message model synchronized with the database');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  })();

module.exports = Message;
