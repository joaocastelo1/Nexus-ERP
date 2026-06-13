const dataStore = require('../_dataStore');
const cors = require('../_cors');

module.exports = function handler(req, res) {
  if (cors(req, res)) return;

  try {
    if (req.method === 'GET') {
      const products = dataStore.getProducts();
      const sales = dataStore.getSales();
      const transactions = dataStore.getTransactions();

      return res.json({
        totalProducts: products.length,
        lowStockProducts: products.filter(p => p.quantity <= p.minStock).length,
        totalSales: sales.length,
        totalRevenue: sales.reduce((s, sale) => s + sale.total, 0),
        totalExpenses: transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0),
        stockValue: products.reduce((s, p) => s + (p.quantity * p.costPrice), 0),
        topProducts: []
      });
    }
    return res.status(405).json({ message: 'Method not allowed' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
