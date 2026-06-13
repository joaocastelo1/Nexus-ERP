const dataStore = require('../config/dataStore');

exports.getProducts = async (req, res) => {
  try {
    const products = dataStore.getProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const product = dataStore.getProductById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Produto não encontrado' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const product = dataStore.createProduct(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const product = dataStore.updateProduct(req.params.id, req.body);
    if (!product) return res.status(404).json({ message: 'Produto não encontrado' });
    res.json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    dataStore.deleteProduct(req.params.id);
    res.json({ message: 'Produto excluído' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getSales = async (req, res) => {
  try {
    const sales = dataStore.getSales();
    const clients = dataStore.getClients();
    const products = dataStore.getProducts();
    
    const enrichedSales = sales.map(sale => {
      const client = clients.find(c => c._id === sale.clientId);
      const enrichedItems = sale.items.map(item => {
        const product = products.find(p => p._id === item.productId);
        return { ...item, productName: product?.name || 'Produto' };
      });
      return { ...sale, clientName: client?.name || 'Cliente', items: enrichedItems };
    });
    
    res.json(enrichedSales);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getSale = async (req, res) => {
  try {
    const sales = dataStore.getSales();
    const sale = sales.find(s => s._id === req.params.id);
    if (!sale) return res.status(404).json({ message: 'Venda não encontrada' });
    res.json(sale);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createSale = async (req, res) => {
  try {
    const { clientId, items, paymentMethod, notes } = req.body;
    
    const client = dataStore.getClientById(clientId);
    if (!client) return res.status(400).json({ message: 'Cliente não encontrado' });
    
    const products = dataStore.getProducts();
    for (const item of items) {
      const product = products.find(p => p._id === item.productId);
      if (!product) {
        return res.status(400).json({ message: `Produto não encontrado` });
      }
      if (product.quantity < item.quantity) {
        return res.status(400).json({ message: `Estoque insuficiente para ${product.name}` });
      }
    }
    
    let subtotal = 0;
    const saleItems = [];
    for (const item of items) {
      const product = products.find(p => p._id === item.productId);
      const total = item.quantity * product.salePrice;
      subtotal += total;
      saleItems.push({
        productId: product._id,
        productName: product.name,
        quantity: item.quantity,
        unitPrice: product.salePrice,
        total
      });
      
      dataStore.updateProduct(item.productId, { quantity: product.quantity - item.quantity });
    }
    
    const tax = subtotal * 0.1;
    const total = subtotal + tax;
    
    const sale = dataStore.createSale({
      clientId,
      clientName: client.name,
      items: saleItems,
      subtotal,
      tax,
      total,
      paymentMethod,
      notes
    });
    
    res.status(201).json(sale);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateSaleStatus = async (req, res) => {
  try {
    res.json({ message: 'Status atualizado' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getTransactions = async (req, res) => {
  try {
    const transactions = dataStore.getTransactions();
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createTransaction = async (req, res) => {
  try {
    const transaction = dataStore.createTransaction(req.body);
    res.status(201).json(transaction);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getFinanceSummary = async (req, res) => {
  try {
    const { period } = req.query;
    const summary = dataStore.getFinanceSummary(period);
    res.json(summary);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getErpStats = async (req, res) => {
  try {
    const products = dataStore.getProducts();
    const sales = dataStore.getSales();
    const transactions = dataStore.getTransactions();
    
    res.json({
      totalProducts: products.length,
      lowStockProducts: products.filter(p => p.quantity <= p.minStock).length,
      totalSales: sales.length,
      totalRevenue: sales.reduce((s, sale) => s + sale.total, 0),
      totalExpenses: transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0),
      stockValue: products.reduce((s, p) => s + (p.quantity * p.costPrice), 0),
      topProducts: []
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};