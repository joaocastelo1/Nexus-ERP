const { randomUUID: uuidv4 } = require('crypto');

const now = () => new Date().toISOString();

let db = {
  leads: [
    { _id: 'lead-1', name: 'João Silva', email: 'joao@email.com', phone: '(11) 99999-9999', company: 'Tech Solutions', status: 'new', stage: 'lead', value: 15000, probability: 10, source: 'website', notes: 'Interessado em ERP completo', crmClientId: null, expectedCloseDate: null, createdAt: now(), updatedAt: now() },
    { _id: 'lead-2', name: 'Maria Santos', email: 'maria@email.com', phone: '(11) 88888-8888', company: 'Digital Corp', status: 'contacted', stage: 'qualification', value: 25000, probability: 25, source: 'referral', notes: 'Solicitou proposta', crmClientId: null, expectedCloseDate: null, createdAt: now(), updatedAt: now() },
    { _id: 'lead-3', name: 'Pedro Costa', email: 'pedro@email.com', phone: '(11) 77777-7777', company: 'Innovate Ltda', status: 'qualified', stage: 'proposal', value: 35000, probability: 50, source: 'social', notes: 'Em negociação avançada', crmClientId: null, expectedCloseDate: null, createdAt: now(), updatedAt: now() },
    { _id: 'lead-4', name: 'Ana Oliveira', email: 'ana@email.com', phone: '(11) 66666-6666', company: 'Business Inc', status: 'negotiation', stage: 'negotiation', value: 45000, probability: 75, source: 'ads', notes: 'Quase fechando', crmClientId: null, expectedCloseDate: null, createdAt: now(), updatedAt: now() },
    { _id: 'lead-5', name: 'Carlos Ferreira', email: 'carlos@email.com', phone: '(11) 55555-5555', company: 'StartUp Hub', status: 'won', stage: 'closed_won', value: 50000, probability: 100, source: 'website', notes: 'Cliente convertido', crmClientId: 'client-1', expectedCloseDate: null, createdAt: now(), updatedAt: now() },
  ],
  clients: [
    { _id: 'client-1', name: 'Tech Solutions', email: 'contato@techsolutions.com', phone: '(11) 99999-0000', document: '12.345.678/0001-90', documentType: 'cnpj', address: { street: 'Av. Paulista, 1000', city: 'São Paulo', state: 'SP', zipCode: '01310-100', country: 'Brasil' }, status: 'active', score: 85, totalPurchases: 3, totalSpent: 15000, crmLeadId: 'lead-5', createdAt: now(), updatedAt: now() },
    { _id: 'client-2', name: 'Digital Corp', email: 'contato@digitalcorp.com', phone: '(11) 88888-0000', document: '98.765.432/0001-10', documentType: 'cnpj', address: { street: 'Rua Augusta, 500', city: 'São Paulo', state: 'SP', zipCode: '01304-000', country: 'Brasil' }, status: 'active', score: 72, totalPurchases: 5, totalSpent: 28000, crmLeadId: null, createdAt: now(), updatedAt: now() },
    { _id: 'client-3', name: 'Innovate Ltda', email: 'contato@innovateltda.com', phone: '(11) 77777-0000', document: '11.222.333/0001-44', documentType: 'cnpj', address: { street: 'Alameda Santos, 200', city: 'São Paulo', state: 'SP', zipCode: '01418-000', country: 'Brasil' }, status: 'active', score: 60, totalPurchases: 2, totalSpent: 8500, crmLeadId: null, createdAt: now(), updatedAt: now() },
  ],
  products: [
    { _id: 'prod-1', name: 'Software ERP Completo', sku: 'ERP-001', description: 'Sistema de gestão empresarial completo com módulos financeiro, estoque e vendas', category: 'Software', costPrice: 1000, salePrice: 2500, quantity: 50, minStock: 10, unit: 'un', active: true, createdAt: now(), updatedAt: now() },
    { _id: 'prod-2', name: 'Licença Anual ERP', sku: 'LIC-001', description: 'Licença de uso anual do sistema ERP', category: 'Licença', costPrice: 500, salePrice: 1200, quantity: 100, minStock: 20, unit: 'un', active: true, createdAt: now(), updatedAt: now() },
    { _id: 'prod-3', name: 'Suporte Premium 24/7', sku: 'SUP-001', description: 'Suporte técnico especializado com SLA de 2 horas', category: 'Serviço', costPrice: 200, salePrice: 500, quantity: 30, minStock: 5, unit: 'un', active: true, createdAt: now(), updatedAt: now() },
    { _id: 'prod-4', name: 'Treinamento Presencial', sku: 'TRE-001', description: 'Capacitação técnica presencial para equipe', category: 'Serviço', costPrice: 300, salePrice: 800, quantity: 20, minStock: 5, unit: 'un', active: true, createdAt: now(), updatedAt: now() },
    { _id: 'prod-5', name: 'Módulo CRM Avançado', sku: 'CRM-001', description: 'Módulo adicional de CRM com automação de marketing', category: 'Software', costPrice: 800, salePrice: 1800, quantity: 3, minStock: 5, unit: 'un', active: true, createdAt: now(), updatedAt: now() },
  ],
  sales: [
    { _id: 'sale-1', clientId: 'client-1', clientName: 'Tech Solutions', items: [{ productId: 'prod-1', productName: 'Software ERP Completo', quantity: 1, unitPrice: 2500, total: 2500 }], subtotal: 2500, tax: 250, total: 2750, status: 'delivered', invoiceNumber: 'NF00000001', paymentMethod: 'transfer', notes: '', createdAt: now(), updatedAt: now() },
    { _id: 'sale-2', clientId: 'client-2', clientName: 'Digital Corp', items: [{ productId: 'prod-2', productName: 'Licença Anual ERP', quantity: 5, unitPrice: 1200, total: 6000 }], subtotal: 6000, tax: 600, total: 6600, status: 'confirmed', invoiceNumber: 'NF00000002', paymentMethod: 'card', notes: '', createdAt: now(), updatedAt: now() },
    { _id: 'sale-3', clientId: 'client-1', clientName: 'Tech Solutions', items: [{ productId: 'prod-3', productName: 'Suporte Premium 24/7', quantity: 2, unitPrice: 500, total: 1000 }], subtotal: 1000, tax: 100, total: 1100, status: 'shipped', invoiceNumber: 'NF00000003', paymentMethod: 'credit', notes: '', createdAt: now(), updatedAt: now() },
  ],
  transactions: [
    { _id: 'tx-1', type: 'income', category: 'Vendas', amount: 9350, description: 'Vendas do período', date: now(), reference: 'sales', referenceId: null, paymentMethod: null, createdAt: now() },
    { _id: 'tx-2', type: 'expense', category: 'Salários', amount: 2000, description: 'Folha de pagamento mensal', date: now(), reference: 'payroll', referenceId: null, paymentMethod: null, createdAt: now() },
    { _id: 'tx-3', type: 'expense', category: 'Marketing', amount: 500, description: 'Campanha de anúncios', date: now(), reference: 'marketing', referenceId: null, paymentMethod: null, createdAt: now() },
    { _id: 'tx-4', type: 'income', category: 'Serviços', amount: 1800, description: 'Consultoria técnica', date: now(), reference: 'services', referenceId: null, paymentMethod: null, createdAt: now() },
    { _id: 'tx-5', type: 'expense', category: 'Infraestrutura', amount: 1200, description: 'Hospedagem e servidores', date: now(), reference: 'infra', referenceId: null, paymentMethod: null, createdAt: now() },
  ],
  syncLogs: [
    { _id: 'log-1', event: 'lead.converted', source: 'crm', target: 'erp', status: 'success', details: { leadId: 'lead-5', clientId: 'client-1' }, sourceId: 'lead-5', targetId: 'client-1', createdAt: now() },
    { _id: 'log-2', event: 'sale.closed', source: 'crm', target: 'erp', status: 'success', details: { saleId: 'sale-1' }, sourceId: 'sale-1', targetId: null, createdAt: now() },
    { _id: 'log-3', event: 'stock.updated', source: 'erp', target: 'crm', status: 'success', details: { productId: 'prod-1', previousQuantity: 50, newQuantity: 49 }, sourceId: 'prod-1', targetId: null, createdAt: now() },
  ],
  interactions: []
};

