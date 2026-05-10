const { StatusCodes } = require('http-status-codes');
const { Trip } = require('../models');

async function assertTripOwnership(tripId, userId) {
  const trip = await Trip.findByPk(tripId);
  if (!trip) {
    const err = new Error('Trip not found');
    err.statusCode = StatusCodes.NOT_FOUND;
    throw err;
  }

  if (trip.userId !== userId) {
    const err = new Error('Forbidden');
    err.statusCode = StatusCodes.FORBIDDEN;
    throw err;
  }

  return trip;
}

module.exports = assertTripOwnership;
