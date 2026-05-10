const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const ChecklistItem = sequelize.define('checklist_items', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  tripId: { type: DataTypes.INTEGER, allowNull: false },
  category: { type: DataTypes.STRING(100), allowNull: false },
  itemName: { type: DataTypes.STRING(255), allowNull: false },
  isPacked: { type: DataTypes.BOOLEAN, defaultValue: false }
});

module.exports = ChecklistItem;
