var mongoose = require('mongoose');
var validator = require('validator');
var shortid = require('../utils/shortid62chars');
var Extra = require('./Extra');

var productOrder = new  mongoose.Schema({
    _id: { type: String, unique: true, default: shortid.generate62chars },
    seller: { type:String, ref: 'User', required:true },
    title: { type: String, required:true },
    activity: { type: String, ref: 'Activity' },
    variation: { type: String, required:true },
    extras: [{ type: String }],
    discount: {
        name: { type: String },
        value: { type: String },
    },
    total: { type: Number },
    dates: [{ type: Date, required:true }],
    state: { type:String, required:true, enum: ['PaymentPending', 'Processing', 'Accepted', 'Canceled', 'Completed'], default:'PaymentPending' }
});

var OrderSchema = new mongoose.Schema({
    _id: { type: String, unique: true, default: shortid.generate62chars },
    title: { type: String, required:true },
    buyer: { type:String, ref: 'User', required:true },
    products: [productOrder],
    numAdults: { type: Number, required:true },
    numChildren: { type: Number, default:0 },
    numBabies: { type: Number, default:0 },
    finalPrice: { type: Number, required:true },
    dateOfOrder: { type: Date, default: Date.now },
    paymentMethod: { type: String, required:true },
    state: { type:String, required:true, enum: ['PaymentPending','Processing', 'Accepted', 'Canceled', 'Completed'], default:'PaymentPending' }
});

module.exports = mongoose.model('Order', OrderSchema);
