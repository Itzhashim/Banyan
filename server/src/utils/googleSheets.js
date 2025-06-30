const { google } = require('googleapis');

let key = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON);
// Ensure private_key is properly formatted for Node/OpenSSL
if (key.private_key && key.private_key.includes('\\n')) {
  key.private_key = key.private_key.replace(/\\n/g, '\n');
}

const auth = new google.auth.GoogleAuth({
  credentials: key,
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets('v4');
const spreadsheetId = '1ijfUk0t4DSQecOMDGkvwNn2Gz2LlNAi2aX_oYpRbJ88'; // <-- Replace this with your actual spreadsheet ID

async function updateSheet(data, sheetName = 'Sheet1') {
  const client = await auth.getClient();
  const range = `${sheetName}!A1`;
  await sheets.spreadsheets.values.update({
    auth: client,
    spreadsheetId,
    range,
    valueInputOption: 'RAW',
    requestBody: { values: data },
  });
  console.log(`Sheet updated: ${sheetName}`);
}

module.exports = { updateSheet };