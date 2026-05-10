const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Activity = sequelize.define('activities', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  sectionId: { type: DataTypes.INTEGER, allowNull: false },
  name: { type: DataTypes.STRING(255), allowNull: false },
  type: { type: DataTypes.STRING(100), allowNull: false },
  description: { type: DataTypes.TEXT },
  expense: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0 },
  activityDate: { type: DataTypes.DATEONLY, allowNull: false }
});

module.exports = Activity;
