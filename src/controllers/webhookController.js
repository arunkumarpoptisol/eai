const crypto = require("crypto");
const config = require("../config/config");
const Log = require("../models/Log");
const { transformData, sendMessage } = require("eai-nodejs");
const { getShopifyExpression } = require("../expression/shopifyExpression");
// const { transformData } = require("../services/transformService");
// const sendMessage = require("../queue/sendMessage");

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

exports.handleShopifyWebhook = async (req, res) => {
  const shopifyData = req.body;
  const tempConfig = config.rabbitmq;
  await Log.create({
    phase: "shopify",
    data: shopifyData,
  });
  const transformedData = await getShopifyExpression(shopifyData);

  await Log.create({
    phase: "transform",
    data: transformedData,
  });
  // Process the incoming Shopify data
  await sendMessage(transformedData, tempConfig);
  res.status(200).send({ transformedData, result });
};
