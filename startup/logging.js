const winston = require('winston');
require('winston-mongodb');
require('express-async-errors');

const {format} = require('winston');
const customFormat = winston.format.combine(
    format.colorize(),
    format.align(),
    format.timestamp({format: 'hh:mm DD-MM'}),
    format.printf(info => `${info.timestamp} ${info.level}:${info.message}`
    )
)

module.exports = function () {
    winston.add(new winston.transports.Console({
        handleExceptions: true,
        format: customFormat
    }))

    winston.add(new winston.transports.File({
        filename: 'logfile.log',
        handleExceptions: true,
        format: customFormat,
        level: 'error'
    }))

    process.on('unhandledRejection', error => {
        throw Error(error);
    });
}