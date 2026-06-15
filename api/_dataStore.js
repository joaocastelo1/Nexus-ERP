const { connectDB } = require('./_db');
const { getModels } = require('./_models');
const { seedData } = require('./_seed');

let db = seedData();
let connected = false;
let Lead, Client, Product, Sale, Transaction, Interaction, SyncLog;

async function ensureConnection() {
  if (connected) return true;
  const conn = await connectDB();
  if (conn) {
    const m = getModels();
    Lead = m.Lead; Client = m.Client; Product = m.Product; Sale = m.Sale;
    Transaction = m.Transaction; Interaction = m.Interaction; SyncLog = m.SyncLog;
    connected = true;
    try { await syncFromMongo(); } catch {}
  }
  return connected;
}

async function syncFromMongo() {
  try {
    const [leads, clients, products, sales, transactions, syncLogs, interactions] = await Promise.all([
      Lead.find().lean(), Client.find().lean(), Product.find().lean(),
      Sale.find().lean(), Transaction.find().lean(), SyncLog.find().lean(), Interaction.find().lean()
    ]);
    if (leads.length) db.leads = leads;
    if (clients.length) db.clients = clients;
    if (products.length) db.products = products;
    if (sales.length) db.sales = sales;
    if (transactions.length) db.transactions = transactions;
    if (syncLogs.length) db.syncLogs = syncLogs;
    if (interactions.length) db.interactions = interactions;
  } catch { /* silent fail */ }
}

async function seedIfEmpty() {
  const connected = await ensureConnection();
  if (!connected) return;
  const count = await Lead.countDocuments();
  if (count === 0) {
    const data = seedData();
    await Promise.all([
      Lead.insertMany(data.leads),
      Client.insertMany(data.clients),
      Product.insertMany(data.products),
      Sale.insertMany(data.sales),
      Transaction.insertMany(data.transactions),
      SyncLog.insertMany(data.syncLogs),
    ]);
    await syncFromMongo();
  }
}

function wrap(fn) {
  return async (...args) => {
    await ensureConnection();
    return fn(...args);
  };
}

