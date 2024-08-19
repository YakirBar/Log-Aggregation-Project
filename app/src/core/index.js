const winston = require("winston");
const express = require("express");
const dotenv = require("dotenv");
const path = require('path');
const app = express();

dotenv.config();

// Create the logger instances for info and warn logs
const infoLogger = winston.createLogger({
    level: "info",
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.File({ filename: "src/core/logs/info.log", dirname: path.join(__dirname, "logs") })
    ]
});

const warnLogger = winston.createLogger({
    level: "warn",
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.File({ filename: "src/core/logs/warn.log", dirname: path.join(__dirname, "logs") })
    ]
});

// Middleware for logging
app.use((req, res, next) => {
    if (req.path === '/') {
        infoLogger.info(`GET request to ${req.path}`);
    } else {
        warnLogger.warn(`Attempt to access non-existent route: ${req.path}`);
    };
    
    next();
});

module.exports = {
    app,
    port: process.env.PORT || 8000
};