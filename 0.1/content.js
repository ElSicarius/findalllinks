
const bad_domains = [

]

var find_links = function(stuff) {

    const regex_links = /https?:[\\\/]*[\w\_\.\:\d\-]+([\\\/]*)([\\\/\w\_\-\d]*)(\?([^&'},)"])([^=]+=[^&'},)"]+)?)?/gmi;
    console.log("Regex link");
    return Array.from(new Set(stuff.match(regex_links)));

}

var find_paths = function(stuff) {

    const relative = /(?:"|')(https?:[\\\/]+)?(([\\\/\?]+)([\.\w\d\_\-\:]+([\\\/]+)?)+)|(([\.\w\d\_\-\:]+([\\\/]+))+)[^\?"'\s]+(\?([^=,]+([=,\s]+)?)?)?(?:"|')/gmi;

    console.log("Regex path or link");
    var x = Array.from(new Set(stuff.match(relative)));
    const regex_garbage = /(\\(x[\da-f]{2}|u[\da-f]{4}))/gmi;
    const regex_repetitive = /(.)\1{4,}/gmi;
    var end_list = [];
    for (var i = 0; i<x.length; i++){
        if (!x[i].match(regex_garbage)){
            if (!x[i].match(regex_repetitive)){
                var y = x[i].replace("\"","").replace("'","");
                end_list.push(y);
            } else {
                console.log("Matched repetitive", x[i]);
            }
        } else {
            console.log("Matched garbage",x[i])
        }
    }
    return end_list;

}

var find_jslinkfinder = function(stuff) {

    const regex_links = /(?:"|')(((?:[a-zA-Z]{1,10}:\/\/|\/\/)[^"'\/]{1,}\.[a-zA-Z]{2,}[^"']{0,})|((?:\/|\.\.\/|\.\/)[^"'><,;| *()(%%$^\/\\\[\]][^"'><,;|()]{1,})|([a-zA-Z0-9_\-\/]{1,}\/[a-zA-Z0-9_\-\/]{1,}\.(?:[a-zA-Z]{1,4}|action)(?:[\?|\/][^"|']{0,}|))|([a-zA-Z0-9_\-]{1,}\.(?:php|asp|aspx|jsp|json|action|html|js|txt|xml)(?:\?[^"|']{0,}|)))(?:"|')/gm
    console.log("Regex jslinkfinder");
    return Array.from(new Set(stuff.match(regex_links)));
}



chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log("Command "+request.command+" Recieved");

    var stuff = document.documentElement.innerHTML;

    function printScriptTextContent(script) {
        var xhr = new XMLHttpRequest();
        var stuf = "";
        console.log("Link finder on ", script.src)
       	xhr.open("GET", script.src, false)
        try {
            xhr.send( null );
        } catch (error){
            return ""
        }
        return xhr.responseText;
    }

    var scripts = document.querySelectorAll("script[src]");

    for (var i = 0; i < scripts.length; i++){
        stuff += printScriptTextContent(scripts[i]);
    }
    var c = [];
    if(request.command === "find_links"){
        c = find_links(stuff);
    }
    if(request.command === "find_paths"){
        c = find_paths(stuff);
    }
    if(request.command === "jslinkfinder"){
        c = find_jslinkfinder(stuff);
    }
    console.log("Mode ",request);
    var text_window = "";
    if (request.mode == "window"){
        console.log("Mode window");
        var win = window.open("", "Links results", "toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=500,height=700,top="+(40)+",left="+(40));

        for (var i =0; i<c.length; i++){
            text_window+=c[i]+"<br>";
        }
        win.document.body.innerHTML = text_window;
    } else if (request.mode == "clipboard") {
        console.log("Mode clipboard");
        for (var i =0; i<c.length; i++){
            text_window+=c[i]+"\n";
        }
        // to add to clipboard we need to ask the permission
        window.focus();
        navigator.permissions.query({name: "clipboard-write"}).then(result => {
            if (result.state == "granted" || result.state == "prompt") {
                navigator.clipboard.writeText(text_window).then(function() {
                    chrome.runtime.sendMessage({
                        action: 'updateIcon',
                        value: 1
                    });
                }, function(err) {
                    console.error('Async: Could not copy text: ', err);
                    chrome.runtime.sendMessage({
                        action: 'updateIcon',
                        value: 2
                    });
                });
                setTimeout(function () {
                    chrome.runtime.sendMessage({
                        action: 'updateIcon',
                        value: 0
                    })} , 3000)
            }
        });
    }
});
