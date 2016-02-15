var mongoose = require('mongoose');
var validator = require('validator');

var PackSchema = new mongoose.Schema({
    title: {type:String, required:true, unique:true},
    description: String,
    additional_info: String,
    contact_telephone: Number,
    contact_email: {type:String, validate: [ validator.isEmail, 'Invalid email address' ]},
    image: {type:String, default:"placeholder.jpg"},
    numDays:Number,
    price: Number,
    featured: Boolean,
    category: String,
    date: Date,
    activities:[],
    activitiesByPeriod: {
        periods: [Date],
        activities:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Activity' }]
    },
    comments: {
        user:{
            name: String,
            id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
        },
        message: String,
        rating: Number
    },
    coords: [Number]
});

module.exports = mongoose.model('Pack', PackSchema);