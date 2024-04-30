const { Sequelize } = require('sequelize');

// Define PostgreSQL connection parameters
const sequelize = new Sequelize('real_time_chat_application', 'akhilesh', 'root', {
  host: 'localhost',
  dialect: 'postgres',
  port: 5432, // Default PostgreSQL port
});

module.exports = sequelize;