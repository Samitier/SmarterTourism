var mongoose = require('mongoose');
var validator = require('validator');
var shortid = require('shortid');


var PackSchema = new mongoose.Schema({
    _id: {type: String, unique: true, default: shortid.generate},
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
    activitiesByPeriod: {
        periods: [Date],
        activities:[{ type:String, ref: 'Activity' }]
    },
    comments: {
        user:{
            name: String,
            id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            image: {type:String, default:"placeholder.png"}
        },
        message: String,
        rating: Number
    },
    coords: [Number]
});

module.exports = mongoose.model('Pack', PackSchema);