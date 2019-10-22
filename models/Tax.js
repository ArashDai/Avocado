var mongoose = require('mongoose');

var TaxSchema = new mongoose.Schema({
    infoType: String,
    name: { type: 'string', unique: true }, // toasted sandwich
    description: String, // a tax for warm sandwiches
    rate: Number, // 8.5
    updated_date: { type: Date, default: Date.now },
});


module.exports = mongoose.model('Tax', TaxSchema);