const dataStore = require('../_dataStore');
const cors = require('../_cors');

module.exports = function handler(req, res) {
  if (cors(req, res)) return;

  try {
    if (req.method === 'POST') {
      const { leadId, items, paymentMethod, notes } = req.body;

      if (!items || items.length === 0) {
        return res.status(400).json({ message: 'Nenhum item na venda' });
      }

      let subtotal = 0;
      const saleItems = items.map(item => {
        const product = dataStore.getProductById(item.productId);
        if (!product) throw new Error(`Produto ${item.productId} não encontrado`);
        if (product.quantity < item.quantity) throw new Error(`Estoque insuficiente para ${product.name}`);
        const total = product.salePrice * item.quantity;
        subtotal += total;
        dataStore.updateProduct(item.productId, { quantity: product.quantity - item.quantity });
        return {
          productId: product._id,
          productName: product.name,
          quantity: item.quantity,
          unitPrice: product.salePrice,
          total
        };
      });

      const client = leadId ? dataStore.getClientById(dataStore.getLeadById(leadId)?.crmClientId) : null;
      const tax = subtotal * 0.1;
      const sale = dataStore.createSale({
        clientId: client?._id || null,
        clientName: client?.name || 'Cliente Avulso',
        items: saleItems,
        subtotal,
        tax,
        total: subtotal + tax,
        paymentMethod: paymentMethod || 'cash',
        notes: notes || ''
      });

      dataStore.createTransaction({
        type: 'income',
        category: 'Vendas',
        amount: sale.total,
        description: `Venda ${sale.invoiceNumber}`,
        date: new Date().toISOString(),
        reference: 'sales',
        referenceId: sale._id,
        paymentMethod
      });

      dataStore.createSyncLog({
        event: 'sale.closed',
        source: 'crm',
        target: 'erp',
        status: 'success',
        details: { saleId: sale._id, leadId }
      });

      return res.status(201).json(sale);
    }
    return res.status(405).json({ message: 'Method not allowed' });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};
