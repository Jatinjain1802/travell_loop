const { z } = require('zod');
const { StatusCodes } = require('http-status-codes');
const { User, Trip } = require('../models');
const asyncHandler = require('../utils/asyncHandler');
const sanitizeUser = require('../utils/sanitizeUser');
const fileToPublicUrl = require('../utils/fileToPublicUrl');

const updateSchema = z.object({ firstName: z.string().min(2).optional(), lastName: z.string().min(2).optional(), phone: z.string().optional(), city: z.string().optional(), country: z.string().optional(), bio: z.string().optional() });

const getProfile = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);
  if (req.user.id !== id && req.user.role !== 'admin') return res.status(StatusCodes.FORBIDDEN).json({ message: 'Forbidden' });
  const user = await User.findByPk(id);
  if (!user) return res.status(StatusCodes.NOT_FOUND).json({ message: 'User not found' });
  res.status(StatusCodes.OK).json({ user: sanitizeUser(user) });
});

const updateProfile = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);
  if (req.user.id !== id && req.user.role !== 'admin') return res.status(StatusCodes.FORBIDDEN).json({ message: 'Forbidden' });
  const user = await User.findByPk(id);
  if (!user) return res.status(StatusCodes.NOT_FOUND).json({ message: 'User not found' });
  await user.update(updateSchema.parse(req.body));
  res.status(StatusCodes.OK).json({ user: sanitizeUser(user) });
});

const uploadProfilePhoto = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);
  if (req.user.id !== id && req.user.role !== 'admin') return res.status(StatusCodes.FORBIDDEN).json({ message: 'Forbidden' });
  const user = await User.findByPk(id);
  if (!user) return res.status(StatusCodes.NOT_FOUND).json({ message: 'User not found' });
  if (!req.file) return res.status(StatusCodes.BAD_REQUEST).json({ message: 'File is required' });

  await user.update({ profilePic: fileToPublicUrl(req, req.file) });
  res.status(StatusCodes.OK).json({ user: sanitizeUser(user) });
});

const deleteUser = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);
  if (req.user.id !== id && req.user.role !== 'admin') return res.status(StatusCodes.FORBIDDEN).json({ message: 'Forbidden' });
  const count = await User.destroy({ where: { id } });
  if (!count) return res.status(StatusCodes.NOT_FOUND).json({ message: 'User not found' });
  res.status(StatusCodes.OK).json({ message: 'User deleted' });
});

const userTrips = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);
  if (req.user.id !== id && req.user.role !== 'admin') return res.status(StatusCodes.FORBIDDEN).json({ message: 'Forbidden' });
  const trips = await Trip.findAll({ where: { userId: id }, order: [['startDate', 'DESC']] });
  res.status(StatusCodes.OK).json({ trips });
});

module.exports = { getProfile, updateProfile, uploadProfilePhoto, deleteUser, userTrips };
