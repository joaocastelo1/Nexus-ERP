const dataStore = require('../_dataStore');
const cors = require('../_cors');

module.exports = async function handler(req, res) {
  if (cors(req, res)) return;

  try {
    if (req.method === 'POST') {
      const { leadId } = req.body;

      const lead = await dataStore.getLeadById(leadId);
      if (!lead) return res.status(404).json({ message: 'Lead não encontrado' });

      const clients = await dataStore.getClients();
      const existingClient = clients.find(c => c.email === lead.email);
      if (existingClient) {
        return res.status(400).json({ message: 'Já existe cliente com este email' });
      }

      const client = await dataStore.createClient({
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
        company: lead.company,
        crmLeadId: lead._id,
        status: 'active',
        score: 10
      });

      await dataStore.updateLead(leadId, { status: 'won', crmClientId: client._id });

      await dataStore.createSyncLog({
        event: 'lead.converted',
        source: 'crm',
        target: 'erp',
        status: 'success',
        details: { leadId: lead._id, clientId: client._id }
      });

      return res.status(201).json({ lead: await dataStore.getLeadById(leadId), client });
    }
    return res.status(405).json({ message: 'Method not allowed' });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};
