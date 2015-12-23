var mongoose = require('mongoose');

var Variation = new mongoose.Schema({
    title: {type:String, required:true, unique:true},
    description: {type:String, required:true},
    image: String,
    priceIncr: Number
});

var Extra = new mongoose.Schema({
    title: {type:String, required:true, unique:true},
    description: {type:String, required:true},
    image: String,
    priceIncr: Number
});

var ActivitySchema = new mongoose.Schema({
    title: {type:String, required:true},
    description: {type:String, required:true},
    featured: Boolean,
    image: String,
    seller: String, //referencia a User
    price: Number,
    variations: [Variation],
    extras: [Extra],
});

module.exports = mongoose.model('Activity', ActivitySchema);