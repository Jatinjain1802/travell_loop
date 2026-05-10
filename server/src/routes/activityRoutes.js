const express = require('express');
const controller = require('../controllers/activityController');
const auth = require('../middleware/authMiddleware');

const router = express.Router({ mergeParams: true });
router.use(auth);
router.get('/', controller.listActivitiesBySection);
router.post('/', controller.createActivity);
router.put('/:activityId', controller.updateActivity);
router.delete('/:activityId', controller.deleteActivity);
module.exports = router;
