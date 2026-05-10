const express = require('express');
const controller = require('../controllers/searchController');

const router = express.Router();
router.get('/', controller.search);
router.get('/destinations', controller.listDestinations);
module.exports = router;
