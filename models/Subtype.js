var mongoose = require('mongoose');

var SubtypeSchema = new mongoose.Schema({
    infoType: String,
    name: { type: 'string', unique: true }, // spicy
    description: String, // this item is spicy
    parentType: String, //all lowercase
    author: String, // bob,
    updated_date: { type: Date, default: Date.now },
});


module.exports = mongoose.model('Subtype', SubtypeSchema);
