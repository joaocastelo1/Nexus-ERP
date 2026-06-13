const dataStore = require('../_dataStore');
const cors = require('../_cors');

module.exports = function handler(req, res) {
  if (cors(req, res)) return;

  try {
    if (req.method === 'GET') {
      return res.json(dataStore.getClients());
    }
    if (req.method === 'POST') {
      const client = dataStore.createClient(req.body);
      return res.status(201).json(client);
    }
    return res.status(405).json({ message: 'Method not allowed' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
