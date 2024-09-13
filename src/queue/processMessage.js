const adapterController = require('../controllers/adapterController');
const transformController = require('../controllers/transformController');
const amqp = require('amqplib');
const config = require('../config/config');

async function processMessage(msg) {
    try {
        const messageContent = JSON.parse(msg.content.toString());

        const adapterData = await adapterController.processAdapter(messageContent);
        const transformedData = await transformController.processTransform(adapterData, messageContent.jsonataExpression);

        // Send transformed data to output queue
        const connection = await amqp.connect(config.rabbitmq.url);
        const channel = await connection.createChannel();
        await channel.assertQueue(config.rabbitmq.outputQueue);
        channel.sendToQueue(config.rabbitmq.outputQueue, Buffer.from(JSON.stringify(transformedData)));

        console.log('Message processed and sent to output queue');

        await channel.close();
        await connection.close();
    } catch (error) {
        console.error('Error processing message:', error);
    }
}

module.exports = processMessage;
