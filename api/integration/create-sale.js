const cors = require('../_cors');

module.exports = function handler(req, res) {
  if (cors(req, res)) return;

  try {
    if (req.method === 'POST') {
      return res.status(201).json({ message: 'Venda criada' });
    }
    return res.status(405).json({ message: 'Method not allowed' });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};
