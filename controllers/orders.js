var Order = require("../models/Order");
var User = require("../models/User");

module.exports.getAll = function(req,res,next) {
    Order.find({buyer: req.decoded._id}, function (err, obj) {
        if (err) return next(err);
        res.json(obj);
    });
}

module.exports.create = function(req,res,next) {
    //saving the facturation info
    var user = {};
    user.facturationInfo = req.body.facturationInfo;
    var order = {};
    if(req.decoded._id) {
        User.findByIdAndUpdate(req.decoded._id, user, function (err, obj) {
            if (err) return next(err);

            order = {buyer: {id: req.decoded._id}, pack: req.body.order.id,
                numAdults: req.body.order.numAdults, numChildren: req.body.order.numChildren, numBabies: req.body.order.numBabies,
                finalPrice: req.body.order.total_price, dateOfOrder: req.body.order.date};
        });
    } else {
        order = {buyer: user.facturationInfo, pack: req.body.order.id,
            numAdults: req.body.order.numAdults, numChildren: req.body.order.numChildren, numBabies: req.body.order.numBabies,
            finalPrice: req.body.order.total_price, dateOfOrder: req.body.order.date};
    }

    for(var i=0; i<req.body.order.activities.length; ++i) {
        var productOrder = order;
        productOrder.seller= req.decoded.seller,
            productOrder.product = { id: req.body.order.activities[i].id,
                title: req.body.order.activities[i].title,
                variation: req.body.order.selectedVariations[req.body.order.activities[i].id],
                extra: req.body.order.selectedExtras[req.body.order.activities[i].id],
                //TODO: discounts & more than one extra
                total: 0 //TODO: the total amount for that activity (not the total paid for order)
            };
        Order.create(productOrder, function (err, obj) {
            if (err) return next(err);
        });
    }
    //TODO: redirect to the payment platform & redirect to "thank you" on success
    return res.json({success:true});
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