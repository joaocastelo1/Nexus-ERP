const dataStore = require('../_dataStore');
const cors = require('../_cors');

module.exports = async function handler(req, res) {
  if (cors(req, res)) return;

  try {
    if (req.method === 'GET') {
      return res.json(await dataStore.getLeads());
    }
    if (req.method === 'POST') {
      const lead = await dataStore.createLead(req.body);
      return res.status(201).json(lead);
    }
    return res.status(405).json({ message: 'Method not allowed' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
