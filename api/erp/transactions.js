const dataStore = require('../_dataStore');
const cors = require('../_cors');

module.exports = function handler(req, res) {
  if (cors(req, res)) return;

  try {
    if (req.method === 'GET') {
      const { type } = req.query;
      return res.json(dataStore.getTransactions({ type }));
    }
    if (req.method === 'POST') {
      const transaction = dataStore.createTransaction(req.body);
      return res.status(201).json(transaction);
    }
    return res.status(405).json({ message: 'Method not allowed' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
