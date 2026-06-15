const dataStore = require('../../_dataStore');
const cors = require('../../_cors');

module.exports = async function handler(req, res) {
  if (cors(req, res)) return;
  const { id } = req.query;

  try {
    if (req.method === 'GET') {
      const product = await dataStore.getProductById(id);
      if (!product) return res.status(404).json({ message: 'Produto não encontrado' });
      return res.json(product);
    }
    if (req.method === 'PUT') {
      const product = await dataStore.updateProduct(id, req.body);
      if (!product) return res.status(404).json({ message: 'Produto não encontrado' });
      return res.json(product);
    }
    if (req.method === 'DELETE') {
      await dataStore.deleteProduct(id);
      return res.json({ message: 'Produto excluído' });
    }
    return res.status(405).json({ message: 'Method not allowed' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
