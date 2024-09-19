const amqp = require('amqplib');

/**
 * Sends a message to the specified output queue using AMQP.
 *
 * @param {Object} msg - The message to be sent.
 * @param {Object} config - The configuration object containing the AMQP connection details and output queue name.
 * @param {string} config.url - The URL of the AMQP server.
 * @param {string} config.outputQueue - The name of the output queue.
 *
 * @returns {Promise<void>} - A promise that resolves when the message is sent successfully or rejects with an error.
 *
 * @example
 * const config = {
 *   url: 'amqp://localhost:5672',
 *   outputQueue: 'my_output_queue'
 * };
 *
 * const message = {
 *   key: 'value'
 * };
 *
 * sendMessage(message, config)
 *   .then(() => console.log('Message sent successfully'))
 *   .catch(error => console.error('Error sending message:', error));
 */
async function sendMessage(msg, config) {
    try {
        // Send transformed data to output queue
        const connection = await amqp.connect(config.url);
        const channel = await connection.createChannel();
        await channel.assertQueue(config.outputQueue);
        channel.sendToQueue(config.outputQueue, Buffer.from(JSON.stringify(msg)));

        console.log('Message processed and sent to output queue');

        await channel.close();
        await connection.close();
    } catch (error) {
        console.error('Error processing message:', error);
        throw new Error(error);
        
    }
}
module.exports = sendMessage