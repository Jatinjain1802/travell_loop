const { Op } = require('sequelize');
const { StatusCodes } = require('http-status-codes');
const { Activity, Destination } = require('../models');
const asyncHandler = require('../utils/asyncHandler');

const search = asyncHandler(async (req, res) => {
  const q = req.query.q || '';
  const type = req.query.type || 'activity';

  if (type === 'destination') {
    const results = await Destination.findAll({ where: { name: { [Op.like]: `%${q}%` } }, limit: 30 });
    return res.status(StatusCodes.OK).json({ results });
  }

  const results = await Activity.findAll({ where: { name: { [Op.like]: `%${q}%` } }, limit: 30 });
  return res.status(StatusCodes.OK).json({ results });
});

const listDestinations = asyncHandler(async (req, res) => {
  const where = {};
  if (req.query.popular === 'true') where.isPopular = true;
  const destinations = await Destination.findAll({ where, order: [['name', 'ASC']] });
  res.status(StatusCodes.OK).json({ destinations });
});

module.exports = { search, listDestinations };
