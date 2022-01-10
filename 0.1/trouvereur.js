window.addEventListener('load', function() {
	document.querySelector('#all').addEventListener('click', function() {
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			chrome.tabs.sendMessage(tabs[0].id, {command: "find"}, function(response) {
				console.log("Call to function");
			});
		});
	});
});
