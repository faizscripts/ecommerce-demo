const winston = require('winston');
const mongoose = require('mongoose');

module.exports = function () {
    mongoose.connect(
        `mongodb://localhost:27017/ecommerceDB`,
        {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false})
        .then(() => winston.info('Connected to ecommerceDB successfully...'))
}