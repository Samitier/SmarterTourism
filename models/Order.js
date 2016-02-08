var mongoose = require('mongoose');
var validator = require('validator');

var OrderSchema = new mongoose.Schema({
    buyer: {type:mongoose.Schema.Types.ObjectId, ref: 'User', required:true},
    seller: {type:mongoose.Schema.Types.ObjectId, ref: 'User' , required:true},
    pack: {type:mongoose.Schema.Types.ObjectId, ref: 'Pack'},
    product: {
        title: {type: String, required:true},
        variation: {type: String, required:true},
        extra: {type: String},
        discount:{
            name: {type: String},
            value: {type: String},
        },
        total:{type: Number}
    },
    numAdults: {type: Number, required:true},
    numChildren: {type: Number, default:0},
    numBabies: {type: Number, default:0},
    finalPrice: {type: Number, required:true},
    dateOfOrder: {type: Date, required:true},
    state: {type:String, required:true, enum: ['PaymentPending','Processing', 'Accepted', 'Canceled', 'Completed'], default:'PaymentPending'},
    comments: [{
        user: {type: String},
        comment: {type: String}
    }]
});

module.exports = mongoose.model('Order', OrderSchema);
