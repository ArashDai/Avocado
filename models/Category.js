var mongoose = require('mongoose');

var CategorySchema = new mongoose.Schema({
    infoType: String,
    name: { type: 'string', unique: true }, // sandwich, lunch, pastry
    description: String, // it is a sanwich
    author: String, // bob,
    updated_date: { type: Date, default: Date.now },
});


module.exports = mongoose.model('Category', CategorySchema);
