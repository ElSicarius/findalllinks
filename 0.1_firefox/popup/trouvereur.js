const loadConfig = () => {
	browser.storage.local.get().then((res) => {
		document.getElementById("clipboardRb").checked = res.clipboard ?? false;
	});
}

const updateConfig = (clipboardState) => {
	browser.storage.local.set(
	{
		clipboard: clipboardState,
	});
}

loadConfig();

document.getElementById("clipboardRb").addEventListener('change', function () {
	if(this.checked) updateConfig(true);
});
document.getElementById("windowRb").addEventListener('change', function () {
	if(this.checked)updateConfig(false);
});
const get_radio = () => {
    console.log(document.documentElement.innerHTML);
    return document.getElementById("windowRb").checked;
}


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

