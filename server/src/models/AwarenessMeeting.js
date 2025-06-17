const mongoose = require('mongoose');

const awarenessMeetingSchema = new mongoose.Schema({
    serialNo: {
        type: Number,
        required: [true, 'Serial number is required']
    },
    dateOfProgram: {
        type: Date,
        required: [true, 'Date of program is required']
    },
    typeOfProgram: {
        type: String,
        required: [true, 'Type of program is required'],
        enum: ['Awareness program', 'Grievance meeting', 'MHRB']
    },
    topic: {
        type: String,
        required: [true, 'Topic is required']
    },
    resourcePerson: {
        type: String,
        required: [true, 'Resource person is required']
    },
    numberOfParticipants: {
        type: Number,
        required: [true, 'Number of participants is required']
    },
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

module.exports = mongoose.model('AwarenessMeeting', awarenessMeetingSchema); 