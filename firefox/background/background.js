chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    if (msg.action === "updateIcon") {
        if (msg.value == 0) {
            chrome.browserAction.setIcon({
                path: {
                    "19":"/images/white.png"
                }
            });
        } else if (msg.value == 1) {
            chrome.browserAction.setIcon({
                path: {
                    "19":"/images/green.png"
                }
            });
        } else if (msg.value == 2) {

            chrome.browserAction.setIcon({
                path: {
                    "19":"/images/red.png"
                }
            });
        }
        
    }
    else if (msg.action === "newWindow") {
                 
          let a = URL.createObjectURL(new Blob([msg.value]))
            var creating = browser.windows.create({
              url:a,
              type: "popup",
              height: 500,
              width: 700,
              titlePreface : "Results"
            });
         
    }
});