const dataStore = {
  resetData: async () => {
    db = seedData();
    if (connected) {
      await Promise.all([
        Lead.deleteMany({}), Client.deleteMany({}), Product.deleteMany({}),
        Sale.deleteMany({}), Transaction.deleteMany({}), SyncLog.deleteMany({}),
        Interaction.deleteMany({})
      ]);
      const data = seedData();
      await Promise.all([
        Lead.insertMany(data.leads),
        Client.insertMany(data.clients),
        Product.insertMany(data.products),
        Sale.insertMany(data.sales),
        Transaction.insertMany(data.transactions),
        SyncLog.insertMany(data.syncLogs),
      ]);
    }
    return true;
  },

  getLeads: wrap(() => db.leads),
  getLeadById: wrap((id) => db.leads.find(l => l._id === id)),
  createLead: wrap((data) => {
    const lead = { _id: require('crypto').randomUUID(), stage: 'lead', probability: 10, value: 0, status: 'new', source: 'other', ...data, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
    db.leads.push(lead);
    if (connected) Lead.create(lead).catch(() => {});
    return lead;
  }),
  updateLead: wrap((id, data) => {
    const idx = db.leads.findIndex(l => l._id === id);
    if (idx === -1) return null;
    db.leads[idx] = { ...db.leads[idx], ...data, updatedAt: new Date().toISOString() };
    if (connected) Lead.updateOne({ _id: id }, { $set: data, $currentDate: { updatedAt: true } }).catch(() => {});
    return db.leads[idx];
  }),
  deleteLead: wrap((id) => {
    db.leads = db.leads.filter(l => l._id !== id);
    if (connected) Lead.deleteOne({ _id: id }).catch(() => {});
  }),

  getClients: wrap(() => db.clients),
  getClientById: wrap((id) => db.clients.find(c => c._id === id)),
  createClient: wrap((data) => {
    const client = { _id: require('crypto').randomUUID(), score: Math.floor(Math.random() * 100), totalPurchases: 0, totalSpent: 0, status: 'active', ...data, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
    db.clients.push(client);
    if (connected) Client.create(client).catch(() => {});
    return client;
  }),
  updateClient: wrap((id, data) => {
    const idx = db.clients.findIndex(c => c._id === id);
    if (idx === -1) return null;
    db.clients[idx] = { ...db.clients[idx], ...data, updatedAt: new Date().toISOString() };
    if (connected) Client.updateOne({ _id: id }, { $set: data, $currentDate: { updatedAt: true } }).catch(() => {});
    return db.clients[idx];
  }),
  deleteClient: wrap((id) => {
    db.clients = db.clients.filter(c => c._id !== id);
    if (connected) Client.deleteOne({ _id: id }).catch(() => {});
  }),

  getProducts: wrap(() => db.products),
  getProductById: wrap((id) => db.products.find(p => p._id === id)),
  createProduct: wrap((data) => {
    const product = { _id: require('crypto').randomUUID(), active: true, unit: 'un', minStock: 5, quantity: 0, ...data, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
    db.products.push(product);
    if (connected) Product.create(product).catch(() => {});
    return product;
  }),
  updateProduct: wrap((id, data) => {
    const idx = db.products.findIndex(p => p._id === id);
    if (idx === -1) return null;
    db.products[idx] = { ...db.products[idx], ...data, updatedAt: new Date().toISOString() };
    if (connected) Product.updateOne({ _id: id }, { $set: data, $currentDate: { updatedAt: true } }).catch(() => {});
    return db.products[idx];
  }),
  deleteProduct: wrap((id) => {
    db.products = db.products.filter(p => p._id !== id);
    if (connected) Product.deleteOne({ _id: id }).catch(() => {});
  }),

  getSales: wrap(() => db.sales),
  getSaleById: wrap((id) => db.sales.find(s => s._id === id)),
  createSale: wrap((data) => {
    const invoiceNumber = 'NF' + Date.now().toString().slice(-8);
    const sale = { _id: require('crypto').randomUUID(), invoiceNumber, status: 'confirmed', ...data, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
    db.sales.push(sale);
    const client = db.clients.find(c => c._id === data.clientId);
    if (client) { client.totalPurchases += 1; client.totalSpent += data.total; }
    if (connected) Sale.create(sale).catch(() => {});
    return sale;
  }),
  updateSaleStatus: wrap((id, status) => {
    const idx = db.sales.findIndex(s => s._id === id);
    if (idx === -1) return null;
    db.sales[idx] = { ...db.sales[idx], status, updatedAt: new Date().toISOString() };
    if (connected) Sale.updateOne({ _id: id }, { $set: { status }, $currentDate: { updatedAt: true } }).catch(() => {});
    return db.sales[idx];
  }),

  getTransactions: wrap((filters = {}) => {
    let txs = db.transactions;
    if (filters.type) txs = txs.filter(t => t.type === filters.type);
    return txs;
  }),
  createTransaction: wrap((data) => {
    const tx = { _id: require('crypto').randomUUID(), ...data, createdAt: new Date().toISOString() };
    db.transactions.push(tx);
    if (connected) Transaction.create(tx).catch(() => {});
    return tx;
  }),

  getSyncLogs: wrap(() => db.syncLogs),
  createSyncLog: wrap((data) => {
    const log = { _id: require('crypto').randomUUID(), ...data, createdAt: new Date().toISOString() };
    db.syncLogs.unshift(log);
    if (db.syncLogs.length > 50) db.syncLogs.pop();
    if (connected) SyncLog.create(log).catch(() => {});
    return log;
  }),

  getInteractions: wrap((clientId) => {
    let r = db.interactions;
    if (clientId) r = r.filter(i => i.clientId === clientId);
    return r;
  }),
  createInteraction: wrap((data) => {
    const interaction = { _id: require('crypto').randomUUID(), ...data, createdAt: new Date().toISOString() };
    db.interactions.push(interaction);
    if (connected) Interaction.create(interaction).catch(() => {});
    return interaction;
  }),

  getDashboardData: wrap(() => {
    const leadsByStatus = Object.entries(
      db.leads.reduce((acc, lead) => { acc[lead.status] = (acc[lead.status] || 0) + 1; return acc; }, {})
    ).map(([key, count]) => ({ _id: key, count }));

    const months = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
    const revenueByMonth = Array.from({ length: 6 }, (_, i) => {
      const d = new Date(); d.setMonth(d.getMonth() - (5 - i));
      const idx = d.getMonth();
      const total = db.sales.filter(s => new Date(s.createdAt).getMonth() === idx && new Date(s.createdAt).getFullYear() === d.getFullYear()).reduce((s, sale) => s + sale.total, 0);
      const count = db.sales.filter(s => new Date(s.createdAt).getMonth() === idx && new Date(s.createdAt).getFullYear() === d.getFullYear()).length;
      return { _id: months[idx], total, count };
    });

    const totalIncome = db.transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
    const totalExpense = db.transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
    const topClients = db.clients.map(c => ({ _id: c._id, name: c.name, totalPurchases: c.totalPurchases, totalSpent: c.totalSpent })).sort((a, b) => b.totalSpent - a.totalSpent).slice(0, 5);
    const salesByMonth = revenueByMonth.map(r => ({ _id: r._id, count: r.count, total: r.total }));

    return {
      leadsByStatus,
      clients: { total: db.clients.length, active: db.clients.filter(c => c.status === 'active').length },
      sales: { total: db.sales.length, revenue: db.sales.reduce((s, sale) => s + sale.total, 0), expenses: totalExpense, profit: totalIncome - totalExpense },
      products: { total: db.products.length, lowStock: db.products.filter(p => p.quantity <= p.minStock).length },
      revenueByMonth, salesByMonth, topClients
    };
  }),

  getPipeline: wrap(() => {
    const stages = ['lead', 'qualification', 'proposal', 'negotiation', 'closed_won', 'closed_lost'];
    return stages.map(stage => ({
      stage, count: db.leads.filter(l => l.stage === stage).length,
      value: db.leads.filter(l => l.stage === stage).reduce((s, l) => s + (l.value || 0), 0),
      leads: db.leads.filter(l => l.stage === stage)
    }));
  }),

  getFinanceSummary: wrap((period) => {
    let filtered = db.transactions;
    if (period && period !== 'all') {
      const now = new Date(); let start;
      if (period === 'week') { start = new Date(now); start.setDate(start.getDate() - 7); }
      else if (period === 'month') { start = new Date(now); start.setMonth(start.getMonth() - 1); }
      else if (period === 'year') { start = new Date(now); start.setFullYear(start.getFullYear() - 1); }
      if (start) filtered = filtered.filter(t => new Date(t.date) >= start);
    }
    const incomes = Object.entries(filtered.filter(t => t.type === 'income').reduce((acc, t) => { acc[t.category] = (acc[t.category] || 0) + t.amount; return acc; }, {})).map(([_id, total]) => ({ _id, total }));
    const expenses = Object.entries(filtered.filter(t => t.type === 'expense').reduce((acc, t) => { acc[t.category] = (acc[t.category] || 0) + t.amount; return acc; }, {})).map(([_id, total]) => ({ _id, total }));
    return { incomes, expenses, totalIncome: incomes.reduce((s, i) => s + i.total, 0), totalExpense: expenses.reduce((s, e) => s + e.total, 0), profit: incomes.reduce((s, i) => s + i.total, 0) - expenses.reduce((s, e) => s + e.total, 0) };
  }),
};

seedIfEmpty();

module.exports = dataStore;
