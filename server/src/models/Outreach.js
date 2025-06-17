const mongoose = require('mongoose');

const outreachSchema = new mongoose.Schema({
    sno: {
        type: Number,
        required: [true, 'Serial number is required']
    },
    district: {
        type: String,
        required: [true, 'District is required']
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
    age: {
        type: Number
    },
    area: String,
    taluk: String,
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    gender: {
        type: String,
        required: [true, 'Gender is required'],
        enum: ['Male', 'Female']
    },
    personWithMentalIllness: String,
    serviceProvided: String,
    category: String,
    tier: String,
    notes: String,
    doneBy: String,
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

module.exports = mongoose.model('Outreach', outreachSchema); 