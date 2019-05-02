/*global chrome*/

chrome.runtime.onMessage.addListener(recieveRules);

function recieveRules(request, sender, sendResponce) {
    console.log('first +', request, 'second +', request.rules);
    request.rules.forEach(el => {
        let node = document.querySelector(el);
        if (node) {
            let model = {
                model_name: node.textContent
            }
            console.log(model);
            chrome.runtime.sendMessage(model);
        }
    })
}