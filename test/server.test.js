const request = require('supertest');
const app = require('../server'); 

describe('GET /api/auth/register', () => {
  test('It should respond with 201 status code', async () => {
    const response = await request(app).post('/api/auth/register').send({
      username: 'testuser',
      password: 'testpassword',
    });
    expect(response.statusCode).toBe(201);
  });
});

describe('POST /api/auth/login', () => {
  test('It should respond with 200 status code', async () => {
    const response = await request(app).post('/api/auth/login').send({
      username: 'testuser',
      password: 'testpassword',
    });
    expect(response.statusCode).toBe(200);
  });
});

describe('GET /api/auth/profile', () => {
  test('It should respond with 404 status code for unauthorized user', async () => {
    const response = await request(app).get('/api/auth/profile');
    expect(response.statusCode).toBe(404);
  });
});

describe('GET /api/chat/messages', () => {
  test('It should respond with 200 status code', async () => {
    const response = await request(app).get('/api/chat/messages');
    expect(response.statusCode).toBe(200);
  });
});
