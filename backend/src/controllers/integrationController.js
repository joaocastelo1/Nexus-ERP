const dataStore = require('../config/dataStore');

exports.convertLead = async (req, res) => {
  try {
    const { leadId } = req.body;
    
    const lead = dataStore.getLeadById(leadId);
    if (!lead) return res.status(404).json({ message: 'Lead não encontrado' });
    
    const clients = dataStore.getClients();
    const existingClient = clients.find(c => c.email === lead.email);
    if (existingClient) {
      return res.status(400).json({ message: 'Já existe cliente com este email' });
    }
    
    const client = dataStore.createClient({
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      company: lead.company,
      crmLeadId: lead._id,
      status: 'active',
      score: 10
    });
    
    dataStore.updateLead(leadId, { status: 'won', crmClientId: client._id });
    
    dataStore.createSyncLog({
      event: 'lead.converted',
      source: 'crm',
      target: 'erp',
      status: 'success',
      details: { leadId: lead._id, clientId: client._id }
    });
    
    res.status(201).json({ lead, client });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.createSaleFromLead = async (req, res) => {
  try {
    res.status(201).json({ message: 'Venda criada' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getSyncLogs = async (req, res) => {
  try {
    const logs = dataStore.getSyncLogs();
    res.json(logs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getDashboardData = async (req, res) => {
  try {
    const data = dataStore.getDashboardData();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};