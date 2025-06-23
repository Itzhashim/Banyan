const { updateSheet } = require('./googleSheets');
const AwarenessMeeting = require('../models/AwarenessMeeting');
const Outreach = require('../models/Outreach');
const Reintegration = require('../models/Reintegration');
const Transaction = require('../models/Transaction');
const HospitalVisit = require('../models/HospitalVisit');
const Mastersheet = require('../models/Mastersheet');

async function exportAllFormsToSheet() {
  // Fetch all data
  const [awareness, outreach, reintegration, transactions, hospitalVisits, mastersheet] = await Promise.all([
    AwarenessMeeting.find({}).lean(),
    Outreach.find({}).lean(),
    Reintegration.find({}).lean(),
    Transaction.find({}).lean(),
    HospitalVisit.find({}).lean(),
    Mastersheet.find({}).lean(),
  ]);

  // Helper to prepare data for a sheet
  function prepareRows(data) {
    if (data.length === 0) return [];
    const headers = Object.keys(data[0]);
    return [headers, ...data.map(obj => headers.map(h => obj[h] ?? ''))];
  }

  // Write each form's data to its own tab
  if (awareness.length > 0) await updateSheet(prepareRows(awareness), 'AwarenessMeeting');
  if (outreach.length > 0) await updateSheet(prepareRows(outreach), 'Outreach');
  if (reintegration.length > 0) await updateSheet(prepareRows(reintegration), 'Reintegration');
  if (transactions.length > 0) await updateSheet(prepareRows(transactions), 'Transaction');
  if (hospitalVisits.length > 0) await updateSheet(prepareRows(hospitalVisits), 'HospitalVisit');
  if (mastersheet.length > 0) await updateSheet(prepareRows(mastersheet), 'Mastersheet');
}

module.exports = { exportAllFormsToSheet }; 