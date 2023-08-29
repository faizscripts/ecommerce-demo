const winston = require('winston');
const mongoose = require('mongoose');

module.exports = function () {
    mongoose.connect(
        `mongodb://127.0.0.1:27017/ecommerceDB`,
        {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false})
        .then(() => winston.info('Connected to ecommerceDB successfully...'))
}
