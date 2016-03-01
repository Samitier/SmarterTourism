var mongoose = require('mongoose');
var shortid = require('shortid');

var Extra = new mongoose.Schema({
    _id: {type: String, unique: true, default: shortid.generate},
    title: {type:String, required:true},
    description: {type:String, required:true},
    image: {type:String, default:"placeholder.jpg"},
    priceIncr: Number
});