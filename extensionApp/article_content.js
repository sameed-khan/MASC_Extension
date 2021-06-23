// Allows for tooltips to overflow the main article content by changing CSS style
// Loops through each JSON-linked paragraph element and replaces it with new HTML
function replaceText(htmlJSON){
    document.querySelector("#maincontent").style.overflow = "visible";

    for (let i=0; i < htmlJSON.length; i++) {
        let temp = htmlJSON[i];
        document.querySelector("#"+temp.PARAGRAPH_ID).innerHTML = temp.REPLACE_HTML;
        console.log(temp);
    }
}

function getPMCID() {
    let st = document.head.querySelector('meta[name="ncbi_pcid"]').content;
    st = st.replace(/[^0-9]/g, '');
    return new Promise(resolve => {resolve(st)}); 
}
getPMCID()
//.then(pmcID => {return fetch('http://localhost:8080/docRequest?' + new URLSearchParams({PMCID: pmcID}))}) - for local testing
.then(pmcID => {return fetch('http://masc-server-app.uc.r.appspot.com/docRequest?' + new URLSearchParams({PMCID: pmcID}),
)})
.then(response => {
    if (response.ok) {
        return response.json();
    } else {
        console.log('404 Error, fetch did not work');
    }
})
.then(data => {
    console.log(JSON.stringify(data));
    replaceText(data);
});