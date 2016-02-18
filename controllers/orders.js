var Order = require("../models/Order");
var Activity = require("../models/Activity");
var User = require("../models/User");
var paypal = require("./paypal");
var email = require('../utils/email');
var users = require("./users");
var packs = require("./packs");
var activities = require("./activities");

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

module.exports.pay = function (req, res, next) {
    //here should go the logic to execute after a successful payment (setting the state to processing & sending the emails).
}

module.exports.sendMessage = function (req, res, next) {

}

module.exports.accept = function (req, res, next) {

}

module.exports.complete = function (req, res, next) {
    //maybe automatic
}

module.exports.cancel = function (req, res, next) {
    //here should go the logic to execute after a cancelled payment or a cancelation from the provider/client.
}


/*
 /////////// CHECK REQUESTS //////////
 */
module.exports.checkRequest = function (req, res, next) {
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

    for (var i = 0; i < req.body.order.activities.length; ++i) {
        var productOrder = {
            seller: req.body.order.activities[i].seller,
            title: req.body.order.activities[i].title,
            variation: req.body.order.selectedVariations[req.body.order.activities[i]._id].title,
            discount: {
                name: "",
                value: "",
            },
            dates: [req.body.order.activities[i].initDate, req.body.order.activities[i].endDate]
        }
        if (req.body.order.selectedExtras[req.body.order.activities[i]]) {
            productOrder.extra = req.body.order.selectedExtras[req.body.order.activities[i]._id].title;
        }
        getProductPrice(req, res, function(price) {
            if(price < 0) return next(err);
            else {
                productOrder.total = price;
                order.products.push(productOrder);
            }
        });
    }

    calculatePrice(req, res, function(price) {
        if(price < 0) return next(this.params[1]);
        else {
            order.finalPrice = price;
            Order.create(order, function (err, dat) {
                if (err) return next(err);
                //TODO: redirect to the payment platform & redirect to "thank you" on success
                req.order = dat;
                paypal.createPayment(req, res, next);
            });
        }
    });
}

var calculatePrice = function (req, res, next) {
    var total = 0;
    if (req.body.order.pack) {
        packs.getPackPrice(req, res, function(price) {
            if(price >= 0) {
                total += price;
            } else next(this.params[1]);
        });
    }

    req.body.order.actvIDs = [];
    req.body.order.activities.forEach(function(i, v) {
        req.body.order.actvIDs.push(v._id);
    });
    activities.getActivitiesPrice(req, res, function(price) {
        if(price >= 0) {
            total += price;
        } else return next(-1, this.params[1]);
    });
    next(total);
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
            Order.findByIdAndUpdate(req.orderId, dat, function (err, dat) {
                if (err) next(err);
                email.sendToId(dat.buyer, "processingOrder", dat);
                //TODO: send email to all providers
                if(req.redirect) res.redirect('/finalitzar?sta=1');
                else res.json({success:true});
            });
        }
    });
}

module.exports.sendMessage = function(req,res,next) {

}

module.exports.accept = function(req,res,next) {

}

module.exports.complete = function(req,res,next) {
    //maybe automatic
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

var getProductPrice = function(req, res, next) {
    var price = 0;
    Activity.findById(req.body.order.activities[i]._id, function(err, obj) {
        if(err) return next(-1, err);
        else price = obj.price;
    });

    //Lògica necessaria

    next(price);
}