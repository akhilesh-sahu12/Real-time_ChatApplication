const { Sequelize } = require('sequelize');
const sequelize = require('../config/postgres');

describe('PostgreSQL Connection', () => {
  test('It should connect to the PostgreSQL database successfully', async () => {
    try {
      await sequelize.authenticate();
      console.log('Connection to PostgreSQL has been established successfully.');
      expect(true).toBe(true); // This line is just to ensure the test passes if the connection is successful
    } catch (error) {
      console.error('Unable to connect to the PostgreSQL database:', error);
      expect(false).toBe(true); // This line ensures the test fails if there's an error in connecting
    }
  });
});
