const { z } = require('zod');
const { StatusCodes } = require('http-status-codes');
const { Note } = require('../models');
const asyncHandler = require('../utils/asyncHandler');
const assertTripOwnership = require('../utils/assertTripOwnership');
const fileToPublicUrl = require('../utils/fileToPublicUrl');

const schema = z.object({ title: z.string().min(1), body: z.string().min(1), noteDate: z.string(), attachment: z.string().optional() });

const listNotes = asyncHandler(async (req, res) => {
  await assertTripOwnership(Number(req.params.id), req.user.id);
  const notes = await Note.findAll({ where: { tripId: Number(req.params.id) }, order: [['noteDate', 'DESC']] });
  res.status(StatusCodes.OK).json({ notes });
});
const createNote = asyncHandler(async (req, res) => {
  await assertTripOwnership(Number(req.params.id), req.user.id);
  const note = await Note.create({ ...schema.parse(req.body), tripId: Number(req.params.id) });
  res.status(StatusCodes.CREATED).json({ note });
});
const uploadNoteAttachment = asyncHandler(async (req, res) => {
  await assertTripOwnership(Number(req.params.id), req.user.id);
  const note = await Note.findOne({ where: { id: Number(req.params.noteId), tripId: Number(req.params.id) } });
  if (!note) return res.status(StatusCodes.NOT_FOUND).json({ message: 'Note not found' });
  if (!req.file) return res.status(StatusCodes.BAD_REQUEST).json({ message: 'File is required' });
  await note.update({ attachment: fileToPublicUrl(req, req.file) });
  res.status(StatusCodes.OK).json({ note });
});
const updateNote = asyncHandler(async (req, res) => {
  await assertTripOwnership(Number(req.params.id), req.user.id);
  const note = await Note.findOne({ where: { id: Number(req.params.noteId), tripId: Number(req.params.id) } });
  if (!note) return res.status(StatusCodes.NOT_FOUND).json({ message: 'Note not found' });
  await note.update(schema.partial().parse(req.body));
  res.status(StatusCodes.OK).json({ note });
});
const deleteNote = asyncHandler(async (req, res) => {
  await assertTripOwnership(Number(req.params.id), req.user.id);
  const count = await Note.destroy({ where: { id: Number(req.params.noteId), tripId: Number(req.params.id) } });
  if (!count) return res.status(StatusCodes.NOT_FOUND).json({ message: 'Note not found' });
  res.status(StatusCodes.OK).json({ message: 'Note deleted' });
});

module.exports = { listNotes, createNote, uploadNoteAttachment, updateNote, deleteNote };
