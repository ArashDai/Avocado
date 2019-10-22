var mongoose = require('mongoose');

var TransactionSchema = new mongoose.Schema({

    status: String,
    dateTime: { type: Date, default: Date.now },
    cashier: Array,
    ticketItems: Array,
    totals: Array,
    customer: {
        name: String,
        id: mongoose.Types.ObjectId
    },
    balanceDue: Number,
    history: Array,
    updated_date: { type: Date, default: Date.now },
});


module.exports = mongoose.model('Transaction', TransactionSchema);


//   transaction = {
//       status: 'open, closed',
//       dateTime : '',
//       ticketItems: [],
//       totals: [],
//       customer: {
//           name: '',
//           id: ''
//       },
//        history: [
//          {
//              type: 'payment, refund',
//              id: paymentID
//          }
//        ]
//   }


// history: [
    // {type: payment, id: 123456},
    // {type: refund, id: 123456}
// ]


// both payments and refunds will refer to the same payment in the database, whose status will be either paid or refunded

// payments will be applied directly to ticket items
// a single payment maybe referenced by mutiple items
// e.g a single $10 payment for 5 $2 items

// if one of those items is returned, 
// change the amount of the payment
// set status to partial refund
// update transaction history