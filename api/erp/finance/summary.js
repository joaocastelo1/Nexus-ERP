const dataStore = require('../../_dataStore');
const cors = require('../../_cors');

module.exports = async function handler(req, res) {
  if (cors(req, res)) return;

  try {
    if (req.method === 'GET') {
      const { period } = req.query;
      return res.json(await dataStore.getFinanceSummary(period));
    }
    return res.status(405).json({ message: 'Method not allowed' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