const dataStore = {
  // --- LEADS ---
  getLeads: () => db.leads,
  getLeadById: (id) => db.leads.find(l => l._id === id),
  createLead: (data) => {
    const lead = {
      _id: uuidv4(), stage: 'lead', probability: 10, value: 0, status: 'new', source: 'other',
      ...data, createdAt: now(), updatedAt: now()
    };
    db.leads.push(lead);
    return lead;
  },
  updateLead: (id, data) => {
    const index = db.leads.findIndex(l => l._id === id);
    if (index !== -1) {
      db.leads[index] = { ...db.leads[index], ...data, updatedAt: now() };
      return db.leads[index];
    }
    return null;
  },
  deleteLead: (id) => { db.leads = db.leads.filter(l => l._id !== id); },

  // --- CLIENTS ---
  getClients: () => db.clients,
  getClientById: (id) => db.clients.find(c => c._id === id),
  createClient: (data) => {
    const client = {
      _id: uuidv4(), score: Math.floor(Math.random() * 100), totalPurchases: 0, totalSpent: 0, status: 'active',
      ...data, createdAt: now(), updatedAt: now()
    };
    db.clients.push(client);
    return client;
  },
  updateClient: (id, data) => {
    const index = db.clients.findIndex(c => c._id === id);
    if (index !== -1) {
      db.clients[index] = { ...db.clients[index], ...data, updatedAt: now() };
      return db.clients[index];
    }
    return null;
  },
  deleteClient: (id) => { db.clients = db.clients.filter(c => c._id !== id); },

  // --- PRODUCTS ---
  getProducts: () => db.products,
  getProductById: (id) => db.products.find(p => p._id === id),
  createProduct: (data) => {
    const product = { _id: uuidv4(), active: true, unit: 'un', minStock: 5, quantity: 0, ...data, createdAt: now(), updatedAt: now() };
    db.products.push(product);
    return product;
  },
  updateProduct: (id, data) => {
    const index = db.products.findIndex(p => p._id === id);
    if (index !== -1) {
      db.products[index] = { ...db.products[index], ...data, updatedAt: now() };
      return db.products[index];
    }
    return null;
  },
  deleteProduct: (id) => { db.products = db.products.filter(p => p._id !== id); },

  // --- SALES ---
  getSales: () => db.sales,
  getSaleById: (id) => db.sales.find(s => s._id === id),
  createSale: (data) => {
    const invoiceNumber = 'NF' + Date.now().toString().slice(-8);
    const sale = { _id: uuidv4(), invoiceNumber, status: 'confirmed', ...data, createdAt: now(), updatedAt: now() };
    db.sales.push(sale);
    const client = db.clients.find(c => c._id === data.clientId);
    if (client) {
      client.totalPurchases += 1;
      client.totalSpent += data.total;
    }
    return sale;
  },
  updateSaleStatus: (id, status) => {
    const index = db.sales.findIndex(s => s._id === id);
    if (index !== -1) {
      db.sales[index] = { ...db.sales[index], status, updatedAt: now() };
      return db.sales[index];
    }
    return null;
  },

  // --- TRANSACTIONS ---
  getTransactions: (filters = {}) => {
    let txs = db.transactions;
    if (filters.type) txs = txs.filter(t => t.type === filters.type);
    return txs;
  },
  createTransaction: (data) => {
    const transaction = { _id: uuidv4(), ...data, createdAt: now() };
    db.transactions.push(transaction);
    return transaction;
  },

  // --- SYNC LOGS ---
  getSyncLogs: () => db.syncLogs,
  createSyncLog: (data) => {
    const log = { _id: uuidv4(), ...data, createdAt: now() };
    db.syncLogs.unshift(log);
    if (db.syncLogs.length > 50) db.syncLogs.pop();
    return log;
  },

  // --- INTERACTIONS ---
  getInteractions: (clientId) => {
    let result = db.interactions;
    if (clientId) result = result.filter(i => i.clientId === clientId);
    return result;
  },
  createInteraction: (data) => {
    const interaction = { _id: uuidv4(), ...data, createdAt: now() };
    db.interactions.push(interaction);
    return interaction;
  },

  // --- DASHBOARD ---
  getDashboardData: () => {
    const leadsByStatus = Object.entries(
      db.leads.reduce((acc, lead) => {
        acc[lead.status] = (acc[lead.status] || 0) + 1;
        return acc;
      }, {})
    ).map(([key, count]) => ({ _id: key, count }));

    const months = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];

    const revenueByMonth = Array.from({ length: 6 }, (_, i) => {
      const d = new Date();
      d.setMonth(d.getMonth() - (5 - i));
      const monthIndex = d.getMonth();
      const total = db.sales
        .filter(s => new Date(s.createdAt).getMonth() === monthIndex && new Date(s.createdAt).getFullYear() === d.getFullYear())
        .reduce((s, sale) => s + sale.total, 0);
      const count = db.sales
        .filter(s => new Date(s.createdAt).getMonth() === monthIndex && new Date(s.createdAt).getFullYear() === d.getFullYear())
        .length;
      return { _id: months[monthIndex], total, count };
    });

    const totalIncome = db.transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
    const totalExpense = db.transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);

    const topClients = db.clients
      .map(c => ({ _id: c._id, name: c.name, totalPurchases: c.totalPurchases, totalSpent: c.totalSpent }))
      .sort((a, b) => b.totalSpent - a.totalSpent)
      .slice(0, 5);

    const salesByMonth = revenueByMonth.map(r => ({ _id: r._id, count: r.count, total: r.total }));

    return {
      leadsByStatus,
      clients: { total: db.clients.length, active: db.clients.filter(c => c.status === 'active').length },
      sales: {
        total: db.sales.length,
        revenue: db.sales.reduce((s, sale) => s + sale.total, 0),
        expenses: totalExpense,
        profit: totalIncome - totalExpense
      },
      products: { total: db.products.length, lowStock: db.products.filter(p => p.quantity <= p.minStock).length },
      revenueByMonth,
      salesByMonth,
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
    let filtered = db.transactions;
    if (period && period !== 'all') {
      const now = new Date();
      let start;
      if (period === 'week') { start = new Date(now); start.setDate(start.getDate() - 7); }
      else if (period === 'month') { start = new Date(now); start.setMonth(start.getMonth() - 1); }
      else if (period === 'year') { start = new Date(now); start.setFullYear(start.getFullYear() - 1); }
      if (start) filtered = filtered.filter(t => new Date(t.date) >= start);
    }

    const incomes = Object.entries(
      filtered.filter(t => t.type === 'income').reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount;
        return acc;
      }, {})
    ).map(([_id, total]) => ({ _id, total }));

    const expenses = Object.entries(
      filtered.filter(t => t.type === 'expense').reduce((acc, t) => {
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
