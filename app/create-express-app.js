const express = require('express');
const bodyParser = require('body-parser');
const expressWinston = require('express-winston');
const router = require('./modules/rest-crud-service/routes/create-router')();
// console.log(router);

module.exports = ({ database, logger }) =>
  express()
    .use(
      expressWinston.logger({
        winstonInstance: logger,
        msg: '{{res.statusCode}} {{req.method}} {{req.url}} {{res.responseTime}}ms',
        meta: false,
      }),
    )
    .use(bodyParser.urlencoded({ extended: true }))
    .use(bodyParser.json())
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
    .use(express.static('./public'));
