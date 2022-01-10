var get_radio = function(){
    console.log(document.documentElement.innerHTML);
    return document.querySelector('input[name="output"]:checked').value;
}
window.addEventListener('load', function() {
	document.querySelector('#find_links').addEventListener('click', function() {
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			chrome.tabs.sendMessage(tabs[0].id, {command: "find_links", mode: get_radio()}, function(response) {
				console.log("Call to function");
			});
		});
	});
	document.querySelector('#find_paths').addEventListener('click', function() {
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			chrome.tabs.sendMessage(tabs[0].id, {command: "find_paths", mode: get_radio()}, function(response) {
				console.log("Call to function");
			});
		});
	});
    document.querySelector('#jslinkfinder').addEventListener('click', function() {
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			chrome.tabs.sendMessage(tabs[0].id, {command: "jslinkfinder", mode: get_radio()}, function(response) {
				console.log("Call to function");
			});
		});
	});
});
