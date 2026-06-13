const express = require('express');
const router = express.Router();
const crmController = require('../controllers/crmController');

// Leads
router.get('/leads', crmController.getLeads);
router.post('/leads', crmController.createLead);
router.put('/leads/:id', crmController.updateLead);
router.delete('/leads/:id', crmController.deleteLead);

// Clients
router.get('/clients', crmController.getClients);
router.get('/clients/:id', crmController.getClient);
router.post('/clients', crmController.createClient);
router.put('/clients/:id', crmController.updateClient);
router.delete('/clients/:id', crmController.deleteClient);

// Interactions
router.get('/interactions', crmController.getInteractions);
router.post('/interactions', crmController.createInteraction);

// Pipeline
router.get('/pipeline', crmController.getPipeline);

// Stats
router.get('/stats', crmController.getCrmStats);

module.exports = router;