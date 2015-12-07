var mongoose = require('mongoose');

var Variation = new mongoose.Schema({
    title: String,
    description: String,
    image: String,
    priceIncr: Number
});

var Extra = new mongoose.Schema({
    title: String,
    description: String,
    image: String,
    priceIncr: Number
});

var ActivitySchema = new mongoose.Schema({
    title: String,
    description: String,
    image: String,
    seller: String, //referencia
    price: Number,
    variations: [Variation],
    extras: [Extra], //embedded obj
});

module.exports = mongoose.model('Activity', ActivitySchema);