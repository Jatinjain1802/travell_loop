const { z } = require('zod');
const { StatusCodes } = require('http-status-codes');
const { ChecklistItem } = require('../models');
const asyncHandler = require('../utils/asyncHandler');
const assertTripOwnership = require('../utils/assertTripOwnership');

const schema = z.object({ category: z.string().min(1), itemName: z.string().min(1), isPacked: z.boolean().optional().default(false) });

const listChecklist = asyncHandler(async (req, res) => {
  await assertTripOwnership(Number(req.params.id), req.user.id);
  const items = await ChecklistItem.findAll({ where: { tripId: Number(req.params.id) }, order: [['createdAt', 'DESC']] });
  res.status(StatusCodes.OK).json({ items });
});
const createChecklistItem = asyncHandler(async (req, res) => {
  await assertTripOwnership(Number(req.params.id), req.user.id);
  const item = await ChecklistItem.create({ ...schema.parse(req.body), tripId: Number(req.params.id) });
  res.status(StatusCodes.CREATED).json({ item });
});
const updateChecklistItem = asyncHandler(async (req, res) => {
  await assertTripOwnership(Number(req.params.id), req.user.id);
  const item = await ChecklistItem.findOne({ where: { id: Number(req.params.itemId), tripId: Number(req.params.id) } });
  if (!item) return res.status(StatusCodes.NOT_FOUND).json({ message: 'Item not found' });
  await item.update(schema.partial().parse(req.body));
  res.status(StatusCodes.OK).json({ item });
});
const deleteChecklistItem = asyncHandler(async (req, res) => {
  await assertTripOwnership(Number(req.params.id), req.user.id);
  const count = await ChecklistItem.destroy({ where: { id: Number(req.params.itemId), tripId: Number(req.params.id) } });
  if (!count) return res.status(StatusCodes.NOT_FOUND).json({ message: 'Item not found' });
  res.status(StatusCodes.OK).json({ message: 'Item deleted' });
});

module.exports = { listChecklist, createChecklistItem, updateChecklistItem, deleteChecklistItem };
