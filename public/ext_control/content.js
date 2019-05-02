/*global chrome*/

chrome.runtime.onMessage.addListener(recieveRules);

function recieveRules(request, sender, sendResponce) {
    request.rules.forEach(el => {
        let node = document.querySelector(el);
        if (node) {
            let model = {
                model_name: node.textContent
            }
            chrome.runtime.sendMessage(model);
            return;
        }
    })
}