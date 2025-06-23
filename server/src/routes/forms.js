const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { protect } = require('../middleware/auth');
const AwarenessMeeting = require('../models/AwarenessMeeting');
const Outreach = require('../models/Outreach');
const Reintegration = require('../models/Reintegration');
const Transaction = require('../models/Transaction');
const HospitalVisit = require('../models/HospitalVisit');
const Mastersheet = require('../models/Mastersheet');
const ExcelJS = require('exceljs');
const { exportAllFormsToSheet } = require('../utils/exportAllFormsToSheet');

// Validation middleware for all forms
const commonValidation = [
    body('facility').notEmpty().withMessage('Facility is required')
];

// Awareness Meeting Form Routes
router.post('/awareness', protect, [
    ...commonValidation,
    body('dateOfProgram').isDate().withMessage('Invalid date format'),
    body('typeOfProgram').isIn(['Awareness program', 'Grievance meeting', 'MHRB']).withMessage('Invalid program type'),
    body('topic').notEmpty().withMessage('Topic is required'),
    body('resourcePerson').notEmpty().withMessage('Resource person is required'),
    body('numberOfParticipants').isNumeric().withMessage('Number of participants must be a number')
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: errors.array()[0].msg
            });
        }

        const formData = {
            ...req.body,
            createdBy: req.user._id
        };

        const awarenessMeeting = await AwarenessMeeting.create(formData);
        await exportAllFormsToSheet();
        res.status(201).json({
            success: true,
            message: 'Form submitted successfully',
            data: awarenessMeeting
        });
    } catch (error) {
        console.error('Error submitting awareness meeting form:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to submit form. Please try again.'
        });
    }
});

// Outreach Form Routes
router.post('/outreach', protect, [
    ...commonValidation,
    body('sno').isNumeric().withMessage('Serial number must be a number'),
    body('district').notEmpty().withMessage('District is required'),
    body('name').notEmpty().withMessage('Name is required'),
    body('gender').isIn(['Male', 'Female']).withMessage('Invalid gender'),
    body('date').optional().isInt({ min: 1, max: 31 }).withMessage('Date must be between 1 and 31'),
    body('month').optional().isInt({ min: 1, max: 12 }).withMessage('Month must be between 1 and 12'),
    body('year').optional().isInt({ min: 2000 }).withMessage('Year must be 2000 or later'),
    body('age').optional().isNumeric().withMessage('Age must be a number')
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: errors.array()[0].msg
            });
        }

        const formData = {
            ...req.body,
            createdBy: req.user._id
        };

        const outreach = await Outreach.create(formData);
        await exportAllFormsToSheet();
        res.status(201).json({
            success: true,
            message: 'Form submitted successfully',
            data: outreach
        });
    } catch (error) {
        console.error('Error submitting outreach form:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to submit form. Please try again.'
        });
    }
});

// Reintegration Form Routes
router.post('/reintegration', protect, [
    ...commonValidation,
    body('sno').isNumeric().withMessage('Serial number must be a number'),
    body('district').notEmpty().withMessage('District is required'),
    body('fileno').notEmpty().withMessage('File number is required'),
    body('name').notEmpty().withMessage('Name is required'),
    body('gender').isIn(['Male', 'Female']).withMessage('Invalid gender'),
    body('dateOfAdmission').optional().isDate().withMessage('Invalid date format'),
    body('dateOfReintegration').optional().isDate().withMessage('Invalid date format'),
    body('daysOfStay').optional().isNumeric().withMessage('Days of stay must be a number'),
    body('reintegratedWith').optional().isIn(['Family', 'NGO', 'Home Again', 'Other']).withMessage('Invalid reintegration type')
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: errors.array()[0].msg
            });
        }

        const formData = {
            ...req.body,
            createdBy: req.user._id
        };

        const reintegration = await Reintegration.create(formData);
        await exportAllFormsToSheet();
        res.status(201).json({
            success: true,
            message: 'Form submitted successfully',
            data: reintegration
        });
    } catch (error) {
        console.error('Error submitting reintegration form:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to submit form. Please try again.'
        });
    }
});

// Transaction Form Routes
router.post('/transactions', protect, [
    ...commonValidation,
    body('sno').isNumeric().withMessage('Serial number must be a number'),
    body('name').notEmpty().withMessage('Name is required'),
    body('amount').isNumeric().withMessage('Amount must be a number'),
    body('purpose').notEmpty().withMessage('Purpose is required'),
    body('modeOfPayment').notEmpty().withMessage('Mode of payment is required'),
    body('date').optional().isInt({ min: 1, max: 31 }).withMessage('Date must be between 1 and 31'),
    body('month').optional().isInt({ min: 1, max: 12 }).withMessage('Month must be between 1 and 12'),
    body('year').optional().isInt({ min: 2000 }).withMessage('Year must be 2000 or later'),
    body('age').optional().isNumeric().withMessage('Age must be a number')
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: errors.array()[0].msg
            });
        }

        const formData = {
            ...req.body,
            createdBy: req.user._id
        };

        const transaction = await Transaction.create(formData);
        await exportAllFormsToSheet();
        res.status(201).json({
            success: true,
            message: 'Form submitted successfully',
            data: transaction
        });
    } catch (error) {
        console.error('Error submitting transaction form:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to submit form. Please try again.'
        });
    }
});

