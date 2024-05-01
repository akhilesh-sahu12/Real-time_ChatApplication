const jwt = require('jsonwebtoken');
const { authenticateToken } = require('../src/utils/authMiddleware');

describe('authenticateToken middleware', () => {
  test('It should return Unauthorized if no token provided', () => {
    const req = { headers: {} };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();

    authenticateToken(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'Unauthorized' });
    expect(next).not.toHaveBeenCalled();
  });

  test('It should return Forbidden if invalid token provided', () => {
    const req = { headers: { authorization: 'Bearer invalid_token' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();

    authenticateToken(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ error: 'Forbidden' });
    expect(next).not.toHaveBeenCalled();
  });

  test('It should set userId in request if valid token provided', () => {
    const token = jwt.sign({ userId: 123 }, 'secret_key');
    const req = { headers: { authorization: `Bearer ${token}` } };
    const res = {};
    const next = jest.fn();

    authenticateToken(req, res, next);

    expect(req.userId).toBe(123);
    expect(next).toHaveBeenCalled();
  });
});
