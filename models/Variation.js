var mongoose = require('mongoose');
var shortid = require('shortid');

var Variation = new mongoose.Schema({
    _id: {type: String, unique: true, default: shortid.generate},
    title: {type:String, required:true, unique:true},
    description: {type:String, required:true},
    image: {type:String, default:"placeholder.jpg"},
    priceIncr: Number
});

module.exports = Variation;