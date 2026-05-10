const bcrypt = require('bcryptjs');
const { StatusCodes } = require('http-status-codes');
const { z } = require('zod');
const { User } = require('../models');
const asyncHandler = require('../utils/asyncHandler');
const sanitizeUser = require('../utils/sanitizeUser');
const { signAccessToken, signRefreshToken, verifyRefreshToken } = require('../utils/jwt');
const { setAuthCookies, clearAuthCookies } = require('../utils/cookies');

const registerSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
  phone: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
  bio: z.string().optional()
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

const register = asyncHandler(async (req, res) => {
  const payload = registerSchema.parse(req.body);

  const existingUser = await User.findOne({ where: { email: payload.email } });
  if (existingUser) {
    return res.status(StatusCodes.CONFLICT).json({ message: 'Email already exists' });
  }

  const passwordHash = await bcrypt.hash(payload.password, 10);

  const user = await User.create({
    ...payload,
    passwordHash
  });

  const accessToken = signAccessToken(user);
  const refreshToken = signRefreshToken(user);
  setAuthCookies(res, accessToken, refreshToken);

  return res.status(StatusCodes.CREATED).json({
    message: 'Registered successfully',
    user: sanitizeUser(user),
    token: accessToken
  });
});

const login = asyncHandler(async (req, res) => {
  const payload = loginSchema.parse(req.body);

  const user = await User.findOne({ where: { email: payload.email } });
  if (!user || !user.isActive) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Invalid credentials' });
  }

  const isPasswordValid = await bcrypt.compare(payload.password, user.passwordHash);
  if (!isPasswordValid) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Invalid credentials' });
  }

  const accessToken = signAccessToken(user);
  const refreshToken = signRefreshToken(user);
  setAuthCookies(res, accessToken, refreshToken);

  return res.status(StatusCodes.OK).json({
    message: 'Login successful',
    user: sanitizeUser(user),
    token: accessToken
  });
});

const me = asyncHandler(async (req, res) => {
  const user = await User.findByPk(req.user.id);
  if (!user) {
    return res.status(StatusCodes.NOT_FOUND).json({ message: 'User not found' });
  }

  return res.status(StatusCodes.OK).json({ user: sanitizeUser(user) });
});

const refresh = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Refresh token missing' });
  }

  try {
    const payload = verifyRefreshToken(refreshToken);
    const user = await User.findByPk(payload.sub);

    if (!user || !user.isActive) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Invalid refresh token' });
    }

    const accessToken = signAccessToken(user);
    const newRefreshToken = signRefreshToken(user);
    setAuthCookies(res, accessToken, newRefreshToken);

    return res.status(StatusCodes.OK).json({ token: accessToken });
  } catch (_err) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Invalid refresh token' });
  }
});

const logout = asyncHandler(async (_req, res) => {
  clearAuthCookies(res);
  return res.status(StatusCodes.OK).json({ message: 'Logged out successfully' });
});

module.exports = {
  register,
  login,
  me,
  refresh,
  logout
};
