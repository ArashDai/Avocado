var mongoose = require('mongoose');

var OptionSchema = new mongoose.Schema({
    infoType: String,
    name: { type: 'string', unique: true },
    description: String,
    type: String, // change this to an array later, an option can have mutiple types e.g. olives are a veggietable but also a topping
    categories: Array,
    fee: Number,
    author: String,
    updated_date: { type: Date, default: Date.now },
});


module.exports = mongoose.model('Option', OptionSchema);