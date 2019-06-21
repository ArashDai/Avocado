var mongoose = require('mongoose');

var ItemSchema = new mongoose.Schema({
    infoType: String,
    name: { type: 'string', unique: true }, //need to make this required
    types: Array, //sandwich,soup,salad, danish
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

//{ type: Array, default: ['none'] } this did not work maybe i did it wrong
module.exports = mongoose.model('Item', ItemSchema);
