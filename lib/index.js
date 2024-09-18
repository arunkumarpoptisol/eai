// lib/index.js
const { getAuthToken, fetchData } = require("./adapter/apiAdapter");
const { transformData } = require("./transformer/dataTransformer");
const { startListener } = require("./queue/rabbitmqListener");
const processMessage = require("./queue/processMessage");
const sendMessage = require("./queue/sendMessage");

module.exports = {
  getAuthToken,
  fetchData,
  transformData,
  startListener,
  processMessage,
  sendMessage,
};
