// models/Log.js
const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
    phase: {
        type: String,
        enum: ['shopify','adapter', 'transform'],
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    data: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    }
});

const Log = mongoose.model('Log', logSchema);

module.exports = Log;
