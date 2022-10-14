require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const { logger } = require('./src/utils');
const routes = require('./src/routes');
const { errorHandler } = require('./src/helpers');

const app = express();

app.use(cors());
app.use(helmet());
app.use(
    express.urlencoded({
        limit: '50mb',
        extended: true,
        parameterLimit: 1000000,
    })
);
app.use(express.json({ limit: '50mb' }));
app.use(morgan('[:date[web]] :method :url :status :response-time ms - :res[content-length]'));

app.use('/api/v1', routes);

app.use(errorHandler);

process.on('uncaughtException', function (err) {
    logger.error(err);
});

// eslint-disable-next-line no-unused-vars
process.on('unhandledRejection', function (reason, p) {
    logger.error(reason);
});

module.exports = app;
