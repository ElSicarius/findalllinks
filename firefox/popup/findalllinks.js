var mode = "window";

const loadConfig = () => {
	browser.storage.local.get().then((res) => {
        mode = res["FALOutput"] ?? "window";
        document.getElementById("clipboardRb").checked = (res["FALOutput"] == "clip")  ?? false;
	});
}

const updateConfig = (fALOutputMode) => {
	browser.storage.local.set({
		FALOutput: fALOutputMode,
	});
    loadConfig();
}

loadConfig();

document.getElementById("clipboardRb").addEventListener('change', function () {
	if(this.checked) updateConfig("clip");
});
document.getElementById("windowRb").addEventListener('change', function () {
	if(this.checked) updateConfig("window");
});
const get_radio = () => {
    return mode;
}

const inject_script = (tabId) => {
    browser.tabs.executeScript(tabId,{ file: "/content_scripts/content.js", runAt: 'document_end' });
}
window.addEventListener('load', function() {

    browser.tabs.query({active: true, currentWindow: true}, function(tabs) {
        inject_script(tabs[0].id);
    });

});

document.addEventListener("click", async (e) => {

	switch (e.target.id) {
		case "find_links":
			chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
				chrome.tabs.sendMessage(tabs[0].id, {command: "find_links", mode: get_radio()}, function(response) {
					console.log("Call to function");
				});
			});
			break;

		case "find_paths":
			chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
				chrome.tabs.sendMessage(tabs[0].id, {command: "find_paths", mode: get_radio()}, function(response) {
					console.log("Call to function");
				});
			});
			break;

		case "jslinkfinder":
			chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
				chrome.tabs.sendMessage(tabs[0].id, {command: "jslinkfinder", mode: get_radio()}, function(response) {
					console.log("Call to function");
				});
			});
			break;

		default:
			break;
	}
});
