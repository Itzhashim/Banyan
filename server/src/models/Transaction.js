const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    sno: {
        type: Number,
        required: [true, 'Serial number is required']
    },
    date: {
        type: Number,
        min: 1,
        max: 31
    },
    month: {
        type: Number,
        min: 1,
        max: 12
    },
    year: {
        type: Number,
        min: 2000
    },
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    age: Number,
    gender: String,
    amount: {
        type: Number,
        required: [true, 'Amount is required']
    },
    purpose: {
        type: String,
        required: [true, 'Purpose is required']
    },
    modeOfPayment: {
        type: String,
        required: [true, 'Mode of payment is required']
    },
    status: String,
    notes: String,
    facility: {
        type: String,
        required: [true, 'Facility is required']
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Transaction', transactionSchema); 