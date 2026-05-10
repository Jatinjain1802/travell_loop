const express = require('express');
const tripController = require('../controllers/tripController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.use(authMiddleware);

router.get('/', tripController.listTrips);
router.post('/', tripController.createTrip);
router.get('/:id', tripController.getTripById);
router.put('/:id', tripController.updateTrip);
router.delete('/:id', tripController.deleteTrip);
router.get('/:id/itinerary', tripController.getItinerary);
router.put('/:id/itinerary', tripController.updateItinerary);

module.exports = router;
