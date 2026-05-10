const express = require('express');
const controller = require('../controllers/invoiceController');
const auth = require('../middleware/authMiddleware');

const router = express.Router();
router.use(auth);
router.post('/generate', controller.generateInvoice);
router.patch('/:id/mark-paid', controller.markPaid);
router.get('/:id/pdf', controller.invoicePdf);
module.exports = router;
