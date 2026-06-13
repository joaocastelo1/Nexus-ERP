const cors = require('./_cors');

module.exports = function handler(req, res) {
  if (cors(req, res)) return;
  res.json({ status: 'ok', message: 'BizFlow API Running' });
};
