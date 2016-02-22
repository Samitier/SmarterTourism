var Order = require("../models/Order");
var Activity = require("../models/Activity");
var User = require("../models/User");
var paypal = require("./paypal");
var email = require('../utils/email');
var users = require("./users");
var packs = require("./packs");
var Activities = require("./activities");

module.exports.getAll = function (req, res, next) {
    Order.find({buyer: req.decoded._id}, function (err, obj) {
        if (err) return next(err);
        res.json(obj);
    });
}

module.exports.create = function (req, res, next) {
    var user = {};
    user.facturationInfo = req.body.facturationInfo;
    if (req.decoded) {
        User.findByIdAndUpdate(req.decoded._id, user, function (err) {
            if (err) return next(err);
            else {
                req.body.buyerId = req.decoded._id;
                createOrderAndPayment(req, res, next);
            }
        });
    }
    else {
        //if the user is not registered we create him.
        users.newUser(req, res, function (err, obj) {
            if (err) return next(err);
            else {
                req.body.buyerId = obj._id;
                createOrderAndPayment(req, res, next);
            }
        });
    }
}

module.exports.sendMessage = function (req, res, next) {

}

module.exports.accept = function (req, res, next) {

}

module.exports.complete = function (req, res, next) {
    //maybe automatic
}


module.exports.pay = function(req,res,next) {
    if(!req.orderId) res.status(400).send({ error: {"code":"400", "name":'Bad request. This resource needs an order.'}});
    Order.findById(req.orderId, function (err, dat) {
        if (err) next(err);
        else {
            dat.state = "Processing";
            dat.products.forEach(function (dat) {
                dat.state = "Processing";
            });
            Order.findByIdAndUpdate(req.orderId, dat).populate('buyer').exec(function(err, dat) {
                if (err) next(err);
                email.send(dat.buyer.email, "processingOrder", {order:dat, protocol:req.protocol, host: req.get('host')});
                dat.products.forEach(function(product) {
                    email.sendToId(product.seller, "newOrder", {order:dat, product: product, protocol:req.protocol, host: req.get('host')});
                });
                if(req.redirect) res.redirect('/finalitzar?sta=1');
                else res.json({success:true});
            });
        }
    });
}

module.exports.cancel = function(req,res,next) {
    Order.findById(req.query.orderId, function (err, dat) {
        if (err) next(err);
        else {
            dat.state = "Cancelled";
            dat.products.forEach(function (dat) {
                dat.state = "Cancelled";
            });
            Order.findByIdAndUpdate(req.query.orderId, dat, function (err, dat) {
                if (err) next(err);
                //TODO: send cancellation message?
                else if(req.query.redirect) res.redirect('/finalitzar?sta=0');
                else res.json({success:true});
            });
        }
    });
}


/*
 /////////// CHECK REQUESTS //////////
 */
module.exports.checkRequest = function(req, res, next) {
    if (req.body.facturationInfo && req.body.order && req.body.order.title && req.body.order.numAdults && req.body.order.total_price
        && req.body.order.activities && req.body.order.selectedVariations) next();
    else res.status(400).send({error: {"code": "400", "name": 'Bad request. This resource needs an order.'}});
}


/*
 /////////// PRIVATE FUNCTIONS //////////
 */
var createOrderAndPayment = function (req, res, next) {

    var order = {
        title: req.body.order.title,
        buyer: req.body.buyerId,
        products: [],
        numAdults: req.body.order.numAdults,
        numChildren: req.body.order.numChildren,
        numBabies: req.body.order.numBabies
    };

    Activities.getActivitiesPriceFromOrder(req, res, function(err, total_price) {
        if(err) next(err);
        else {
            var totalPrice = 0;
            for (var i = 0; i < req.body.order.activities.length; ++i) {
                var productOrder = {
                    seller: req.body.order.activities[i].seller,
                    title: req.body.order.activities[i].title,
                    variation: req.body.order.selectedVariations[req.body.order.activities[i]._id].title,
                    discount: {
                        name: "",
                        value: "",
                    },
                    total: req.body.order.activities[i].total,
                    dates: [req.body.order.activities[i].initDate, req.body.order.activities[i].endDate]
                }
                if (req.body.order.selectedExtras[req.body.order.activities[i]]) {
                    //TODO: might be more than one extra selected
                    productOrder.extra = req.body.order.selectedExtras[req.body.order.activities[i]._id].title;
                }
                totalPrice += productOrder.total; //TODO: plus variation price, plus extras price, plus num travelers
                order.products.push(productOrder);
            }
            if(totalPrice != total_price) {
                res.status(400).send({error: {"code": "400", "name": 'Bad request. There was a problem with your data.'}});
            }
            else {
                order.finalPrice = totalPrice;
                order.paymentMethod = req.body.paymentMethod;
                Order.create(order, function (err, dat) {
                    if (err) return next(err);
                    req.order = dat;
                    if(req.body.paymentMethod == "paypal") {
                            paypal.createPayment(req, res, next);
                    }
                    else res.status(400).send({error: {"code": "400", "name": 'Error. TPV service is unavaliable.'}});
                });
            }
        }
    });
}