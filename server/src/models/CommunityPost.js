const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const CommunityPost = sequelize.define('community_posts', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userId: { type: DataTypes.INTEGER, allowNull: false },
  tripId: { type: DataTypes.INTEGER, allowNull: true },
  content: { type: DataTypes.TEXT, allowNull: false }
});

module.exports = CommunityPost;
