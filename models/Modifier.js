var mongoose = require('mongoose');

var ModifierSchema = new mongoose.Schema({
    infoType: String,
    name: { type: 'string', unique: true },
    description: String,
    categories: Array,
    fee: Number,
    additions: [],
    removals: [],
    author: String,
    updated_date: { type: Date, default: Date.now },
});


module.exports = mongoose.model('Modifier', ModifierSchema);