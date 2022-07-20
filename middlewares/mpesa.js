const confirmTemplate = require('../views/confirm')
const config = require('config');
const datetime = require('node-datetime');
const axios = require('axios');
const {Customer} = require("../models/customers");
const {Cart} = require('../models/cart')

const shortcode = config.get('SHORTCODE');
const passkey = config.get('PASSKEY');
const consumerKey = config.get('CONSUMER_KEY');
const consumerSecret = config.get('CONSUMER_SECRET');

const newPassword = () => {
    const dt = datetime.create();
    const formatted = dt.format('YmdHMS');

    const passString = shortcode + passkey + formatted;
    return {
        timestamp: formatted,
        password: Buffer.from(passString).toString('base64')
    };
}

exports.accessToken = (req, res, next) => {
    const url = "https://api.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"
    const auth = "Basic " + Buffer.from(consumerKey + ":" + consumerSecret).toString("base64");
    const headers = {
        Authorization: auth
    }

    axios.get(url, {headers})
        .then(response => {
            req.access_token = response.data;
            next()
        })
        .catch(reason => console.log(reason));
}

exports.stkPush = async (req, res) => {
    const {access_token} = req.access_token;

    const headers = {
        Authorization: 'Bearer ' + access_token
    }

    const stkUrl = "https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest";

    const {timestamp, password} = newPassword();

    const customer = await Customer.find({email: req.session.email})

    const cart = await Cart.findById(req.session.cartID)

    const orderTotal = cart.total + customer[0].delivery_fee

    const phone = `254${customer[0].phone}`

    const data = {
        "BusinessShortCode": shortcode,
        "Password": password,
        "Timestamp": timestamp,
        "TransactionType": "CustomerBuyGoodsOnline",
        "Amount": orderTotal,
        "PartyA": phone,
        "PartyB": 9180681,
        "PhoneNumber": phone,
        "CallBackURL": `https://amazon-cellular.com/orders/paying`,
        "AccountReference": "Amazon Cellular Live",
        "TransactionDesc": "Lipa na M-PESA"
    }

    axios.post(stkUrl, data, {headers})
        .then((response) => {
            // setTimeout( () => {
            //     res.send(confirmTemplate({confirmationError: false}))
            // }, 400)
            res.send(confirmTemplate({confirmationError: false}))
        })
        .catch( (reason) => {
            req.session.paymentError = `Error in establishing connection to M-PESA <br> Make sure you're using a safaricom number in the format 0712345678/ 0123456789.`;
            res.redirect('/checkout');
        })
}