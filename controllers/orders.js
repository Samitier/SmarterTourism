var Order = require("../models/Order");
var User = require("../models/User");
var paypal = require("./paypal");

module.exports.getAll = function(req,res,next) {
    Order.find(function (err, obj) {
        if (err) return next(err);
        res.json(obj);
    });
    /*Order.find({buyer: req.decoded._id}, function (err, obj) {
        if (err) return next(err);
        res.json(obj);
    });*/
}

module.exports.create = function(req,res,next) {
    checkRequest(req.body);

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

        //TODO: redirect to the payment platform & redirect to "thank you" on success
        req.order = dat;
        paypal.createPayment(req,res,next);
    });
}

module.exports.pay = function(req,res,next) {

}

module.exports.sendMessage = function(req,res,next) {

}

module.exports.accept = function(req,res,next) {

}

module.exports.complete = function(req,res,next) {
    //maybe automatic
}

module.exports.cancel = function(req,res,next) {

}

var checkRequest = function(req) {
    //els ifs
    //si sta malament retornem bad request
    //sino fem next
}