const { createLogger, format, transports } = require('winston');
const { combine, timestamp, prettyPrint, json, simple } = format;

const formats = combine(timestamp(), prettyPrint(), simple());
const logger = createLogger({
  level: 'info',
  format: formats,
  // defaultMeta: { service: 'user-service' },
  transports: [
    //
    // - Write all logs with level `error` and below to `error.log`
    // - Write all logs with level `info` and below to `log.log`
    //
    new transports.File({ timestamp: true, filename: './logs/error-log.log', level: 'error' }),
    new transports.File({ timestamp: true, filename: './logs/log.log' }),
  ],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new transports.Console({
      format: formats,
      handleExceptions: true,
      humanreadableUnhandledException: true,
      colorize: true,
    }),
  );
}

module.exports = logger;
