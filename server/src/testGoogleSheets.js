const { updateSheet } = require('./utils/googleSheets');

const testData = [
  ['Name', 'Email', 'Score'],
  ['Alice', 'alice@example.com', 95],
  ['Bob', 'bob@example.com', 88],
];

updateSheet(testData)
  .then(() => console.log('Success! Check your Google Sheet.'))
  .catch(console.error); 