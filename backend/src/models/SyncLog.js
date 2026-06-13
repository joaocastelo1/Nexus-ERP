const mongoose = require('mongoose');

const syncLogSchema = new mongoose.Schema({
  event: { type: String, required: true },
  source: { type: String, required: true },
  target: { type: String, required: true },
  status: { type: String, enum: ['success', 'failed', 'pending'], default: 'success' },
  details: { type: mongoose.Schema.Types.Mixed },
  sourceId: { type: mongoose.Schema.Types.ObjectId },
  targetId: { type: mongoose.Schema.Types.ObjectId },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('SyncLog', syncLogSchema);