
let parser = new DOMParser()

chrome.runtime.onMessage.addListener(async function(request, sender, sendReply) {
    let ISBNs = request.msg
    console.log(ISBNs)

    ISBNs.forEach(async element => {
        let x = await fetchLibGen(element)
        console.log(x)
    });
})


const fetchLibGen = async (ISBN) => {
    let request = new Promise((resolve, reject) => {
                    fetch(`https://libgen.lc/search.php?req=${ISBN}&lg_topic=libgen&open=0&view=simple&res=25&phrase=1&column=def`)
                        .then(res => res.text())
                        .then(html => {
                            let doc = parser.parseFromString(html, "text/html")
                            resolve(doc)
                        })
                })

    let data = await request

    return data
}