const express = require('express');
const authRoutes = require('./authRoutes');
const tripRoutes = require('./tripRoutes');
const sectionRoutes = require('./sectionRoutes');
const activityRoutes = require('./activityRoutes');
const noteRoutes = require('./noteRoutes');
const checklistRoutes = require('./checklistRoutes');
const invoiceRoutes = require('./invoiceRoutes');
const communityRoutes = require('./communityRoutes');
const searchRoutes = require('./searchRoutes');
const adminRoutes = require('./adminRoutes');
const userRoutes = require('./userRoutes');
const invoiceController = require('../controllers/invoiceController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/health', (_req, res) => {
  res.status(200).json({ message: 'Traveloop API is healthy' });
});

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/trips', tripRoutes);
router.use('/trips/:id/sections', sectionRoutes);
router.use('/trips/:id/sections/:sectionId/activities', activityRoutes);
router.use('/trips/:id/notes', noteRoutes);
router.use('/trips/:id/checklist', checklistRoutes);
router.get('/trips/:id/invoice', authMiddleware, invoiceController.getTripInvoice);
router.use('/invoices', invoiceRoutes);
router.use('/community', communityRoutes);
router.use('/search', searchRoutes);
router.use('/admin', adminRoutes);

module.exports = router;
