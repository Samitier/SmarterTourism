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
    var signature = req.query.Ds_Signature;
    var params = req.query.Ds_MerchantParameters;
    if(redsys.checkResponseSignature(signature, params)) {
        var params = redsys.parseResponse(req.query.Ds_MerchantParameters);
        if(params.Ds_Response.toString()>=0 && params.Ds_Response.toString()<=99) {
            req.orderId = params.Ds_Order;
            req.redirect = true;
            orderCtrl.pay(req, res, next);
        }
        else {
            res.status(400).send({error:"There was some problem with your bank account and it was impossible to proccess your payment." +
            " Try again later."});
        }
    }
    else res.status(400).send({error:"Bad signature"});
};

module.exports.payNotification = function (req, res, next) {
    var signature = req.body.Ds_Signature;
    if(redsys.checkResponseSignature(signature)) {
        var params = redsys.parseResponse(req.body.Ds_MerchantParameters);
        if(params.Ds_Response.toString()>=0 && params.Ds_Response.toString()<=99) {
            req.orderId = params.Ds_Order;
            req.redirect = true;
            orderCtrl.pay(req, res, next);
        }
        else {
            res.status(400).send({error:"There was some problem with your bank account and it was impossible to proccess your payment." +
            " Try again later."});
        };
    }
    else res.status(400).send({error:"Bad signature"});
};


module.exports.cancel = function (req, res, next) {
    orderCtrl.cancel(req, res, next);
}


/*
 /////////// CHECK REQUESTS //////////
 */
module.exports.checkRequestPayNotification = function(req, res, next) {
    if(req.body.Ds_MerchantParameters && req.body.Ds_Signature) next();
    else res.status(400).send({ error: {"code":"400", "name":'Bad request. This resource needs Ds_MerchantParameters and Ds_Signature.'}});
}

module.exports.checkRequestPay = function(req, res, next) {
    if(req.query.Ds_MerchantParameters && req.query.Ds_Signature) next();
    else res.status(400).send({ error: {"code":"400", "name":'Bad request. This resource needs Ds_MerchantParameters and Ds_Signature.'}});
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
        "notificationUrl":req.protocol + '://' + req.get('host') + "/api/payments/redsys/pay-notificaton",
        "urlOK": req.protocol + '://' + req.get('host') + "/api/payments/redsys/pay",
        "urlKO": req.protocol + '://' + req.get('host') + "/api/payments/redsys/cancel?orderId="
        + req.order._id + "&stAccessToken=" + userToken + "&redirect=true"
    };
}
