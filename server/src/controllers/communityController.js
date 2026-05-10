const { z } = require('zod');
const { StatusCodes } = require('http-status-codes');
const { CommunityPost, User } = require('../models');
const asyncHandler = require('../utils/asyncHandler');

const createSchema = z.object({ content: z.string().min(1), tripId: z.number().int().positive().optional() });

const listPosts = asyncHandler(async (_req, res) => {
  const posts = await CommunityPost.findAll({ include: [{ model: User, as: 'user', attributes: ['id', 'firstName', 'lastName'] }], order: [['createdAt', 'DESC']] });
  res.status(StatusCodes.OK).json({ posts });
});

const createPost = asyncHandler(async (req, res) => {
  const post = await CommunityPost.create({ ...createSchema.parse(req.body), userId: req.user.id });
  res.status(StatusCodes.CREATED).json({ post });
});

const deletePost = asyncHandler(async (req, res) => {
  const post = await CommunityPost.findByPk(Number(req.params.id));
  if (!post) return res.status(StatusCodes.NOT_FOUND).json({ message: 'Post not found' });
  if (post.userId !== req.user.id && req.user.role !== 'admin') return res.status(StatusCodes.FORBIDDEN).json({ message: 'Forbidden' });
  await post.destroy();
  res.status(StatusCodes.OK).json({ message: 'Post deleted' });
});

module.exports = { listPosts, createPost, deletePost };
