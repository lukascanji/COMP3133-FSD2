const csv = require('csv-parser');
const fs = require('fs');
const results = [];

function deleteIfExists(filename) {
    if (fs.existsSync(filename)) {
      fs.unlinkSync(filename);
    }
  }
  
  // Delete existing files
  deleteIfExists('canada.txt');
  deleteIfExists('usa.txt');



fs.createReadStream('input_countries.csv')
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', () => {
    // Filter for Canada
    const canada = results.filter(row => row.country === 'Canada');
    if (canada) {
      fs.writeFileSync('canada.txt', JSON.stringify(canada));
    }
    // Filter for USA
    const america = results.filter(row => row.country === 'United States');
    if (america) {
      fs.writeFileSync('usa.txt', JSON.stringify(america));
    }
  });