/*
let x = []
Array.from(document.querySelectorAll('p.subTextColor')).forEach(function(element) {
    x.push(element.innerText.split('ISBN:')[1].trim())
})

console.log(x)


if(x.length > 0) {
    chrome.runtime.sendMessage({msg: x}, function(sendReply) {
        console.log(sendReply)
    })
}
*/
let re = new RegExp('<img.*([0-9]{13}).*>\n{0,2}', 'ig');
let re2 = new RegExp('ISBN.*\n{0,2}.*([0-9]{13}).*', 'ig');
let test = this.document.body.innerHTML;
let isbns = new Set();
let it1 = test.matchAll(re);
let it2 = test.matchAll(re2);
res = it1.next();
while(!res.done){
    isbns.add(res.value[1]);
    res = it1.next();
}
res = it2.next();
while(!res.done){
    isbns.add(res.value[1]);
    res = it2.next();
}

console.log(isbns);