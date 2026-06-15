const dataStore = require('../config/dataStore');

exports.getLeads = async (req, res) => {
  try { res.json(await dataStore.getLeads()); }
  catch (error) { res.status(500).json({ error: error.message }); }
};

exports.createLead = async (req, res) => {
  try { res.status(201).json(await dataStore.createLead(req.body)); }
  catch (error) { res.status(400).json({ error: error.message }); }
};

exports.updateLead = async (req, res) => {
  try {
    const lead = await dataStore.updateLead(req.params.id, req.body);
    if (!lead) return res.status(404).json({ message: 'Lead não encontrado' });
    res.json(lead);
  } catch (error) { res.status(400).json({ error: error.message }); }
};

exports.deleteLead = async (req, res) => {
  try {
    await dataStore.deleteLead(req.params.id);
    res.json({ message: 'Lead excluído' });
  } catch (error) { res.status(500).json({ error: error.message }); }
};

exports.getClients = async (req, res) => {
  try { res.json(await dataStore.getClients()); }
  catch (error) { res.status(500).json({ error: error.message }); }
};

exports.getClient = async (req, res) => {
  try {
    const client = await dataStore.getClientById(req.params.id);
    if (!client) return res.status(404).json({ message: 'Cliente não encontrado' });
    const [interactions, sales] = await Promise.all([
      dataStore.getInteractions(req.params.id), dataStore.getSales()
    ]);
    const purchases = sales.filter(s => s.clientId === req.params.id);
    res.json({ client, interactions, purchases });
  } catch (error) { res.status(500).json({ error: error.message }); }
};

exports.createClient = async (req, res) => {
  try { res.status(201).json(await dataStore.createClient(req.body)); }
  catch (error) { res.status(400).json({ error: error.message }); }
};

exports.updateClient = async (req, res) => {
  try {
    const client = await dataStore.updateClient(req.params.id, req.body);
    if (!client) return res.status(404).json({ message: 'Cliente não encontrado' });
    res.json(client);
  } catch (error) { res.status(400).json({ error: error.message }); }
};

exports.deleteClient = async (req, res) => {
  try {
    await dataStore.deleteClient(req.params.id);
    res.json({ message: 'Cliente excluído' });
  } catch (error) { res.status(500).json({ error: error.message }); }
};

exports.getInteractions = async (req, res) => {
  try {
    const { clientId } = req.query;
    res.json(await dataStore.getInteractions(clientId));
  } catch (error) { res.status(500).json({ error: error.message }); }
};

exports.createInteraction = async (req, res) => {
  try { res.status(201).json(await dataStore.createInteraction(req.body)); }
  catch (error) { res.status(400).json({ error: error.message }); }
};

exports.getPipeline = async (req, res) => {
  try { res.json(await dataStore.getPipeline()); }
  catch (error) { res.status(500).json({ error: error.message }); }
};

exports.getCrmStats = async (req, res) => {
  try {
    const [leads, clients, interactions] = await Promise.all([
      dataStore.getLeads(), dataStore.getClients(), dataStore.getInteractions()
    ]);
    res.json({
      totalLeads: leads.length,
      leadsByStatus: Object.entries(leads.reduce((acc, l) => {
        acc[l.status] = (acc[l.status] || 0) + 1; return acc;
      }, {})).map(([key, count]) => ({ _id: key, count })),
      totalClients: clients.filter(c => c.status === 'active').length,
      totalInteractions: interactions.length,
      pipelineValue: leads.filter(l => !['closed_won', 'closed_lost'].includes(l.stage)).reduce((s, l) => s + (l.value || 0), 0)
    });
  } catch (error) { res.status(500).json({ error: error.message }); }
};
