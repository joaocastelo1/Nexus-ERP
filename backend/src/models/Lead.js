const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  company: { type: String },
  source: { type: String, enum: ['website', 'referral', 'social', 'ads', 'other'], default: 'website' },
  status: { 
    type: String, 
    enum: ['new', 'contacted', 'qualified', 'proposal', 'negotiation', 'won', 'lost'], 
    default: 'new' 
  },
  value: { type: Number, default: 0 },
  notes: { type: String },
  stage: { 
    type: String, 
    enum: ['lead', 'qualification', 'proposal', 'negotiation', 'closed_won', 'closed_lost'], 
    default: 'lead' 
  },
  probability: { type: Number, default: 10 },
  expectedCloseDate: { type: Date },
  crmClientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Lead', leadSchema);