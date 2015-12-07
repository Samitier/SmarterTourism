var mongoose = require('mongoose');

var ActivitySchema = new mongoose.Schema({
    title: String,
    description: String,
    image: String,
    seller: String, //referencia
    price: Number,
    variations: String, //embedded obj
    extras: String,
    updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Activity', ActivitySchema);