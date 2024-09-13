const amqp = require('amqplib');
const config = require('../config/config');
const processMessage = require('./processMessage');

async function startRabbitMQListener() {
    try {
        const connection = await amqp.connect(config.rabbitmq.url);
        const channel = await connection.createChannel();

        await channel.assertQueue(config.rabbitmq.inputQueue);
        channel.consume(config.rabbitmq.inputQueue, async (msg) => {
            if (msg !== null) {
                await processMessage(msg);
                channel.ack(msg);
            }
        });

        console.log('Listening for RabbitMQ messages...');
    } catch (error) {
        console.error('Error starting RabbitMQ listener:', error);
    }
}

module.exports = startRabbitMQListener;
