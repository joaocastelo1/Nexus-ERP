const express = require('express');
const router = express.Router();
const erpController = require('../controllers/erpController');

// Products
router.get('/products', erpController.getProducts);
router.get('/products/:id', erpController.getProduct);
router.post('/products', erpController.createProduct);
router.put('/products/:id', erpController.updateProduct);
router.delete('/products/:id', erpController.deleteProduct);

// Sales
router.get('/sales', erpController.getSales);
router.get('/sales/:id', erpController.getSale);
router.post('/sales', erpController.createSale);
router.put('/sales/:id', erpController.updateSaleStatus);

// Transactions
router.get('/transactions', erpController.getTransactions);
router.post('/transactions', erpController.createTransaction);

// Finance
router.get('/finance/summary', erpController.getFinanceSummary);

// Stats
router.get('/stats', erpController.getErpStats);

module.exports = router;