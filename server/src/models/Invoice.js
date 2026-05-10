const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Invoice = sequelize.define('invoices', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  tripId: { type: DataTypes.INTEGER, allowNull: false },
  invoiceNumber: { type: DataTypes.STRING(100), allowNull: false, unique: true },
  generatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  paymentStatus: { type: DataTypes.ENUM('pending', 'paid'), defaultValue: 'pending' },
  subtotal: { type: DataTypes.DECIMAL(12, 2), defaultValue: 0 },
  tax: { type: DataTypes.DECIMAL(12, 2), defaultValue: 0 },
  discount: { type: DataTypes.DECIMAL(12, 2), defaultValue: 0 },
  grandTotal: { type: DataTypes.DECIMAL(12, 2), defaultValue: 0 }
});

module.exports = Invoice;
