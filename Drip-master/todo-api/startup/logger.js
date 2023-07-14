const winston = require("winston");
require("winston-mongodb");
require("express-async-errors");

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({ colorize: true, prettyPrint: true }),
    new winston.transports.File({ filename: "logfile.log" }),
    new winston.transports.MongoDB({
      db: "mongodb://localhost/vidcity",
    }),
  ],
});

function log() {
  if (process.env.NODE_ENV !== "production") {
    logger.add(
      new winston.transports.Console({
        format: winston.format.simple(),
      })
    );
  }

  logger.exceptions.handle(
    new winston.transports.Console({ colorize: true, prettyPrint: true }),
    new winston.transports.File({ filename: "uncaughtExceptions.log" })
  );

  process.on("unhandledRejection", (ex) => {
    throw ex;
  });
}

exports.logger = logger;
exports.log = log;
