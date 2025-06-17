const mongoose = require('mongoose');

const hospitalVisitSchema = new mongoose.Schema({
    fileNumber: {
        type: String,
        required: [true, 'File number is required']
    },
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    typeOfVisit: {
        type: String,
        required: [true, 'Type of visit is required'],
        enum: ['IP', 'OP']
    },
    hospitalName: {
        type: String,
        required: [true, 'Hospital name is required']
    },
    dateOfVisit: {
        type: Date,
        required: [true, 'Date of visit is required']
    },
    dateOfDischarge: Date,
    reason: {
        type: String,
        required: [true, 'Reason for visit is required']
    },
    costToOrganization: Number,
    location: String,
    residingPlace: String,
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

module.exports = mongoose.model('HospitalVisit', hospitalVisitSchema); 