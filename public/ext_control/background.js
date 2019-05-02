chrome.runtime.onInstalled.addListener(() => {
    const url = "http://price.live.npc.vovk.dev2.price.ua/api/v4/extension/register";

    function getRandomToken() {
        var randomPool = new Uint8Array(32);
        crypto.getRandomValues(randomPool);
        var hex = '';
        for (var i = 0; i < randomPool.length; ++i) {
            hex += randomPool[i].toString(16);
        }
        return hex;
    }

    chrome.storage.sync.get('userid', (items) => {
        var userid = items.userid;
        if (userid) {
            useToken(userid);
        } else {
            userid = getRandomToken();
            chrome.storage.sync.set({ userid: userid }, () => {
                useToken(userid);
            });
        }
        function useToken(userid) {
            var obj = {
                method: 'post',
                headers: {
                    "X-SIGNATURE": userid
                }
            }
            fetch(url, obj)
                .then(res => {
                    return res.json();
                })
                .then((data) => {
                    chrome.storage.sync.set(data.response, () => {
                        console.log('saved', data.response);
                    });         
                })
                .catch((error) => console.error(error));
        }
    });
});

let recieveModel = (request, sender, sendResponce) => {
    chrome.runtime.sendMessage(request);
}

chrome.runtime.onMessage.addListener(recieveModel);