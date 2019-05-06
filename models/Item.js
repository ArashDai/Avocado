var mongoose = require('mongoose');

var ItemSchema = new mongoose.Schema({
    infoType: String,
    name: { type: 'string', unique: true },
    categories: Array,
    price: Number,
    options: Array, //type of bread, type of cheese
    components: Array, //lettuce, turkey, provolone
    modifiers: Array, //add bacon,
    taxes: Array, //default tax
    description: String, // it is a sanwich
    author: String, // bob,
    updated_date: { type: Date, default: Date.now },
});


module.exports = mongoose.model('Item', ItemSchema);
