var Order = require("../models/Order");
var User = require("../models/User");

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
    var user = {};
    user.facturationInfo = req.body.facturationInfo;
    User.findByIdAndUpdate(req.decoded._id, user, function (err, obj) {
        if (err) return next(err);
    });

    //TODO:re-check the final price to check if the client maliciously modified the request

    var clientOrder = req.body.order;
    var order = {buyer: req.decoded._id,
        numAdults:clientOrder.numAdults, numChildren:clientOrder.numChildren, numBabies:clientOrder.numBabies,
        finalPrice: clientOrder.total_price, title: clientOrder.title};
    var orders = [];
    for(var i=0; i< clientOrder.activities.length; ++i) {
        var productOrder = order;
        productOrder.seller = clientOrder.activities[i].seller;
        productOrder.product = { id:clientOrder.activities[i].id,
                title: clientOrder.activities[i].title,
                variation: clientOrder.selectedVariations[clientOrder.activities[i].id],
                extra: clientOrder.selectedExtras[clientOrder.activities[i].id],
                //TODO: discounts & more than one extra
                dates:[clientOrder.activities[i].initDate, clientOrder.activities[i].endDate],
                total: 10 //<-hardcoded TODO: the total amount for that activity (not the total paid for order)
        };
        orders.push(productOrder);
    }
    Order.create(orders, function (err) {
        if (err) return next(err);
        else res.json({success:true});
        //TODO: redirect to the payment platform & redirect to "thank you" on success
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