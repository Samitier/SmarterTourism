var mongoose = require('mongoose');
var validator = require('validator');
var shortid = require('../utils/shortid62chars');

var productOrder = new  mongoose.Schema({
    _id: {type: String, unique: true, default: shortid.generate62chars},
    seller: {type:String, ref: 'User' , required:true},
    title: {type: String, required:true},
    variation: {type: String, required:true},
    extra: {type: String},
    discount:{
        name: {type: String},
        value: {type: String},
    },
    total:{type: Number},
    dates: [{type: Date, required:true}],
    comments: [{
        user: {type: String},
        comment: {type: String}
    }],
    state: {type:String, required:true, enum: ['PaymentPending','Processing', 'Accepted', 'Canceled', 'Completed'], default:'PaymentPending'}
});

var OrderSchema = new mongoose.Schema({
    _id: {type: String, unique: true, default: shortid.generate62chars},
    title: {type: String, required:true},
    buyer: {type:String, ref: 'User', required:true},
    products: [productOrder],
    numAdults: {type: Number, required:true},
    numChildren: {type: Number, default:0},
    numBabies: {type: Number, default:0},
    finalPrice: {type: Number, required:true},
    dateOfOrder: {type: Date, defaults: new Date()},
    state: {type:String, required:true, enum: ['PaymentPending','Processing', 'Accepted', 'Canceled', 'Completed'], default:'PaymentPending'}
});

module.exports = mongoose.model('Order', OrderSchema);
