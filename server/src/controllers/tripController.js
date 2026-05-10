const { StatusCodes } = require('http-status-codes');
const { z } = require('zod');
const { Trip, TripSection, Activity } = require('../models');
const asyncHandler = require('../utils/asyncHandler');

const sectionSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  sectionOrder: z.number().int().positive(),
  startDate: z.string(),
  endDate: z.string(),
  budget: z.number().nonnegative().optional().default(0)
});

const createTripSchema = z.object({
  title: z.string().min(2),
  place: z.string().min(2),
  startDate: z.string(),
  endDate: z.string(),
  status: z.enum(['upcoming', 'ongoing', 'completed']).optional().default('upcoming'),
  totalBudget: z.number().nonnegative().optional().default(0),
  sections: z.array(sectionSchema).optional().default([])
});

const updateTripSchema = createTripSchema.partial();

const listTrips = asyncHandler(async (req, res) => {
  const where = { userId: req.user.id };
  if (req.query.status) {
    where.status = req.query.status;
  }

  const trips = await Trip.findAll({
    where,
    include: [{ model: TripSection, as: 'sections' }],
    order: [['startDate', 'DESC']]
  });

  return res.status(StatusCodes.OK).json({ trips });
});

const createTrip = asyncHandler(async (req, res) => {
  const payload = createTripSchema.parse(req.body);

  const trip = await Trip.create({
    userId: req.user.id,
    title: payload.title,
    place: payload.place,
    startDate: payload.startDate,
    endDate: payload.endDate,
    status: payload.status,
    totalBudget: payload.totalBudget
  });

  if (payload.sections.length) {
    await TripSection.bulkCreate(payload.sections.map((section) => ({
      ...section,
      tripId: trip.id
    })));
  }

  const createdTrip = await Trip.findByPk(trip.id, {
    include: [{ model: TripSection, as: 'sections' }]
  });

  return res.status(StatusCodes.CREATED).json({ trip: createdTrip });
});

const getTripById = asyncHandler(async (req, res) => {
  const trip = await Trip.findOne({
    where: { id: req.params.id, userId: req.user.id },
    include: [{ model: TripSection, as: 'sections' }]
  });

  if (!trip) {
    return res.status(StatusCodes.NOT_FOUND).json({ message: 'Trip not found' });
  }

  return res.status(StatusCodes.OK).json({ trip });
});

const updateTrip = asyncHandler(async (req, res) => {
  const payload = updateTripSchema.parse(req.body);

  const trip = await Trip.findOne({ where: { id: req.params.id, userId: req.user.id } });
  if (!trip) {
    return res.status(StatusCodes.NOT_FOUND).json({ message: 'Trip not found' });
  }

  await trip.update(payload);

  const updatedTrip = await Trip.findByPk(trip.id, {
    include: [{ model: TripSection, as: 'sections' }]
  });

  return res.status(StatusCodes.OK).json({ trip: updatedTrip });
});

const deleteTrip = asyncHandler(async (req, res) => {
  const trip = await Trip.findOne({ where: { id: req.params.id, userId: req.user.id } });
  if (!trip) {
    return res.status(StatusCodes.NOT_FOUND).json({ message: 'Trip not found' });
  }

  await trip.destroy();
  return res.status(StatusCodes.OK).json({ message: 'Trip deleted successfully' });
});

const getItinerary = asyncHandler(async (req, res) => {
  const trip = await Trip.findOne({
    where: { id: req.params.id, userId: req.user.id },
    include: [{
      model: TripSection,
      as: 'sections',
      include: [{ model: Activity, as: 'activities' }]
    }]
  });
  if (!trip) return res.status(StatusCodes.NOT_FOUND).json({ message: 'Trip not found' });
  return res.status(StatusCodes.OK).json({ itinerary: trip.sections });
});

const updateItinerary = asyncHandler(async (req, res) => {
  const trip = await Trip.findOne({ where: { id: req.params.id, userId: req.user.id } });
  if (!trip) return res.status(StatusCodes.NOT_FOUND).json({ message: 'Trip not found' });
  const sections = z.array(sectionSchema).parse(req.body.sections || []);
  await TripSection.destroy({ where: { tripId: trip.id } });
  if (sections.length) {
    await TripSection.bulkCreate(sections.map((s) => ({ ...s, tripId: trip.id })));
  }
  const updated = await Trip.findByPk(trip.id, { include: [{ model: TripSection, as: 'sections' }] });
  return res.status(StatusCodes.OK).json({ trip: updated });
});

module.exports = {
  listTrips,
  createTrip,
  getTripById,
  updateTrip,
  deleteTrip,
  getItinerary,
  updateItinerary
};
