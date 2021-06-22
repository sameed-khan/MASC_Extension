const express = require('express');
const cors = require('cors'); // why am I doing this to myself? idk I'm a security butthole
const app = express();

var corsOptions = {
    origin: "*",
    methods: 'GET',
    optionsSuccessStatus: 200
}

const GSheetReader = require('g-sheets-api');

// App Engine listening on port 8080, also 'server' variable used to shut down server later
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});

app.get('/docRequest', cors(corsOptions), async (req, res) => {
    // Upon receiving HTTP GET request, query Google sheet for JSON with selectors
    let jsonObj = []; // will hold output of GSheetReader function - since it returns a Promise, not an output
    let readerOptions = {
        sheetId: "1C4xg7Nr7pJzWtpDGv8F7OZUy0svd_n_r6xMLCCJhTRU",
        returnAllResults: false,
        filter: {
            PMCID: req.query.PMCID // query string provided by request contains PMCID of the relevant article
            // this should return a JSON containing "documentSelector : replacement text"
        }
    }
    console.log(`Received this PMCID: ${JSON.stringify(req.query.PMCID)}`);
    await GSheetReader(readerOptions, results => {jsonObj = results})
    console.log("%j", jsonObj);
    res.json(jsonObj);
});


// Just a clean way to close out the server on local testing instead of Ctrl+C all the time
// Removing for GCloud Upload - the cloud server should stay on all the time
//app.get('/quit', (req, res) => {
    //res.send('Closing!');
    //server.close();
    //process.exit(0);
//})
