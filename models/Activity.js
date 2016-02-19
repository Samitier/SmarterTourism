var mongoose = require('mongoose');

var Variation = new mongoose.Schema({
    title: {type:String, required:true, unique:true},
    description: {type:String, required:true},
    image: {type:String, default:"placeholder.jpg"},
    priceIncr: Number
});

var Extra = new mongoose.Schema({
    title: {type:String, required:true},
    description: {type:String, required:true},
    image: {type:String, default:"placeholder.jpg"},
    priceIncr: Number
});

var ActivitySchema = new mongoose.Schema({
    title: {type:String, required:true},
    description: {type:String, required:true},
    seller: {type:mongoose.Schema.Types.ObjectId, ref: 'User' , required:true},
    featured: Boolean,
    image: {type:String, default:"placeholder.jpg"},
    price: Number,
    category: {type:String, enum: ['Activity','Stay', 'Meal', 'Inactive']},
    variations: [Variation],
    extras: [Extra],
    timetable: String,
    coords: [Number],
    comments: {
        user:{
            name: String,
            id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
        },
        message: String,
        rating: Number
    },
});

module.exports = mongoose.model('Activity', ActivitySchema);