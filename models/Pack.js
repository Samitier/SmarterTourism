var mongoose = require('mongoose');

var PackSchema = new mongoose.Schema({
    title: {type:String, required:true, unique:true},
    description: String,
    additional_info: String,
    contact_telephone: Number,
    contact_email: String, //should be email
    image: String,
    numDays:Number,
    price: Number,
    featured: Boolean,
    date: Date,
    activities: [
        {day: String, activities:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Activity' }]}
    ]
});

module.exports = mongoose.model('Pack', PackSchema);