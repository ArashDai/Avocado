var mongoose = require('mongoose');
// a component should be identifiable and understandable by name only e.g. lettuce, bacon
var ComponentSchema = new mongoose.Schema({
    infoType: String,
    name:{ type: 'string', unique: true },
    type: String, //veggies, 'pizza toppings' change to an array later
    subtype: String, //what are subtypes for? like 'spicy pizza toppings'
    description: String,
    categories: Array,  // build-a-sandwich, build-a-salad, pizza
    options: [],
        // { use chips and a chip list
        // name: String, //lettuce
        // fee: Number   // 0
        // }
    author: String,
    updated_date: { type: Date, default: Date.now },
});


module.exports = mongoose.model('Component', ComponentSchema);