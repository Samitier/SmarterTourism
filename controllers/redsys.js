var redsys = require('../config/redsys-config');
var orderCtrl = require('./orders');

module.exports.createPayment = function (req, res, next) {
    var token = req.body.token || req.query.stAccessToken || req.headers['st-access-token'];
    if(!token) token = auth.getUserToken(req.order.buyer);
    var paymentInfo = createPaymentInfo(req, token);
    var paymentForm = redsys.createPaymentForm(paymentInfo);
    res.json({success: true, url: paymentForm.url, form:paymentForm.form});
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
    return {
        "finalPrice": Math.floor(req.order.finalPrice*100),
        "_id":req.order._id,
        "notificationUrl":req.protocol + '://' + req.get('host') + "/api/payments/redsys/pay",
        "urlOK": req.protocol + '://' + req.get('host') + "/api/payments/redsys/pay",
        "urlKO": req.protocol + '://' + req.get('host') + "/api/payments/redsys/cancel"
    };
}
