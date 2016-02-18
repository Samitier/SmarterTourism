var paypal = require('../config/paypal-config');
var orderCtrl = require('./orders');

module.exports.createPayment = function (req, res, next) {
    var token = req.body.token || req.query.stAccessToken || req.headers['st-access-token'];
    var paymentInfo = createPaymentInfo(req, token);
    console.log(createPaymentInfo);
    paypal.payment.create(paymentInfo, function (error, payment) {
        if (error)  next(JSON.stringify(error));
        else {
            for (var index = 0; index < payment.links.length; index++) {
                //Redirect user to this endpoint for redirect url
                if (payment.links[index].rel === 'approval_url') {
                    res.json({success: true, url: payment.links[index].href});
                }
            }
        }
    });
}

module.exports.pay = function (req, res, next) {
    var execute_payment_json = {
        "payer_id": req.query.PayerID,
    };
    paypal.payment.execute(req.query.paymentId, execute_payment_json, function (error, payment) {
        if (error) next(error);
        else {
            req.orderId = payment.transactions[0].item_list.items[0].sku;
            req.redirect = true;
            orderCtrl.pay(req, res, next);
        }
    });
};

module.exports.cancel = function (req, res, next) {
    orderCtrl.cancel(req, res, next);
}


/*
 /////////// CHECK REQUESTS //////////
 */
module.exports.checkRequestPay = function(req, res, next) {
    if(req.query.PayerID && req.query.paymentId) next();
    else res.status(400).send({ error: {"code":"400", "name":'Bad request. This resource needs a PayerID and paymentId.'}});
}

module.exports.checkRequestCreatePayment = function(req, res, next) {
    if((req.body.token || req.query.stAccessToken || req.headers['st-access-token'])
        && req.order && req.order.title && req.order._id && req.order.finalPrice) next();
    else res.status(400).send({ error: {"code":"400", "name":'Bad request. This resource needs an order and an auth token.'}});
}

module.exports.checkRequestCancel = function(req, res, next) {
    if(req.query.orderId) next();
    else res.status(400).send({ error: {"code":"400", "name":'Bad request. This resource needs an orderId.'}});

}

/*
//////////// PRIVATE FUNCTIONS ////////////
 */

var createPaymentInfo = function (req, userToken) {
    var info = {
        "intent": "authorize",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": req.protocol + '://' + req.get('host') + "/api/payments/paypal/pay",
            "cancel_url": req.protocol + '://' + req.get('host') + "/api/payments/paypal/cancel?orderId="
            + req.order._id + "&stAccessToken=" + userToken + "&redirect=true"
        },
        "transactions": [{
            "item_list": {
                "items": [{
                    "name": req.order.title,
                    "sku": req.order._id,
                    "price": req.order.finalPrice,
                    "currency": "EUR",
                    "quantity": 1
                }]
            },
            "amount": {
                "currency": "EUR",
                "total": req.order.finalPrice
            },
            "description": "Una compra de paquets turístics mitjançant Smarter Tourism Plataforma Integral."
        }]
    };

    return info;
}