// Hospital Visit Form Routes
router.post('/hospital-visits', protect, [
    ...commonValidation,
    body('fileNumber').notEmpty().withMessage('File number is required'),
    body('name').notEmpty().withMessage('Name is required'),
    body('typeOfVisit').isIn(['IP', 'OP']).withMessage('Invalid visit type'),
    body('hospitalName').notEmpty().withMessage('Hospital name is required'),
    body('dateOfVisit').isDate().withMessage('Invalid date format'),
    body('reason').notEmpty().withMessage('Reason for visit is required'),
    body('costToOrganization').optional().isNumeric().withMessage('Cost must be a number'),
    body('dateOfDischarge').optional().isDate().withMessage('Invalid date format')
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: errors.array()[0].msg
            });
        }

        const formData = {
            ...req.body,
            createdBy: req.user._id
        };

        const hospitalVisit = await HospitalVisit.create(formData);
        await exportAllFormsToSheet();
        res.status(201).json({
            success: true,
            message: 'Form submitted successfully',
            data: hospitalVisit
        });
    } catch (error) {
        console.error('Error submitting hospital visit form:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to submit form. Please try again.'
        });
    }
});

// Mastersheet Form Routes
router.post('/mastersheet', protect, [
    ...commonValidation,
    body('district').notEmpty().withMessage('District is required'),
    body('fileNo').notEmpty().withMessage('File No is required'),
    body('name').notEmpty().withMessage('Name is required'),
    body('dateOfAdmission').isDate().withMessage('Invalid date format'),
    body('age').isNumeric().withMessage('Age must be a number'),
    body('gender').isIn(['Male', 'Female']).withMessage('Invalid gender'),
    body('maritalStatus').isIn(['Single', 'Married', 'Divorced', 'Separated', 'Widow']).withMessage('Invalid marital status'),
    body('psychiatricDiagnosis').notEmpty().withMessage('Psychiatric Diagnosis is required'),
    body('currentStatus').isIn(['IP', 'Family reintegration', 'NGO reintegration', 'Home again reintegration', 'Left by choice', 'Expired']).withMessage('Invalid current status')
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: errors.array()[0].msg
            });
        }

        const formData = {
            ...req.body,
            createdBy: req.user._id
        };

        const mastersheet = await Mastersheet.create(formData);
        await exportAllFormsToSheet();
        res.status(201).json({
            success: true,
            message: 'Form submitted successfully',
            data: mastersheet
        });
    } catch (error) {
        console.error('Error submitting mastersheet form:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to submit form. Please try again.'
        });
    }
});

// GET routes for all forms
router.get('/awareness', protect, async (req, res) => {
    try {
        const query = {};
        if (req.user.role !== 'admin') {
            query.facility = req.user.facility;
        } else if (req.query.facility) {
            query.facility = req.query.facility;
        }
        const forms = await AwarenessMeeting.find(query).sort({ createdAt: -1 }).populate('createdBy', 'name email');
        res.status(200).json({ success: true, data: forms });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch forms' });
    }
});

router.get('/outreach', protect, async (req, res) => {
    try {
        const query = {};
        if (req.user.role !== 'admin') {
            query.facility = req.user.facility;
        } else if (req.query.facility) {
            query.facility = req.query.facility;
        }
        const forms = await Outreach.find(query).sort({ createdAt: -1 }).populate('createdBy', 'name email');
        res.status(200).json({ success: true, data: forms });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch forms' });
    }
});

router.get('/reintegration', protect, async (req, res) => {
    try {
        const query = {};
        if (req.user.role !== 'admin') {
            query.facility = req.user.facility;
        } else if (req.query.facility) {
            query.facility = req.query.facility;
        }
        const forms = await Reintegration.find(query).sort({ createdAt: -1 }).populate('createdBy', 'name email');
        res.status(200).json({ success: true, data: forms });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch forms' });
    }
});

router.get('/transactions', protect, async (req, res) => {
    try {
        const query = {};
        if (req.user.role !== 'admin') {
            query.facility = req.user.facility;
        } else if (req.query.facility) {
            query.facility = req.query.facility;
        }
        const forms = await Transaction.find(query).sort({ createdAt: -1 }).populate('createdBy', 'name email');
        res.status(200).json({ success: true, data: forms });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch forms' });
    }
});

router.get('/hospital-visits', protect, async (req, res) => {
    try {
        const query = {};
        if (req.user.role !== 'admin') {
            query.facility = req.user.facility;
        } else if (req.query.facility) {
            query.facility = req.query.facility;
        }
        const forms = await HospitalVisit.find(query).sort({ createdAt: -1 }).populate('createdBy', 'name email');
        res.status(200).json({ success: true, data: forms });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch forms' });
    }
});

