const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  document: { type: String },
  documentType: { type: String, enum: ['cpf', 'cnpj'], default: 'cpf' },
  address: {
    street: { type: String },
    city: { type: String },
    state: { type: String },
    zipCode: { type: String },
    country: { type: String, default: 'Brasil' }
  },
  status: { type: String, enum: ['active', 'inactive', 'blocked'], default: 'active' },
  score: { type: Number, default: 0, min: 0, max: 100 },
  totalPurchases: { type: Number, default: 0 },
  totalSpent: { type: Number, default: 0 },
  crmLeadId: { type: mongoose.Schema.Types.ObjectId, ref: 'Lead' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Client', clientSchema);