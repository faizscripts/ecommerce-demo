const winston = require('winston');
const mongoose = require('mongoose');

module.exports = function () {
    mongoose.connect(
        `mongodb://127.0.0.1:27017/${process.env.BUSINESS_NAME.split(' ').join('')}DB`,
        {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false})
        .then(() => winston.info(`Connected to ${process.env.BUSINESS_NAME.split(' ').join('')}DB successfully...`))
}
