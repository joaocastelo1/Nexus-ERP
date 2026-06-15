const dataStore = require('../../_dataStore');
const cors = require('../../_cors');

module.exports = async function handler(req, res) {
  if (cors(req, res)) return;
  const { id } = req.query;

  try {
    if (req.method === 'GET') {
      const sale = await dataStore.getSaleById(id);
      if (!sale) return res.status(404).json({ message: 'Venda não encontrada' });
      return res.json(sale);
    }
    if (req.method === 'PUT') {
      const updated = await dataStore.updateSaleStatus(id, req.body.status);
      if (!updated) return res.status(404).json({ message: 'Venda não encontrada' });
      return res.json(updated);
    }
    return res.status(405).json({ message: 'Method not allowed' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
