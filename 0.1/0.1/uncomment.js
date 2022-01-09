window.addEventListener('load', function() {
	document.querySelector('#uncomment').addEventListener('click', function() {
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			chrome.tabs.sendMessage(tabs[0].id, {command: "uncomment"}, function(response) {
				console.log("uncommenting - options message");
			});
		});
	});
	document.querySelector('#display').addEventListener('click', function() {
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			chrome.tabs.sendMessage(tabs[0].id, {command: "change_display"}, function(response) {
				console.log("displaying - options message");
			});
		});
	});
	document.querySelector('#class').addEventListener('click', function() {
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			chrome.tabs.sendMessage(tabs[0].id, {command: "class_unhide"}, function(response) {
				console.log("displaying - options message");
			});
		});
	});
	document.querySelector('#all').addEventListener('click', function() {
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			chrome.tabs.sendMessage(tabs[0].id, {command: "try_all"}, function(response) {
				console.log("displaying - options message");
			});
		});
	});
	document.querySelector('#class_del').addEventListener('click', function() {
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			chrome.tabs.sendMessage(tabs[0].id, {command: "class_del"}, function(response) {
				console.log("displaying - options message");
			});
		});
	});
});
