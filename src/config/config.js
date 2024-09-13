// config.js

require('dotenv').config()

const mongoDbConfig = {
    username:process.env.MONGO_DB_USERNAME,
    password:process.env.MONGO_DB_PASSWORD,
    host: process.env.MONGO_DB_HOST,
    port: process.env.MONGO_DB_PORT,
    name: process.env.MONGO_DB_NAME,
    authSource: process.env.MONGO_DB_NAME,
}

module.exports = {
    mongodb:{
        // uri:`mongodb://${mongoDbConfig.username}:${mongoDbConfig.password}@${mongoDbConfig.host}:${mongoDbConfig.port}/${mongoDbConfig.name}?authSource=${mongoDbConfig.authSource}`
    uri:`mongodb://${mongoDbConfig.host}:${mongoDbConfig.port}/${mongoDbConfig.name}?authSource=${mongoDbConfig.authSource}`
    },
    rabbitmq: {
        url: process.env.RABBITMQ_URL || 'amqp://localhost',
        inputQueue: process.env.INPUT_QUEUE || 'input_queue',
        outputQueue: process.env.OUTPUT_QUEUE || 'output_queue',
    },
    shopify: {
        webhookSecret: process.env.SHOPIFY_WEBHOOK_SECRET,
    },
    api: {
        clientId: process.env.API_CLIENT_ID,
        clientSecret: process.env.API_CLIENT_SECRET,
        url: process.env.API_URL,
        tokenUrl: process.env.API_TOKEN_URL,
    },
    server: {
        port: process.env.PORT || 4000,
    },
};
