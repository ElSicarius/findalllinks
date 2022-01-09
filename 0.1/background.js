chrome.runtime.onInstalled.addListener(function(){
	chrome.storage.sync.set({find: false}, function() {
		console.log("Trouvereur - background");
	});
});

chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
	chrome.declarativeContent.onPageChanged.addRules([{
		conditions: [],
			actions: [new chrome.declarativeContent.ShowPageAction()]
	}]);
});
