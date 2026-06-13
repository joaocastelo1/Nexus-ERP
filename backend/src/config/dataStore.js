const { randomUUID: uuidv4 } = require('crypto');

let db = {
  leads: [
    { _id: '1', name: 'João Silva', email: 'joao@email.com', phone: '11999999999', company: 'Tech Solutions', status: 'new', stage: 'lead', value: 15000, createdAt: new Date() },
    { _id: '2', name: 'Maria Santos', email: 'maria@email.com', phone: '11888888888', company: 'Digital Corp', status: 'contacted', stage: 'qualification', value: 25000, createdAt: new Date() },
    { _id: '3', name: 'Pedro Costa', email: 'pedro@email.com', phone: '11777777777', company: 'Innovate Ltda', status: 'qualified', stage: 'proposal', value: 35000, createdAt: new Date() },
    { _id: '4', name: 'Ana Oliveira', email: 'ana@email.com', phone: '11666666666', company: 'Business Inc', status: 'proposal', stage: 'negotiation', value: 45000, createdAt: new Date() },
    { _id: '5', name: 'Carlos Ferreira', email: 'carlos@email.com', phone: '11555555555', company: 'StartUp Hub', status: 'won', stage: 'closed_won', value: 50000, createdAt: new Date() }
  ],
  clients: [
    { _id: 'c1', name: 'Empresa ABC', email: 'contato@abc.com', phone: '11999990000', company: 'ABC Ltda', score: 85, totalPurchases: 3, totalSpent: 15000, status: 'active', createdAt: new Date() },
    { _id: 'c2', name: 'Empresa XYZ', email: 'contato@xyz.com', phone: '11999990001', company: 'XYZ S/A', score: 72, totalPurchases: 5, totalSpent: 28000, status: 'active', createdAt: new Date() }
  ],
  products: [
    { _id: 'p1', name: 'Software ERP', sku: 'ERP-001', description: 'Sistema de gestão empresarial', quantity: 50, costPrice: 1000, salePrice: 2500, minStock: 10, createdAt: new Date() },
    { _id: 'p2', name: 'Licença Anual', sku: 'LIC-001', description: 'Licença por 1 ano', quantity: 100, costPrice: 500, salePrice: 1200, minStock: 20, createdAt: new Date() },
    { _id: 'p3', name: 'Suporte Premium', sku: 'SUP-001', description: 'Suporte técnico 24/7', quantity: 30, costPrice: 200, salePrice: 500, minStock: 5, createdAt: new Date() },
    { _id: 'p4', name: 'Treinamento', sku: 'TRE-001', description: 'Capacitação técnica', quantity: 20, costPrice: 300, salePrice: 800, minStock: 5, createdAt: new Date() }
  ],
  sales: [
    { _id: 's1', clientId: 'c1', clientName: 'Empresa ABC', items: [{ productId: 'p1', productName: 'Software ERP', quantity: 1, unitPrice: 2500, total: 2500 }], subtotal: 2500, tax: 250, total: 2750, status: 'confirmed', paymentMethod: 'credit_card', createdAt: new Date() },
    { _id: 's2', clientId: 'c2', clientName: 'Empresa XYZ', items: [{ productId: 'p2', productName: 'Licença Anual', quantity: 5, unitPrice: 1200, total: 6000 }], subtotal: 6000, tax: 600, total: 6600, status: 'confirmed', paymentMethod: 'boleto', createdAt: new Date() }
  ],
  transactions: [
    { _id: 't1', type: 'income', amount: 9350, category: 'sales', description: 'Venda s1', createdAt: new Date() },
    { _id: 't2', type: 'expense', amount: 2000, category: 'salaries', description: 'Folha de pagamento', createdAt: new Date() },
    { _id: 't3', type: 'expense', amount: 500, category: 'marketing', description: 'Campanhaads', createdAt: new Date() }
  ],
  syncLogs: [
    { _id: 'l1', event: 'lead.converted', source: 'crm', target: 'erp', status: 'success', details: { leadId: '5', clientId: 'c1' }, createdAt: new Date() }
  ]
};

