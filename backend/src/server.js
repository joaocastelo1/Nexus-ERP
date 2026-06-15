const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/database');
const { errorHandler } = require('./middleware/errorHandler');
const crmRoutes = require('./routes/crm');
const erpRoutes = require('./routes/erp');
const integrationRoutes = require('./routes/integration');

const app = express();

app.use(cors());
app.use(express.json({ limit: '10kb' }));

app.use('/api/crm', crmRoutes);
app.use('/api/erp', erpRoutes);
app.use('/api/integration', integrationRoutes);

app.post('/api/reset', async (req, res) => {
  try {
    const dataStore = require('./config/dataStore');
    await dataStore.resetData();
    res.json({ message: 'Dados redefinidos com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'BizFlow API Running', version: '2.0.0' });
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

async function start() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`\n  🚀 BizFlow API rodando em http://localhost:${PORT}`);
    console.log(`  📊 Modo: ${process.env.NODE_ENV || 'development'}\n`);
  });
}

start();

module.exports = app;
