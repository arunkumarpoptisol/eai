const express = require('express');
const bodyParser = require('body-parser');
const morgan = require("morgan");
const routes = require('./routes/index');


const app = express();

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.raw({ type: 'application/json' }));

app.use('/', routes);

module.exports = app;
