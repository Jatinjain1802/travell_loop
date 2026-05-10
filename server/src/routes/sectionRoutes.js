const express = require('express');
const controller = require('../controllers/sectionController');
const auth = require('../middleware/authMiddleware');

const router = express.Router({ mergeParams: true });
router.use(auth);
router.get('/', controller.listSections);
router.post('/', controller.createSection);
router.put('/:sectionId', controller.updateSection);
router.delete('/:sectionId', controller.deleteSection);
module.exports = router;
