const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const InvoiceItem = sequelize.define('invoice_items', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  invoiceId: { type: DataTypes.INTEGER, allowNull: false },
  category: { type: DataTypes.STRING(100), allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
  quantity: { type: DataTypes.INTEGER, defaultValue: 1 },
  unitCost: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0 },
  amount: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0 }
});

module.exports = InvoiceItem;
