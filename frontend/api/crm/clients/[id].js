const dataStore = require('../../_dataStore');
const cors = require('../../_cors');

module.exports = function handler(req, res) {
  if (cors(req, res)) return;
  const { id } = req.query;

  try {
    if (req.method === 'GET') {
      const client = dataStore.getClientById(id);
      if (!client) return res.status(404).json({ message: 'Cliente não encontrado' });
      return res.json({ client, interactions: [], purchases: [] });
    }
    if (req.method === 'PUT') {
      const client = dataStore.updateClient(id, req.body);
      if (!client) return res.status(404).json({ message: 'Cliente não encontrado' });
      return res.json(client);
    }
    if (req.method === 'DELETE') {
      dataStore.deleteClient(id);
      return res.json({ message: 'Cliente excluído' });
    }
    return res.status(405).json({ message: 'Method not allowed' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
