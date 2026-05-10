const User = require('./User');
const Trip = require('./Trip');
const TripSection = require('./TripSection');
const Activity = require('./Activity');
const Note = require('./Note');
const ChecklistItem = require('./ChecklistItem');
const Invoice = require('./Invoice');
const InvoiceItem = require('./InvoiceItem');
const CommunityPost = require('./CommunityPost');
const Destination = require('./Destination');
const RefreshToken = require('./RefreshToken');

User.hasMany(Trip, { foreignKey: 'userId', as: 'trips', onDelete: 'CASCADE' });
Trip.belongsTo(User, { foreignKey: 'userId', as: 'user' });

Trip.hasMany(TripSection, { foreignKey: 'tripId', as: 'sections', onDelete: 'CASCADE' });
TripSection.belongsTo(Trip, { foreignKey: 'tripId', as: 'trip' });

TripSection.hasMany(Activity, { foreignKey: 'sectionId', as: 'activities', onDelete: 'CASCADE' });
Activity.belongsTo(TripSection, { foreignKey: 'sectionId', as: 'section' });

Trip.hasMany(Note, { foreignKey: 'tripId', as: 'notes', onDelete: 'CASCADE' });
Note.belongsTo(Trip, { foreignKey: 'tripId', as: 'trip' });

Trip.hasMany(ChecklistItem, { foreignKey: 'tripId', as: 'checklistItems', onDelete: 'CASCADE' });
ChecklistItem.belongsTo(Trip, { foreignKey: 'tripId', as: 'trip' });

Trip.hasOne(Invoice, { foreignKey: 'tripId', as: 'invoice', onDelete: 'CASCADE' });
Invoice.belongsTo(Trip, { foreignKey: 'tripId', as: 'trip' });

Invoice.hasMany(InvoiceItem, { foreignKey: 'invoiceId', as: 'items', onDelete: 'CASCADE' });
InvoiceItem.belongsTo(Invoice, { foreignKey: 'invoiceId', as: 'invoice' });

User.hasMany(CommunityPost, { foreignKey: 'userId', as: 'posts', onDelete: 'CASCADE' });
CommunityPost.belongsTo(User, { foreignKey: 'userId', as: 'user' });
Trip.hasMany(CommunityPost, { foreignKey: 'tripId', as: 'posts', onDelete: 'SET NULL' });
CommunityPost.belongsTo(Trip, { foreignKey: 'tripId', as: 'trip' });

User.hasMany(RefreshToken, { foreignKey: 'userId', as: 'refreshTokens', onDelete: 'CASCADE' });
RefreshToken.belongsTo(User, { foreignKey: 'userId', as: 'user' });

module.exports = {
  User,
  Trip,
  TripSection,
  Activity,
  Note,
  ChecklistItem,
  Invoice,
  InvoiceItem,
  CommunityPost,
  Destination,
  RefreshToken
};
