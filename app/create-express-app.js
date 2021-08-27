const cors = require('cors');
const express = require('express');
const path = require('path');
const expressWinston = require('express-winston');
const router = require('./modules/rest-crud-service/routes/create-router')();

const origin = process.env.CORS_ORIGIN || '*';

module.exports = ({ database, logger }) =>
  express()
    .use(
      expressWinston.logger({
        winstonInstance: logger,
        msg: '{{res.statusCode}} {{req.method}} {{req.url}} {{res.responseTime}}ms',
        meta: false,
      }),
    )
    .use(cors({ origin: origin }))
    .use(express.urlencoded({ extended: true }))
    .use(express.json())
    .use((req, res, next) => {
      req.base = `${req.protocol}://${req.get('host')}`;
      req.logger = logger;
      req.db = database;
      return next();
    })
    .use('/api', router)
    .use((error, req, res, next) => {
      logger.error(error, error);
      res.status(error.status || 500).json({ error });
    })
    .use('/static', express.static(path.join(__dirname, 'public')));
