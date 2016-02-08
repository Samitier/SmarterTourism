var paypal = require('paypal-rest-sdk');

paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': process.env.PAYPAL_API_USER,
    'client_secret': process.env.PAYPAL_API_PASS
});

module.exports = paypal;