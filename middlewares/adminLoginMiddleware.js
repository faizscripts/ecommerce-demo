const jwt = require('jsonwebtoken');
const config = require('config');
const loginTemplate = require('../views/pos/login');

module.exports =async function (req, res, next) {

    let adminToken = req.session.adminToken

    if (!adminToken) {
        req.session.originalRoute = req.url
        return res.status(401).send(loginTemplate({}))
    }

    try{
        req.adminID = jwt.verify(adminToken, config.get('JWTKEY'));
        next()
    } catch (e) {
        res.status(400).send('invalid token')
    }

}