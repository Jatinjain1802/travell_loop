const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Destination = sequelize.define('destinations', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING(255), allowNull: false },
  country: { type: DataTypes.STRING(100), allowNull: false },
  description: { type: DataTypes.TEXT },
  imageUrl: { type: DataTypes.STRING(500) },
  isPopular: { type: DataTypes.BOOLEAN, defaultValue: false }
});

module.exports = Destination;
