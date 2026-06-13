const dataStore = require('../../_dataStore');
const cors = require('../../_cors');

module.exports = function handler(req, res) {
  if (cors(req, res)) return;
  const { id } = req.query;

  try {
    if (req.method === 'PUT') {
      const lead = dataStore.updateLead(id, req.body);
      if (!lead) return res.status(404).json({ message: 'Lead não encontrado' });
      return res.json(lead);
    }
    if (req.method === 'DELETE') {
      dataStore.deleteLead(id);
      return res.json({ message: 'Lead excluído' });
    }
    if (req.method === 'GET') {
      const lead = dataStore.getLeadById(id);
      if (!lead) return res.status(404).json({ message: 'Lead não encontrado' });
      return res.json(lead);
    }
    return res.status(405).json({ message: 'Method not allowed' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
