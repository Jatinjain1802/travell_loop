const express = require('express');
const authRoutes = require('./authRoutes');
const tripRoutes = require('./tripRoutes');

const router = express.Router();

router.get('/health', (_req, res) => {
  res.status(200).json({ message: 'Traveloop API is healthy' });
});

router.use('/auth', authRoutes);
router.use('/trips', tripRoutes);

module.exports = router;
