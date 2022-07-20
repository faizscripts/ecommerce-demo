require("dotenv").config();
const responseTime = require('response-time')
const winston = require('winston');
const express = require('express');
const compression = require('compression')
const app = express();

app.use(responseTime())
app.use(compression())
app.use(express.static('public'));

require('./startup/logging')();
require('./startup/db')();
require('./startup/validation')();
require('./startup/routes')(app);

const port = 3003

app.listen(port, 'localhost', () => {
    winston.info(`Listening at port ${port}.....`);
});