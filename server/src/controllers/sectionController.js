const { z } = require('zod');
const { StatusCodes } = require('http-status-codes');
const { TripSection } = require('../models');
const asyncHandler = require('../utils/asyncHandler');
const assertTripOwnership = require('../utils/assertTripOwnership');

const sectionSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  sectionOrder: z.number().int().positive(),
  startDate: z.string(),
  endDate: z.string(),
  budget: z.number().nonnegative().optional().default(0)
});

const createSection = asyncHandler(async (req, res) => {
  await assertTripOwnership(Number(req.params.id), req.user.id);
  const payload = sectionSchema.parse(req.body);
  const section = await TripSection.create({ ...payload, tripId: Number(req.params.id) });
  res.status(StatusCodes.CREATED).json({ section });
});

const listSections = asyncHandler(async (req, res) => {
  await assertTripOwnership(Number(req.params.id), req.user.id);
  const sections = await TripSection.findAll({ where: { tripId: Number(req.params.id) }, order: [['sectionOrder', 'ASC']] });
  res.status(StatusCodes.OK).json({ sections });
});

const updateSection = asyncHandler(async (req, res) => {
  await assertTripOwnership(Number(req.params.id), req.user.id);
  const payload = sectionSchema.partial().parse(req.body);
  const section = await TripSection.findOne({ where: { id: Number(req.params.sectionId), tripId: Number(req.params.id) } });
  if (!section) return res.status(StatusCodes.NOT_FOUND).json({ message: 'Section not found' });
  await section.update(payload);
  res.status(StatusCodes.OK).json({ section });
});

const deleteSection = asyncHandler(async (req, res) => {
  await assertTripOwnership(Number(req.params.id), req.user.id);
  const count = await TripSection.destroy({ where: { id: Number(req.params.sectionId), tripId: Number(req.params.id) } });
  if (!count) return res.status(StatusCodes.NOT_FOUND).json({ message: 'Section not found' });
  res.status(StatusCodes.OK).json({ message: 'Section deleted' });
});

module.exports = { createSection, listSections, updateSection, deleteSection };
