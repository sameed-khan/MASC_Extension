/*
This script should operate to call functions to grab document selectors from Google Sheet upon Extension button click
*/

var targetTab; // the tabID of the article page

// sendMessage does not return a promise so must be wrapped to get synchronous behavior
function sendMessagePromise (messageText) {
    if (messageText === 'get-pmcID') {
        return new Promise(resolve => {
            chrome.runtime.sendMessage(messageText, msg => {
                resolve(msg[0].result);
            });
        });
    }
    else if (messageText === 'get-tabID') {
        return new Promise(resolve => {
            chrome.runtime.sendMessage(messageText, msg => {resolve(msg)});
        });
    }
}
function replaceText(htmlJSON){
    for (let i=0; i < htmlJSON.length; i++) {
        let temp = htmlJSON[i];
        document.querySelector("#"+temp.PARAGRAPH_ID).innerHTML = temp.REPLACE_HTML;
        console.log(temp);
    }
}
sendMessagePromise('get-tabID')
.then(tabID => {return new Promise(resolve => {targetTab = tabID; resolve()})})
.then(() => {return sendMessagePromise('get-pmcID')})
.then(pmcID => {return fetch('http://localhost:8080/docRequest?' + new URLSearchParams({PMCID: pmcID}))})
.then(response => {return response.json()})
.then(data => {replaceText(data)});