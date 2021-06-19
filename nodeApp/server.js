const express = require('express');
const app = express();
const GSheetReader = require('g-sheets-api');
const options = {
    sheetId: '1SNPmGVgm-zcncm5U66Vt47b9SeEyeFHML68MmaCvI5w',
    sheetNumber: 1,
    returnAllResults: false,
    filter: {
        'PMCID': '7274506'
    }
}

app.get('/', (req, res) => {
    GSheetReader(options, results => {
        console.log("%j", results);
    });
    res.send("We received your response and grabbed the Sheets JSON data");
});

// App Engine listening on port 8080
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});
