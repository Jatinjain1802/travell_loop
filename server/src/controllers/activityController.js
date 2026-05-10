const { z } = require('zod');
const { StatusCodes } = require('http-status-codes');
const { Activity, TripSection } = require('../models');
const asyncHandler = require('../utils/asyncHandler');
const assertTripOwnership = require('../utils/assertTripOwnership');

const schema = z.object({ name: z.string().min(1), type: z.string().min(1), description: z.string().optional(), expense: z.number().nonnegative().optional().default(0), activityDate: z.string() });

const listActivitiesBySection = asyncHandler(async (req, res) => {
  await assertTripOwnership(Number(req.params.id), req.user.id);
  const section = await TripSection.findOne({ where: { id: Number(req.params.sectionId), tripId: Number(req.params.id) } });
  if (!section) return res.status(StatusCodes.NOT_FOUND).json({ message: 'Section not found' });
  const activities = await Activity.findAll({ where: { sectionId: section.id }, order: [['activityDate', 'ASC']] });
  res.status(StatusCodes.OK).json({ activities });
});

const createActivity = asyncHandler(async (req, res) => {
  await assertTripOwnership(Number(req.params.id), req.user.id);
  const section = await TripSection.findOne({ where: { id: Number(req.params.sectionId), tripId: Number(req.params.id) } });
  if (!section) return res.status(StatusCodes.NOT_FOUND).json({ message: 'Section not found' });
  const activity = await Activity.create({ ...schema.parse(req.body), sectionId: section.id });
  res.status(StatusCodes.CREATED).json({ activity });
});

const updateActivity = asyncHandler(async (req, res) => {
  await assertTripOwnership(Number(req.params.id), req.user.id);
  const section = await TripSection.findOne({ where: { id: Number(req.params.sectionId), tripId: Number(req.params.id) } });
  if (!section) return res.status(StatusCodes.NOT_FOUND).json({ message: 'Section not found' });
  const activity = await Activity.findOne({ where: { id: Number(req.params.activityId), sectionId: section.id } });
  if (!activity) return res.status(StatusCodes.NOT_FOUND).json({ message: 'Activity not found' });
  await activity.update(schema.partial().parse(req.body));
  res.status(StatusCodes.OK).json({ activity });
});

const deleteActivity = asyncHandler(async (req, res) => {
  await assertTripOwnership(Number(req.params.id), req.user.id);
  const section = await TripSection.findOne({ where: { id: Number(req.params.sectionId), tripId: Number(req.params.id) } });
  if (!section) return res.status(StatusCodes.NOT_FOUND).json({ message: 'Section not found' });
  const count = await Activity.destroy({ where: { id: Number(req.params.activityId), sectionId: section.id } });
  if (!count) return res.status(StatusCodes.NOT_FOUND).json({ message: 'Activity not found' });
  res.status(StatusCodes.OK).json({ message: 'Activity deleted' });
});

module.exports = { listActivitiesBySection, createActivity, updateActivity, deleteActivity };
