const dataStore = require('./_dataStore');
const cors = require('./_cors');

module.exports = async function handler(req, res) {
  if (cors(req, res)) return;

  if (req.method === 'POST') {
    await dataStore.resetData();
    return res.json({ message: 'Dados redefinidos com sucesso' });
  }
  return res.status(405).json({ message: 'Method not allowed' });
};
