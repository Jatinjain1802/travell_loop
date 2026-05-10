const express = require('express');
const controller = require('../controllers/noteController');
const auth = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');

const router = express.Router({ mergeParams: true });
router.use(auth);
router.get('/', controller.listNotes);
router.post('/', controller.createNote);
router.post('/:noteId/attachment', upload.single('attachment'), controller.uploadNoteAttachment);
router.put('/:noteId', controller.updateNote);
router.delete('/:noteId', controller.deleteNote);
module.exports = router;
