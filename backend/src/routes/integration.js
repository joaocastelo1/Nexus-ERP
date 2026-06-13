const express = require('express');
const router = express.Router();
const integrationController = require('../controllers/integrationController');

router.post('/convert-lead', integrationController.convertLead);
router.post('/create-sale', integrationController.createSaleFromLead);
router.get('/sync-logs', integrationController.getSyncLogs);
router.get('/dashboard', integrationController.getDashboardData);

module.exports = router;