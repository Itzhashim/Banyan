const mongoose = require('mongoose');

const reintegrationSchema = new mongoose.Schema({
    sno: {
        type: Number,
        required: [true, 'Serial number is required']
    },
    district: {
        type: String,
        required: [true, 'District is required']
    },
    fileno: {
        type: String,
        required: [true, 'File number is required']
    },
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    gender: {
        type: String,
        required: [true, 'Gender is required'],
        enum: ['Male', 'Female']
    },
    dateOfAdmission: Date,
    dateOfReintegration: Date,
    daysOfStay: Number,
    reintegratedWith: {
        type: String,
        enum: ['Family', 'NGO', 'Home Again', 'Other']
    },
    address: String,
    contact: String,
    state: String,
    reintegratedToDistrict: String,
    acStatus: String,
    reasons: String,
    treatmentOption: String,
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

module.exports = mongoose.model('Reintegration', reintegrationSchema); 