const mongoose = require('mongoose');

const interactionSchema = new mongoose.Schema({
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  type: { type: String, enum: ['call', 'email', 'meeting', 'note'], required: true },
  description: { type: String, required: true },
  date: { type: Date, default: Date.now },
  nextAction: { type: String },
  nextActionDate: { type: Date },
  outcome: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Interaction', interactionSchema);