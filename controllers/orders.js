var Order = require("../models/Order");
var User = require("../models/User");
var paypal = require("./paypal");
var mail = require("../config/email");

module.exports.getAll = function(req,res,next) {
    Order.find({buyer: req.decoded._id}, function (err, obj) {
        if (err) return next(err);
        res.json(obj);
    });
}

module.exports.create = function(req,res,next) {

    var user = {};
    user.facturationInfo = req.body.facturationInfo;

    if(req.decoded._id) {
        User.findByIdAndUpdate(req.decoded._id, user, function (err, obj) {
            if (err) return next(err);
        });
    }
    else {
        //TODO: if the user is not registered we create him.
    }

    //TODO:re-check the final price to check if the client maliciously modified the request

    var order = {
        title: req.body.order.title,
        buyer: req.decoded._id,
        products:[],
        numAdults: req.body.order.numAdults,
        numChildren: req.body.order.numChildren,
        numBabies: req.body.order.numBabies,
        finalPrice: req.body.order.total_price
    };

    for(var i=0; i< req.body.order.activities.length; ++i) {
        var productOrder = {
            seller: req.body.order.activities[i].seller,
            title: req.body.order.activities[i].title,
            variation: req.body.order.selectedVariations[req.body.order.activities[i]._id].title,
            discount:{
                name: "",
                value: "",
            },
            total:10,
            dates: [req.body.order.activities[i].initDate,  req.body.order.activities[i].endDate]
        }
        if(req.body.order.selectedExtras[req.body.order.activities[i]]){
            productOrder.extra = req.body.order.selectedExtras[req.body.order.activities[i]._id].title;
        }
        order.products.push(productOrder);
    }

    Order.create(order, function (err, dat) {
        if (err) return next(err);
        req.order = dat;
        //TODO: redirect to the payment platform slected
        paypal.createPayment(req,res,next);
    });
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
                //TODO: send email to client
                mail.sendToId(dat.seller, "processingOrder", dat);
                //TODO: send email to providers
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
    if(req.body.facturationInfo && req.body.order && req.body.order.title && req.body.order.numAdults && req.body.order.total_price
        && req.body.order.activities && req.body.order.selectedVariations) next();
    else res.status(400).send({ error: {"code":"400", "name":'Bad request. This resource needs an order.'}});

}