const { mongoose } = require('./_db');

const leadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  company: String,
  source: { type: String, enum: ['website', 'referral', 'social', 'ads', 'other'], default: 'website' },
  status: { type: String, enum: ['new', 'contacted', 'qualified', 'proposal', 'negotiation', 'won', 'lost'], default: 'new' },
  value: { type: Number, default: 0 },
  notes: String,
  stage: { type: String, enum: ['lead', 'qualification', 'proposal', 'negotiation', 'closed_won', 'closed_lost'], default: 'lead' },
  probability: { type: Number, default: 10 },
  expectedCloseDate: Date,
  crmClientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const clientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  document: String,
  documentType: { type: String, enum: ['cpf', 'cnpj'], default: 'cpf' },
  address: {
    street: String, city: String, state: String, zipCode: String, country: { type: String, default: 'Brasil' }
  },
  status: { type: String, enum: ['active', 'inactive', 'blocked'], default: 'active' },
  score: { type: Number, default: 0, min: 0, max: 100 },
  totalPurchases: { type: Number, default: 0 },
  totalSpent: { type: Number, default: 0 },
  crmLeadId: { type: mongoose.Schema.Types.ObjectId, ref: 'Lead' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sku: { type: String, required: true },
  description: String,
  category: String,
  costPrice: { type: Number, required: true, min: 0 },
  salePrice: { type: Number, required: true, min: 0 },
  quantity: { type: Number, default: 0, min: 0 },
  minStock: { type: Number, default: 5, min: 0 },
  unit: { type: String, default: 'un' },
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const saleItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  productName: { type: String, required: true },
  quantity: { type: Number, required: true, min: 1 },
  unitPrice: { type: Number, required: true },
  total: { type: Number, required: true }
});

const saleSchema = new mongoose.Schema({
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  clientName: { type: String, required: true },
  items: [saleItemSchema],
  subtotal: { type: Number, required: true },
  tax: { type: Number, default: 0 },
  total: { type: Number, required: true },
  status: { type: String, enum: ['draft', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'], default: 'draft' },
  invoiceNumber: String,
  paymentMethod: { type: String, enum: ['cash', 'card', 'transfer', 'credit'], default: 'cash' },
  notes: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const transactionSchema = new mongoose.Schema({
  type: { type: String, enum: ['income', 'expense'], required: true },
  category: { type: String, required: true },
  amount: { type: Number, required: true, min: 0 },
  description: String,
  date: { type: Date, default: Date.now },
  reference: String,
  referenceId: mongoose.Schema.Types.ObjectId,
  paymentMethod: String,
  createdAt: { type: Date, default: Date.now }
});

const interactionSchema = new mongoose.Schema({
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  type: { type: String, enum: ['call', 'email', 'meeting', 'note'], required: true },
  description: { type: String, required: true },
  date: { type: Date, default: Date.now },
  nextAction: String,
  nextActionDate: Date,
  outcome: String,
  createdAt: { type: Date, default: Date.now }
});

const syncLogSchema = new mongoose.Schema({
  event: { type: String, required: true },
  source: { type: String, required: true },
  target: { type: String, required: true },
  status: { type: String, enum: ['success', 'failed', 'pending'], default: 'success' },
  details: mongoose.Schema.Types.Mixed,
  sourceId: mongoose.Schema.Types.ObjectId,
  targetId: mongoose.Schema.Types.ObjectId,
  createdAt: { type: Date, default: Date.now }
});

function getModels() {
  if (mongoose.models.Lead) return mongoose.models;
  return {
    Lead: mongoose.model('Lead', leadSchema),
    Client: mongoose.model('Client', clientSchema),
    Product: mongoose.model('Product', productSchema),
    Sale: mongoose.model('Sale', saleSchema),
    Transaction: mongoose.model('Transaction', transactionSchema),
    Interaction: mongoose.model('Interaction', interactionSchema),
    SyncLog: mongoose.model('SyncLog', syncLogSchema),
  };
}

module.exports = { getModels };
