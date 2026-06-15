const dataStore = require('../_dataStore');
const cors = require('../_cors');

module.exports = async function handler(req, res) {
  if (cors(req, res)) return;

  try {
    if (req.method === 'GET') {
      const [sales, clients, products] = await Promise.all([
        dataStore.getSales(), dataStore.getClients(), dataStore.getProducts()
      ]);

      const enrichedSales = sales.map(sale => {
        const client = clients.find(c => c._id === sale.clientId);
        const enrichedItems = (sale.items || []).map(item => {
          const product = products.find(p => p._id === item.productId);
          return { ...item, productName: product?.name || 'Produto' };
        });
        return { ...sale, clientName: client?.name || 'Cliente', items: enrichedItems };
      });

      return res.json(enrichedSales);
    }

    if (req.method === 'POST') {
      const { clientId, items, paymentMethod, notes } = req.body;

      const client = await dataStore.getClientById(clientId);
      if (!client) return res.status(400).json({ message: 'Cliente não encontrado' });

      const allProducts = await dataStore.getProducts();
      let subtotal = 0;
      const saleItems = [];

      for (const item of items) {
        const product = allProducts.find(p => p._id === item.productId);
        if (!product) return res.status(400).json({ message: 'Produto não encontrado' });
        if (product.quantity < item.quantity) {
          return res.status(400).json({ message: `Estoque insuficiente para ${product.name}` });
        }
        const total = item.quantity * product.salePrice;
        subtotal += total;
        saleItems.push({
          productId: product._id,
          productName: product.name,
          quantity: item.quantity,
          unitPrice: product.salePrice,
          total
        });
        await dataStore.updateProduct(item.productId, { quantity: product.quantity - item.quantity });
      }

      const tax = subtotal * 0.1;
      const total = subtotal + tax;

      const sale = await dataStore.createSale({
        clientId,
        clientName: client.name,
        items: saleItems,
        subtotal,
        tax,
        total,
        paymentMethod,
        notes
      });

      return res.status(201).json(sale);
    }

    return res.status(405).json({ message: 'Method not allowed' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
