
var uncomment = function(){
	content = document.documentElement.innerHTML;
	html = content.replace(/<!--/g, "").replace(/-->/g, "");
	document.documentElement.innerHTML = html;
}

var display_this = function(){
	content = document.documentElement.innerHTML;
	html = content.replace(/display:[\s]*?none/g, "display:block");
	document.documentElement.innerHTML = html;
}

var unhide = function(){
	content = document.documentElement.innerHTML;
	lines = content.split('\n');
	for ( var i = 0; i < lines.length; i++){
		match = lines[i].match(/class="[^"]*?hidd?e[^"]*?/g);
		if (match){
			lines[i] = lines[i].replace(/hidd?e/g,"reveal_");
		}
	}
	html = lines.join("\n");
	document.documentElement.innerHTML = html;
}

var class_del = function(){
	content = document.documentElement.innerHTML;
	html = content.replace(/class="[^"]*?"/g,'class');
	document.documentElement.innerHTML = html;
}

var all = function(){
	uncomment();
	display_this();
	unhide();
}


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if(request.command === "uncomment"){
		uncomment();
	}
	if (request.command == "change_display"){
		display_this();
	}
	if (request.command == "class_unhide"){
		unhide();
	}
	if (request.command == "try_all"){
		all();
	}
	if (request.command == "class_del"){
		class_del();
	}
});