router.get('/mastersheet', protect, async (req, res) => {
    try {
        const query = {};
        if (req.user.role !== 'admin') {
            query.facility = req.user.facility;
        } else if (req.query.facility) {
            query.facility = req.query.facility;
        }
        const forms = await Mastersheet.find(query).sort({ createdAt: -1 }).populate('createdBy', 'name email');
        res.status(200).json({ success: true, data: forms });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch forms' });
    }
});

// Export all forms data for a facility as Excel
router.get('/export/facility/:facilityId', protect, async (req, res) => {
    try {
        const { facilityId } = req.params;
        // Fetch all forms for the facility
        const [awareness, outreach, reintegration, transactions, hospitalVisits, mastersheet] = await Promise.all([
            AwarenessMeeting.find({ facility: facilityId }).lean(),
            Outreach.find({ facility: facilityId }).lean(),
            Reintegration.find({ facility: facilityId }).lean(),
            Transaction.find({ facility: facilityId }).lean(),
            HospitalVisit.find({ facility: facilityId }).lean(),
            Mastersheet.find({ facility: facilityId }).lean(),
        ]);

        const workbook = new ExcelJS.Workbook();

        // Helper to add a worksheet from data
        function addSheet(name, data) {
            if (data.length === 0) {
                workbook.addWorksheet(name);
                return;
            }
            const worksheet = workbook.addWorksheet(name);
            worksheet.columns = Object.keys(data[0]).map(key => ({ header: key, key }));
            data.forEach(row => worksheet.addRow(row));
        }

        addSheet('AwarenessMeetings', awareness);
        addSheet('Outreach', outreach);
        addSheet('Reintegration', reintegration);
        addSheet('Transactions', transactions);
        addSheet('HospitalVisits', hospitalVisits);
        addSheet('Mastersheet', mastersheet);

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', `attachment; filename=facility_${facilityId}_data.xlsx`);
        await workbook.xlsx.write(res);
        res.end();
    } catch (error) {
        console.error('Error exporting facility data:', error);
        res.status(500).json({ success: false, message: 'Failed to export data.' });
    }
});

// Export all forms data for all facilities as Excel
router.get('/export/all-facilities', protect, async (req, res) => {
    try {
        // Fetch all forms for all facilities
        const [awareness, outreach, reintegration, transactions, hospitalVisits, mastersheet] = await Promise.all([
            AwarenessMeeting.find({}).lean(),
            Outreach.find({}).lean(),
            Reintegration.find({}).lean(),
            Transaction.find({}).lean(),
            HospitalVisit.find({}).lean(),
            Mastersheet.find({}).lean(),
        ]);

        const workbook = new ExcelJS.Workbook();

        // Helper to add a worksheet from data
        function addSheet(name, data) {
            if (data.length === 0) {
                workbook.addWorksheet(name);
                return;
            }
            const worksheet = workbook.addWorksheet(name);
            worksheet.columns = Object.keys(data[0]).map(key => ({ header: key, key }));
            data.forEach(row => worksheet.addRow(row));
        }

        addSheet('AwarenessMeetings', awareness);
        addSheet('Outreach', outreach);
        addSheet('Reintegration', reintegration);
        addSheet('Transactions', transactions);
        addSheet('HospitalVisits', hospitalVisits);
        addSheet('Mastersheet', mastersheet);

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=all_facilities_data.xlsx');
        await workbook.xlsx.write(res);
        res.end();
    } catch (error) {
        console.error('Error exporting all facilities data:', error);
        res.status(500).json({ success: false, message: 'Failed to export data.' });
    }
});

// Export all forms data filled by the current user as Excel
router.get('/export/user-forms', protect, async (req, res) => {
    try {
        const userId = req.user._id;
        // Fetch all forms created by the user
        const [awareness, outreach, reintegration, transactions, hospitalVisits, mastersheet] = await Promise.all([
            AwarenessMeeting.find({ createdBy: userId }).lean(),
            Outreach.find({ createdBy: userId }).lean(),
            Reintegration.find({ createdBy: userId }).lean(),
            Transaction.find({ createdBy: userId }).lean(),
            HospitalVisit.find({ createdBy: userId }).lean(),
            Mastersheet.find({ createdBy: userId }).lean(),
        ]);

        const workbook = new ExcelJS.Workbook();

        // Helper to add a worksheet from data
        function addSheet(name, data) {
            if (data.length === 0) {
                workbook.addWorksheet(name);
                return;
            }
            const worksheet = workbook.addWorksheet(name);
            worksheet.columns = Object.keys(data[0]).map(key => ({ header: key, key }));
            data.forEach(row => worksheet.addRow(row));
        }

        addSheet('AwarenessMeetings', awareness);
        addSheet('Outreach', outreach);
        addSheet('Reintegration', reintegration);
        addSheet('Transactions', transactions);
        addSheet('HospitalVisits', hospitalVisits);
        addSheet('Mastersheet', mastersheet);

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=user_forms_data.xlsx');
        await workbook.xlsx.write(res);
        res.end();
    } catch (error) {
        console.error('Error exporting user forms data:', error);
        res.status(500).json({ success: false, message: 'Failed to export data.' });
    }
});

module.exports = router; 