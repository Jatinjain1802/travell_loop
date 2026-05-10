const express = require('express');
const controller = require('../controllers/checklistController');
const auth = require('../middleware/authMiddleware');

const router = express.Router({ mergeParams: true });
router.use(auth);
router.get('/', controller.listChecklist);
router.post('/', controller.createChecklistItem);
router.put('/:itemId', controller.updateChecklistItem);
router.delete('/:itemId', controller.deleteChecklistItem);
module.exports = router;
