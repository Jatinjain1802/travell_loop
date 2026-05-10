const express = require('express');
const controller = require('../controllers/communityController');
const auth = require('../middleware/authMiddleware');

const router = express.Router();
router.get('/posts', controller.listPosts);
router.post('/posts', auth, controller.createPost);
router.delete('/posts/:id', auth, controller.deletePost);
module.exports = router;
