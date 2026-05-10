const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Note = sequelize.define('notes', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  tripId: { type: DataTypes.INTEGER, allowNull: false },
  title: { type: DataTypes.STRING(255), allowNull: false },
  body: { type: DataTypes.TEXT, allowNull: false },
  noteDate: { type: DataTypes.DATEONLY, allowNull: false },
  attachment: { type: DataTypes.STRING(500) }
});

module.exports = Note;
