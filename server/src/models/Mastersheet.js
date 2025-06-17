const mongoose = require('mongoose');

const mastersheetSchema = new mongoose.Schema({
    district: {
        type: String,
        required: [true, 'District is required']
    },
    fileNo: {
        type: String,
        required: [true, 'File No is required']
    },
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    dateOfAdmission: {
        type: Date,
        required: [true, 'Date of Admission is required']
    },
    age: {
        type: Number,
        required: [true, 'Age is required']
    },
    ageCategory: String,
    gender: {
        type: String,
        required: [true, 'Gender is required'],
        enum: ['Male', 'Female']
    },
    maritalStatus: {
        type: String,
        required: [true, 'Marital Status is required'],
        enum: ['Single', 'Married', 'Divorced', 'Separated', 'Widow']
    },
    psychiatricDiagnosis: {
        type: String,
        required: [true, 'Psychiatric Diagnosis is required']
    },
    comorbid: String,
    psychiatricComorbidity: String,
    generalHealthComorbidity: String,
    placeOfOrigin: String,
    stateCategory: String,
    sourceOfReferral: String,
    placeOfRescueArea: String,
    placeOfRescueDistrict: String,
    durationOfHomelessnessMonths: String,
    episodesOfHomelessness: String,
    reasonsForHomelessness: String,
    unemployed: String,
    wanderingBehaviour: String,
    substanceAbuse: String,
    intellectualDisability: String,
    abandonedByFamily: String,
    lackOfAccessToMHCare: String,
    lossOfContactWithFamily: String,
    lackOfAcceptanceByFamily: String,
    mentalIllness: String,
    familyDispute: String,
    communityDispute: String,
    lossOfPrimaryCaregiver: String,
    abuse: String,
    physicalInjury: String,
    lackOfMedicalCompliance: String,
    romanticRelationship: String,
    spiritualPathways: String,
    financialLoss: String,
    poverty: String,
    historyOfEmployment: String,
    historyOfEmploymentCleaned: String,
    incomePM: String,
    previousTreatment: String,
    historyOfAbuse: String,
    typeOfAbuse: String,
    currentStatus: {
        type: String,
        required: [true, 'Current Status is required'],
        enum: ['IP', 'Family reintegration', 'NGO reintegration', 'Home again reintegration', 'Left by choice', 'Expired']
    },
    dateOfExit: Date,
    dos: String,
    reintegratedTo: String,
    reintegratedState: String,
    reintegratedDistrict: String,
    followUpStatus: String,
    familyStructure: String,
    noOfChildren: String,
    childrenGenderAndAge: String,
    genderOfParentsWithMI: String,
    primaryCG: String,
    cgRelationship: String,
    cgAge: String,
    occupationOfCG: String,
    incomeCG: String,
    currentOccupationOfClient: String,
    clientIncome: String,
    socialEntitlement: String,
    aadharCard: String,
    disabilityCard: String,
    rationCard: String,
    voterID: String,
    bankAccount: String,
    drivingLicense: String,
    aftercareStatus: String,
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

module.exports = mongoose.model('Mastersheet', mastersheetSchema); 