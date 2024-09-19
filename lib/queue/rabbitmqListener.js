// lib/queue/rabbitmqListener.js
const amqp = require('amqplib');
const processMessage = require('./processMessage');

async function startListener(rabbitMQUrl, queueName, handleMessage) {
    try {
        const connection = await amqp.connect(rabbitMQUrl);
        const channel = await connection.createChannel();

        await channel.assertQueue(queueName, { durable: true });
        console.log(`Waiting for messages in ${queueName}...`);

        channel.consume(queueName, async (msg) => {
            if (msg !== null) {
                const message = JSON.parse(msg.content.toString());
                await handleMessage(message);
                channel.ack(msg);
            }
        });
    } catch (error) {
        console.error('RabbitMQ Listener Error:', error);
        throw new Error(error);
    }
}

module.exports = {
    startListener,
};
