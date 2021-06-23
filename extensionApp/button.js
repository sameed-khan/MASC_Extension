/*
When popup button is pressed, run content script article_content.js
article_content.js will handle transmission of PMCID to Node App and then
inject relevant HTML into the webpage
**/

let triggerButton = document.getElementById("btn");

triggerButton.addEventListener("click", async() => {
    console.log("The button was clicked again!");
    let tab = await chrome.tabs.query({active: true, currentWindow: true});

    chrome.scripting.executeScript({
        target: { tabId: tab[0].id }, 
        files: ['article_content.js']
    });
});