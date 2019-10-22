var mongoose = require('mongoose');

var PaymentSchema = new mongoose.Schema({
    type: String, // cash credit giftcard
    status: String, // paid, refunded
    amount: Number, // payment amount
    transaction: mongoose.Types.ObjectId,
    updated_date: { type: Date, default: Date.now },
});


module.exports = mongoose.model('Payment', PaymentSchema);