const dataStore = {
  getLeads: () => db.leads,
  getLeadById: (id) => db.leads.find(l => l._id === id),
  createLead: (data) => {
    const lead = { _id: uuidv4(), ...data, createdAt: new Date() };
    db.leads.push(lead);
    return lead;
  },
  updateLead: (id, data) => {
    const index = db.leads.findIndex(l => l._id === id);
    if (index !== -1) {
      db.leads[index] = { ...db.leads[index], ...data };
      return db.leads[index];
    }
    return null;
  },
  deleteLead: (id) => {
    db.leads = db.leads.filter(l => l._id !== id);
  },

  getClients: () => db.clients,
  getClientById: (id) => db.clients.find(c => c._id === id),
  createClient: (data) => {
    const client = { _id: uuidv4(), ...data, score: Math.floor(Math.random() * 100), totalPurchases: 0, totalSpent: 0, status: 'active', createdAt: new Date() };
    db.clients.push(client);
    return client;
  },
  updateClient: (id, data) => {
    const index = db.clients.findIndex(c => c._id === id);
    if (index !== -1) {
      db.clients[index] = { ...db.clients[index], ...data };
      return db.clients[index];
    }
    return null;
  },

  getProducts: () => db.products,
  getProductById: (id) => db.products.find(p => p._id === id),
  createProduct: (data) => {
    const product = { _id: uuidv4(), ...data, createdAt: new Date() };
    db.products.push(product);
    return product;
  },
  updateProduct: (id, data) => {
    const index = db.products.findIndex(p => p._id === id);
    if (index !== -1) {
      db.products[index] = { ...db.products[index], ...data };
      return db.products[index];
    }
    return null;
  },
  deleteProduct: (id) => {
    db.products = db.products.filter(p => p._id !== id);
  },

  getSales: () => db.sales,
  createSale: (data) => {
    const invoiceNumber = 'NF' + Date.now().toString().slice(-8);
    const sale = { _id: uuidv4(), invoiceNumber, ...data, status: 'confirmed', createdAt: new Date() };
    db.sales.push(sale);
    
    const client = db.clients.find(c => c._id === data.clientId);
    if (client) {
      client.totalPurchases += 1;
      client.totalSpent += data.total;
    }
    
    data.items.forEach(item => {
      const product = db.products.find(p => p._id === item.productId);
      if (product) {
        product.quantity = Math.max(0, product.quantity - item.quantity);
      }
    });
    
    return sale;
  },

  getTransactions: () => db.transactions,
  createTransaction: (data) => {
    const transaction = { _id: uuidv4(), ...data, createdAt: new Date() };
    db.transactions.push(transaction);
    return transaction;
  },

  createSyncLog: (data) => {
    const log = { _id: uuidv4(), ...data, createdAt: new Date() };
    db.syncLogs.unshift(log);
    if (db.syncLogs.length > 50) db.syncLogs.pop();
    return log;
  },
  getSyncLogs: () => db.syncLogs,

  getDashboardData: () => {
    const leadsByStatus = Object.entries(
      db.leads.reduce((acc, lead) => {
        acc[lead.status] = (acc[lead.status] || 0) + 1;
        return acc;
      }, {})
    ).map(([key, count]) => ({ _id: key, count }));

    const revenueByMonth = Object.entries(
      db.sales.reduce((acc, sale) => {
        const month = new Date(sale.createdAt).toLocaleString('pt-BR', { month: 'short' });
        acc[month] = (acc[month] || 0) + sale.total;
        return acc;
      }, {})
    ).map(([_id, total]) => ({ _id, total }));

    const totalIncome = db.transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
    const totalExpense = db.transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);

    const topClients = db.clients
      .map(c => ({ _id: c._id, name: c.name, totalPurchases: c.totalPurchases, totalSpent: c.totalSpent }))
      .sort((a, b) => b.totalSpent - a.totalSpent)
      .slice(0, 5);

    return {
      leadsByStatus,
      clients: { active: db.clients.filter(c => c.status === 'active').length },
      sales: {
        total: db.sales.length,
        revenue: db.sales.reduce((s, sale) => s + sale.total, 0),
        expenses: totalExpense,
        profit: totalIncome - totalExpense
      },
      products: { total: db.products.length },
      revenueByMonth,
      topClients
    };
  },

  getPipeline: () => {
    const stages = ['lead', 'qualification', 'proposal', 'negotiation', 'closed_won', 'closed_lost'];
    return stages.map(stage => ({
      stage,
      count: db.leads.filter(l => l.stage === stage).length,
      value: db.leads.filter(l => l.stage === stage).reduce((s, l) => s + (l.value || 0), 0),
      leads: db.leads.filter(l => l.stage === stage)
    }));
  },

  getFinanceSummary: (period) => {
    const incomes = Object.entries(
      db.transactions.filter(t => t.type === 'income').reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount;
        return acc;
      }, {})
    ).map(([_id, total]) => ({ _id, total }));

    const expenses = Object.entries(
      db.transactions.filter(t => t.type === 'expense').reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount;
        return acc;
      }, {})
    ).map(([_id, total]) => ({ _id, total }));

    return {
      incomes,
      expenses,
      totalIncome: incomes.reduce((s, i) => s + i.total, 0),
      totalExpense: expenses.reduce((s, e) => s + e.total, 0),
      profit: incomes.reduce((s, i) => s + i.total, 0) - expenses.reduce((s, e) => s + e.total, 0)
    };
  }
};

module.exports = dataStore;