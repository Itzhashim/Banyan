require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const connectDB = require('./config/db');
const { exportAllFormsToSheet } = require('./utils/exportAllFormsToSheet');

async function runExport() {
  await connectDB();
  await exportAllFormsToSheet();
  console.log('All data exported to Google Sheet!');
  process.exit(0);
}

runExport().catch((err) => {
  console.error('Export failed:', err);
  process.exit(1);
}); 