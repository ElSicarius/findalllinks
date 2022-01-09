chrome.runtime.onInstalled.addListener(function(){
	chrome.storage.sync.set({uncommented: false}, function() {
		console.log("Uncommented - background message");
	});
});

chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
	chrome.declarativeContent.onPageChanged.addRules([{
		conditions: [],
			actions: [new chrome.declarativeContent.ShowPageAction()]
	}]);
});