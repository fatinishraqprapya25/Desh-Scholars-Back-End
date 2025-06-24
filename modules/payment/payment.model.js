const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    purchaseId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    status: {
        type: String,
        enum: ['Approved', 'Pending', 'Declined'],
        default: 'Pending',
    },
    amount: {
        type: Number,
        required: true,
    },
    paymentMethod: {
        type: String,
        enum: ['bkashManual', 'nagadManual'],
        required: true,
    },
    transactionId: {
        type: String,
        required: true,
        unique: true,
    },
}, {
    timestamps: true
});

const Payment = mongoose.model('Payment', paymentSchema);
module.exports = Payment;
