
var find_stuff = function(){
	var stuff = "";
	function printScriptTextContent(script) {
   var xhr = new XMLHttpRequest();
	 var stuf = "";
	 console.log(script.src)
   xhr.open("GET", script.src, false)
	 try {
   	xhr.send( null );
	} catch (error){
		return ""
	}
	 return xhr.responseText;
	}
	var scripts = document.querySelectorAll("script[src]");
	console.log(scripts.length);
	for (var i = 0; i < scripts.length; i++){
			stuff += printScriptTextContent(scripts[i]);
	}
	const regex_links = /https?:[\\\/]*[\w\_\.\:\d\-]+([\\\/]*)([\\\/\w\_\-\d]*)(\?([^&'},)"])([^=]+=[^&'},)"]+)?)?/gmi;
	const relative = /("|')(https?:[\\\/]+)?([\.\w\d\_\-\:]+([\\\/\?])+([^=",\s]+([=",\s]+)?))+("|')/gmi;
	console.log("Regex link");
	console.log(new Set(stuff.match(regex_links)));
	console.log("Regex path+link");
	console.log(new Set(stuff.match(relative)));
}

var find_jslinkfinder = function(){
	var stuff = "";
	function printScriptTextContent(script) {
   var xhr = new XMLHttpRequest();
	 var stuf = "";
	 console.log(script.src)
   xhr.open("GET", script.src, false)
	 try {
   	xhr.send( null );
	} catch (error){
		return ""
	}
	 return xhr.responseText;
	}
	var scripts = document.querySelectorAll("script[src]");
	console.log(scripts.length);
	for (var i = 0; i < scripts.length; i++){
			stuff += printScriptTextContent(scripts[i]);
	}
	const regex_links = /(?:"|')(((?:[a-zA-Z]{1,10}:\/\/|\/\/)[^"'\/]{1,}\.[a-zA-Z]{2,}[^"']{0,})|((?:\/|\.\.\/|\.\/)[^"'><,;| *()(%%$^\/\\\[\]][^"'><,;|()]{1,})|([a-zA-Z0-9_\-\/]{1,}\/[a-zA-Z0-9_\-\/]{1,}\.(?:[a-zA-Z]{1,4}|action)(?:[\?|\/][^"|']{0,}|))|([a-zA-Z0-9_\-]{1,}\.(?:php|asp|aspx|jsp|json|action|html|js|txt|xml)(?:\?[^"|']{0,}|)))(?:"|')/gm
	console.log("Regex link");
	console.log(new Set(stuff.match(regex_links)));
}



chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	console.log("Command "+request.command+" Recieved");
	if(request.command === "find"){
		find_stuff();
	}
	if(request.command === "jslinkfinder"){
		find_jslinkfinder();
	}
});
