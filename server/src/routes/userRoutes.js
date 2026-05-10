const express = require('express');
const controller = require('../controllers/userController');
const auth = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');

const router = express.Router();
router.use(auth);
router.get('/:id', controller.getProfile);
router.put('/:id', controller.updateProfile);
router.post('/:id/profile-photo', upload.single('profilePhoto'), controller.uploadProfilePhoto);
router.delete('/:id', controller.deleteUser);
router.get('/:id/trips', controller.userTrips);
module.exports = router;
