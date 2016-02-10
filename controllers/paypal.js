var paypal = require('../config/paypal-config');
var Order = require("../models/Order");


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

module.exports.pay = function (req, res, next) {
    var execute_payment_json = {
        "payer_id": req.query.PayerID,
    };
     paypal.payment.execute(req.query.paymentId, execute_payment_json, function (error, payment) {
         if (error) next(error);
         else {
             var orderId = payment.transactions[0].item_list.items[0].sku;
             Order.findById(orderId, function(err, dat) {
                 if(err) next(err);
                 else {
                     dat.state = "Processing";
                     dat.products.forEach(function(dat) {dat.state = "Processing";});
                     Order.findByIdAndUpdate(orderId, dat, function(err, dat){
                        if(err) next(err);
                        else res.redirect('/finalitzar?sta=1');
                     });
                 }
             });
         }
     });
};

module.exports.cancel = function (req, res, next) {
    //the order has to be cancelled
    res.send("token is set to " + req.query.token);
}

var createPaymentInfo = function (order) {
    var info = {
        "intent": "authorize",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://localhost:4321/api/payments/paypal/pay",
            "cancel_url": "http://localhost:4321/finalitzar?sta=0"
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