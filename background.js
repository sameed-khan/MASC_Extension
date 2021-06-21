// Searches in article webpage for PMCID and returns it
function getPMCID() {
    let st = document.head.querySelector('meta[name="ncbi_pcid"]').content;
    st = st.replace(/[^0-9]/g, '');
    return st 
}

// Upon getting message from testreplace.js, gets PMCID from webpage and sends it back to testreplace.js
// Extensions are dumb and only allow background scripts to access the tabs API to grab stuff from the activeTab
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message === 'get-pmcID') {
        chrome.scripting.executeScript({target: {tabId: sender.tab.id}, function: getPMCID})
        .then(result => sendResponse(result))
        }
    if (message === 'get-tabID') {
        sendResponse(sender.tab.id);
    }
    return true; // needed to keep the messaging port open so sendResponse can fire off a reply
});
