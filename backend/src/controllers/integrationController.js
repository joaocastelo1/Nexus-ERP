const dataStore = require('../config/dataStore');

exports.convertLead = async (req, res) => {
  try {
    const { leadId } = req.body;

    const lead = await dataStore.getLeadById(leadId);
    if (!lead) return res.status(404).json({ message: 'Lead não encontrado' });

    const clients = await dataStore.getClients();
    const existingClient = clients.find(c => c.email === lead.email);
    if (existingClient) {
      return res.status(400).json({ message: 'Já existe cliente com este email' });
    }

    const client = await dataStore.createClient({
      name: lead.name, email: lead.email, phone: lead.phone,
      company: lead.company, crmLeadId: lead._id, status: 'active', score: 10
    });

    await dataStore.updateLead(leadId, { status: 'won', crmClientId: client._id });

    await dataStore.createSyncLog({
      event: 'lead.converted', source: 'crm', target: 'erp', status: 'success',
      details: { leadId: lead._id, clientId: client._id }
    });

    res.status(201).json({ lead: await dataStore.getLeadById(leadId), client });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.createSaleFromLead = async (req, res) => {
  try {
    const { leadId, items, paymentMethod, notes } = req.body;
    if (!items || items.length === 0) return res.status(400).json({ message: 'Nenhum item na venda' });

    let subtotal = 0;
    const saleItems = [];
    for (const item of items) {
      const product = await dataStore.getProductById(item.productId);
      if (!product) throw new Error(`Produto ${item.productId} não encontrado`);
      if (product.quantity < item.quantity) throw new Error(`Estoque insuficiente para ${product.name}`);
      const total = product.salePrice * item.quantity;
      subtotal += total;
      await dataStore.updateProduct(item.productId, { quantity: product.quantity - item.quantity });
      saleItems.push({ productId: product._id, productName: product.name, quantity: item.quantity, unitPrice: product.salePrice, total });
    }

    const client = leadId ? await dataStore.getClientById((await dataStore.getLeadById(leadId))?.crmClientId) : null;
    const tax = subtotal * 0.1;
    const sale = await dataStore.createSale({
      clientId: client?._id || null, clientName: client?.name || 'Cliente Avulso',
      items: saleItems, subtotal, tax, total: subtotal + tax,
      paymentMethod: paymentMethod || 'cash', notes: notes || ''
    });

    await dataStore.createTransaction({
      type: 'income', category: 'Vendas', amount: sale.total,
      description: `Venda ${sale.invoiceNumber}`, date: new Date().toISOString(),
      reference: 'sales', referenceId: sale._id, paymentMethod
    });

    await dataStore.createSyncLog({
      event: 'sale.closed', source: 'crm', target: 'erp', status: 'success',
      details: { saleId: sale._id, leadId }
    });

    res.status(201).json(sale);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getSyncLogs = async (req, res) => {
  try {
    res.json(await dataStore.getSyncLogs());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getDashboardData = async (req, res) => {
  try {
    res.json(await dataStore.getDashboardData());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
