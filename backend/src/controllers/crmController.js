const dataStore = require('../config/dataStore');

exports.getLeads = async (req, res) => {
  try {
    const leads = dataStore.getLeads();
    res.json(leads);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createLead = async (req, res) => {
  try {
    const lead = dataStore.createLead(req.body);
    res.status(201).json(lead);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateLead = async (req, res) => {
  try {
    const lead = dataStore.updateLead(req.params.id, req.body);
    if (!lead) return res.status(404).json({ message: 'Lead não encontrado' });
    res.json(lead);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteLead = async (req, res) => {
  try {
    dataStore.deleteLead(req.params.id);
    res.json({ message: 'Lead excluído' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getClients = async (req, res) => {
  try {
    const clients = dataStore.getClients();
    res.json(clients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getClient = async (req, res) => {
  try {
    const client = dataStore.getClientById(req.params.id);
    if (!client) return res.status(404).json({ message: 'Cliente não encontrado' });
    res.json({ client, interactions: [], purchases: [] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createClient = async (req, res) => {
  try {
    const client = dataStore.createClient(req.body);
    res.status(201).json(client);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateClient = async (req, res) => {
  try {
    const client = dataStore.updateClient(req.params.id, req.body);
    if (!client) return res.status(404).json({ message: 'Cliente não encontrado' });
    res.json(client);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteClient = async (req, res) => {
  try {
    res.json({ message: 'Cliente excluído' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getInteractions = async (req, res) => {
  try {
    res.json([]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createInteraction = async (req, res) => {
  try {
    res.status(201).json({ message: 'Interação registrada' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getPipeline = async (req, res) => {
  try {
    const pipeline = dataStore.getPipeline();
    res.json(pipeline);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCrmStats = async (req, res) => {
  try {
    const leads = dataStore.getLeads();
    const clients = dataStore.getClients();
    res.json({
      totalLeads: leads.length,
      leadsByStatus: Object.entries(leads.reduce((acc, l) => {
        acc[l.status] = (acc[l.status] || 0) + 1;
        return acc;
      }, {})).map(([key, count]) => ({ _id: key, count })),
      totalClients: clients.filter(c => c.status === 'active').length,
      totalInteractions: 0,
      pipelineValue: leads.filter(l => !['closed_won', 'closed_lost'].includes(l.stage)).reduce((s, l) => s + (l.value || 0), 0)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};