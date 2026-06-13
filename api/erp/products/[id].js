const dataStore = require('../../_dataStore');
const cors = require('../../_cors');

module.exports = function handler(req, res) {
  if (cors(req, res)) return;
  const { id } = req.query;

  try {
    if (req.method === 'GET') {
      const product = dataStore.getProductById(id);
      if (!product) return res.status(404).json({ message: 'Produto não encontrado' });
      return res.json(product);
    }
    if (req.method === 'PUT') {
      const product = dataStore.updateProduct(id, req.body);
      if (!product) return res.status(404).json({ message: 'Produto não encontrado' });
      return res.json(product);
    }
    if (req.method === 'DELETE') {
      dataStore.deleteProduct(id);
      return res.json({ message: 'Produto excluído' });
    }
    return res.status(405).json({ message: 'Method not allowed' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
