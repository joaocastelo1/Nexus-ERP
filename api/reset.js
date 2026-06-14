const dataStore = require('./_dataStore');
const cors = require('./_cors');

module.exports = function handler(req, res) {
  if (cors(req, res)) return;

  if (req.method === 'POST') {
    dataStore.resetData();
    return res.json({ message: 'Dados redefinidos com sucesso' });
  }
  return res.status(405).json({ message: 'Method not allowed' });
};
