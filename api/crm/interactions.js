const dataStore = require('../_dataStore');
const cors = require('../_cors');

module.exports = function handler(req, res) {
  if (cors(req, res)) return;

  try {
    if (req.method === 'GET') {
      const { clientId } = req.query;
      return res.json(dataStore.getInteractions(clientId));
    }
    if (req.method === 'POST') {
      const interaction = dataStore.createInteraction(req.body);
      return res.status(201).json(interaction);
    }
    return res.status(405).json({ message: 'Method not allowed' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
