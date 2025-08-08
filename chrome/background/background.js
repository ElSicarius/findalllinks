chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === "updateIcon") {
    let path;
    if (msg.value === 0) path = { "19": "/images/white.png" };
    else if (msg.value === 1) path = { "19": "/images/green.png" };
    else if (msg.value === 2) path = { "19": "/images/red.png" };
    else if (msg.value === 3) path = { "19": "/images/orange.png" };

    if (path) {
      chrome.action.setIcon({ path });
    }
  }
});
