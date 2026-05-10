const { StatusCodes } = require('http-status-codes');
const { fn, col, literal } = require('sequelize');
const { User, Trip, TripSection, Activity } = require('../models');
const asyncHandler = require('../utils/asyncHandler');

const listUsers = asyncHandler(async (_req, res) => {
  const users = await User.findAll({ attributes: { exclude: ['passwordHash'] }, order: [['createdAt', 'DESC']] });
  res.status(StatusCodes.OK).json({ users });
});

const banUser = asyncHandler(async (req, res) => {
  const user = await User.findByPk(Number(req.params.id));
  if (!user) return res.status(StatusCodes.NOT_FOUND).json({ message: 'User not found' });
  await user.update({ isActive: false });
  res.status(StatusCodes.OK).json({ message: 'User banned' });
});

const analytics = asyncHandler(async (_req, res) => {
  const totalUsers = await User.count();
  const totalTrips = await Trip.count();
  const totalActivities = await Activity.count();
  res.status(StatusCodes.OK).json({ totalUsers, totalTrips, totalActivities });
});

const popularCities = asyncHandler(async (_req, res) => {
  const rows = await Trip.findAll({ attributes: ['place', [fn('COUNT', col('id')), 'count']], group: ['place'], order: [[literal('count'), 'DESC']], limit: 10 });
  res.status(StatusCodes.OK).json({ cities: rows });
});

const popularActivities = asyncHandler(async (_req, res) => {
  const rows = await Activity.findAll({ attributes: ['name', [fn('COUNT', col('id')), 'count']], group: ['name'], order: [[literal('count'), 'DESC']], limit: 10 });
  res.status(StatusCodes.OK).json({ activities: rows });
});

module.exports = { listUsers, banUser, analytics, popularCities, popularActivities };
