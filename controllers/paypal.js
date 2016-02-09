var paypal = require('../config/paypal-config');


module.exports.createPayment = function (req, res, next) {
    var paymentInfo = createPaymentInfo(req.order);
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

/*
 var execute_payment_json = {
 "payer_id": "Appended to redirect url",
 "transactions": [{
 "amount": {
 "currency": "USD",
 "total": "1.00"
 }
 }]
 };

 var paymentId = 'PAYMENT id created in previous step';
 */

module.exports.pay = function (req, res, next) {
    res.json(req);
    /*
     paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
     if (error) {
     console.log(error.response);
     throw error;
     } else {
     console.log("Get Payment Response");
     console.log(JSON.stringify(payment));
     }
     });
     */
};

module.exports.cancel = function (req, res, next) {

}

var createPaymentInfo = function (order) {
    var info = {
        "intent": "authorize",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "/api/payments/paypal/pay",
            "cancel_url": "/api/payments/paypal/cancel"
        },
        "transactions": [{
            "item_list": {
                "items": [{
                    "name": order.title,
                    "sku": order._id,
                    "price": order.finalPrice,
                    "currency": "EUR",
                    "quantity": 1
                }]
            },
            "amount": {
                "currency": "EUR",
                "total": order.finalPrice
            },
            "description": "Una compra de paquets turístics mitjançant Smarter Tourism Plataforma Integral."
        }]
    };

    return info;
}