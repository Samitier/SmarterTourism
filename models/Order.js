var mongoose = require('mongoose');
var validator = require('validator');

var OrderSchema = new mongoose.Schema({
    buyer: {type:mongoose.Schema.Types.ObjectId, ref: 'User', required:true},
    seller: {type:mongoose.Schema.Types.ObjectId, ref: 'User' , required:true},
    pack: {type:mongoose.Schema.Types.ObjectId, ref: 'Pack' , required:true},
    product: {
        name: {type: String, required:true},
        variation: {type: String, required:true},
        extra: {type: String, required:true},
        discount:{
            name: {type: String, required:true},
            value: {type: String, required:true},
        },
        quantity: Number
    },
    finalPrice: {type: Number, required:true},
    dateOfOrder: {type: Date, required:true},
    state: {type:String, required:true, enum: ['Processing', 'Accepted', 'Canceled', 'Completed']},
    comments: [{
        user: {type: String},
        comment: {type: String}
    }],
});

module.exports = mongoose.model('Order', OrderSchema);