const fs = require('fs');
const path = require('path');

// Path to your CSV file
const csvFilePath = path.join(__dirname, 'data.csv');

// Read CSV file
fs.readFile(csvFilePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading CSV file:', err);
        return;
    }

    const lines = data.trim().split('\n');
    const headers = lines[0].split(',');

    const json = lines.slice(1).map(line => {
        const values = line.split(',');
        const obj = {};
        headers.forEach((header, idx) => {
            obj[header.trim()] = values[idx].trim();
        });
        return obj;
    });

    // Write JSON to file
    fs.writeFile(
        path.join(__dirname, 'data.json'),
        JSON.stringify(json, null, 2),
        err => {
            if (err) {
                console.error('Error writing JSON file:', err);
            } else {
                console.log('CSV converted to JSON successfully.');
            }
        }
    );
});
