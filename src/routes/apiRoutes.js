const express = require('express');
const webhookController = require('../controllers/webhookController');

const router = express.Router();

router.get('/webhookTest', webhookController.handleShopifyWebhook);
router.post('/shopify/webhook', webhookController.verifyShopifyWebhook, webhookController.handleShopifyWebhook);

module.exports = router;
