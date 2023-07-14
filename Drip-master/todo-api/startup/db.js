const winston = require("winston");
const mongoose = require("mongoose");
const { logger } = require("./logger");

module.exports = function (params) {
  mongoose
    .connect("mongodb://localhost/vidcity")
    .then(() => logger.info("Connected to MongoDB..."));
};
