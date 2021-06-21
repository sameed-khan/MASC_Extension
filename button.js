/*
When popup button is pressed, run content script testreplace.js
testreplace.js will handle transmission of PMCID to Node App and then
inject relevant HTML into the webpage
**/

let triggerButton = document.getElementById("btn");

triggerButton.addEventListener("click", async() => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true});

    chrome.scripting.executeScript({
        target: { tabId: tab.id }, 
        files: ['testreplace.js']
    });
});