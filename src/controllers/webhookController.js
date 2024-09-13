const crypto = require("crypto");
const config = require("../config/config");
const Log = require("../models/Log");
const { transformData } = require("../services/transformService");
const sendMessage = require("../queue/sendMessage");

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

  const result = await Log.find({});
  // JSONata expression to transform the data
  const jsonataExpression = `{
   "_id":_id,
    "newPhase": phase,
    "newData": data,
    "timestamp": timestamp
    }`;

  const tempConfig = config.rabbitmq;
  const transformedData = await transformData(result[0], jsonataExpression);
  // Process the incoming Shopify data
  await sendMessage(transformedData, tempConfig);
  res.status(200).send(transformedData);
};
