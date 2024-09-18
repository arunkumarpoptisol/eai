const app = require('./app');
const config = require('./config/config');
const connectDB = require('./config/database');

connectDB();

app.listen(config.server.port, () => {
    console.log(`Express server running on port ${config.server.port}`);
    // startRabbitMQListener();
});
