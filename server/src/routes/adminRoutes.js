const express = require('express');
const controller = require('../controllers/adminController');
const auth = require('../middleware/authMiddleware');
const admin = require('../middleware/adminMiddleware');

const router = express.Router();
router.use(auth, admin);
router.get('/users', controller.listUsers);
router.patch('/users/:id/ban', controller.banUser);
router.get('/analytics', controller.analytics);
router.get('/popular-cities', controller.popularCities);
router.get('/popular-activities', controller.popularActivities);
module.exports = router;
