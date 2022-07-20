const winston = require('winston');
const mongoose = require('mongoose');

module.exports = function () {
    mongoose.connect(
        `mongodb://localhost:27017/ecommerce-demo`,
        {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false})
        .then(() => winston.info('Connected to E-COMMERCE DB successfully...'))
}