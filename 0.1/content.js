
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
	const relative = /[A-Z]/g;
	console.log("Regex link");
	console.log(new Set(stuff.match(regex_links)));


}



chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	console.log("Command "+request.command+" Recieved");
	if(request.command === "find"){
		find_stuff();
	}
});
