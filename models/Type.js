var mongoose = require('mongoose');

var TypeSchema = new mongoose.Schema({
    infoType: String,
    name: { type: 'string', unique: true }, // veggies, pizza toppings, dressing
    description: String, // this is a vegetable 
    author: String, // bob,
    updated_date: { type: Date, default: Date.now },
});


module.exports = mongoose.model('Type', TypeSchema);
