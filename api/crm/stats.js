const dataStore = require('../_dataStore');
const cors = require('../_cors');

module.exports = function handler(req, res) {
  if (cors(req, res)) return;

  try {
    if (req.method === 'GET') {
      const leads = dataStore.getLeads();
      const clients = dataStore.getClients();
      return res.json({
        totalLeads: leads.length,
        leadsByStatus: Object.entries(leads.reduce((acc, l) => {
          acc[l.status] = (acc[l.status] || 0) + 1;
          return acc;
        }, {})).map(([key, count]) => ({ _id: key, count })),
        totalClients: clients.filter(c => c.status === 'active').length,
        totalInteractions: dataStore.getInteractions().length,
        pipelineValue: leads.filter(l => !['closed_won', 'closed_lost'].includes(l.stage)).reduce((s, l) => s + (l.value || 0), 0)
      });
    }
    return res.status(405).json({ message: 'Method not allowed' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
