
var find_stuff = function(){
	function printScriptTextContent(script) {
   var xhr = new XMLHttpRequest();
   xhr.open("GET", script.src)
   xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
         return xhr.responseText;
      }
   };
   xhr.send();
	}
	return Array.prototype.slice.call(document.querySelectorAll("script[src]")).forEach(printScriptTextContent);
}



chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if(request.command === "find"){
		return find_stuff();
	}
});
