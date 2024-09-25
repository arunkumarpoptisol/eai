const crypto = require("crypto");
const config = require("../config/config");
const Log = require("../models/Log");
const { transformData, sendMessage } = require("eai-nodejs");
const { getShopifyExpression } = require("../expression/shopifyExpression");
// const { transformData } = require("../services/transformService");
// const sendMessage = require("../queue/sendMessage");

/**
 * Verifies the authenticity of incoming Shopify webhook requests by comparing the HMAC-SHA256 signature.
 *
 * @param {Object} req - The Express request object containing the incoming webhook data.
 * @param {Object} res - The Express response object to send a response back to Shopify.
 * @param {Function} next - The next middleware function in the Express application.
 *
 * @returns {void} Calls the next middleware function if the verification is successful,
 * or sends an unauthorized response if the verification fails.
 */
exports.verifyShopifyWebhook = (req, res, next) => {
  const hmacHeader = req.get("X-Shopify-Hmac-Sha256");
  const generatedHash = crypto
    .createHmac("sha256", config.shopify.webhookSecret)
    .update(req.rawBody)
    .digest("base64");

  if (generatedHash === hmacHeader) {
    return next();
  } else {
    return res.status(401).send("Webhook verification failed");
  }
};

/**
 * Handles incoming Shopify webhook requests and processes the data.
 *
 * @param {Object} req - The Express request object containing the incoming webhook data.
 * @param {Object} res - The Express response object to send a response back to Shopify.
 *
 * @returns {Promise<void>} Resolves when the webhook processing is complete or rejects with an error.
 */
exports.handleShopifyWebhook = async (req, res) => {
  try {
    const shopifyData = req.body; // The incoming Shopify webhook data.
    const tempConfig = config.rabbitmq; // The RabbitMQ configuration.

    // Log the incoming Shopify data.
    await Log.create({
      phase: "shopify",
      data: shopifyData,
    });

    // Transform the incoming Shopify data using the getShopifyExpression function.
    const transformedData = await getShopifyExpression(shopifyData);

    // Log the transformed data.
    await Log.create({
      phase: "transform",
      data: transformedData,
    });

    // Process the transformed data by sending it to RabbitMQ.
    await sendMessage(transformedData, tempConfig);

    // Send a success response back to Shopify.
    res.status(200).send("success");
  } catch (error) {
    // If an error occurs during processing, send an error response back to Shopify.
    res.status(500).send(error.message);
  }
};
