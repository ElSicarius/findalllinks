const bad_domains = [
    "googleapis.com",
    "gstatic.com",
    "g.co",
    "jquery.com",
    "googletagmanager.com",
    "google-analytics.com",
    "recaptcha.net",
    "googleadservices.com",
    "doubleclick.net",
    "windows.net",
    "onetrust.com",
    "getbootstrap.com",
    "ggpht.com",
    "opensource.org",
    "gnu.org",
    "w3.org",
    "angular.io",
    "youtube.com"
]

var sanitize = (x) => {
    const regex_garbage = /(\\(x[\da-f]{2}|u[\da-f]{4}))/gmi;
    const regex_repetitive = /(.)\1{4,}/gmi;
    var filtered_list = [];
    for (var i = 0; i<x.length; i++){
        if (!x[i].match(regex_garbage)){
            if (!x[i].match(regex_repetitive)){
                var y = x[i].replace('"',"").replace("'","");
                y = y.replace('"',"").replace("'","");
                filtered_list.push(y);
            } else {
                console.log("Matched repetitive", x[i]);
            }
        } else {
            console.log("Matched garbage",x[i])
        }
    }
    // filtering bad domains
    const regex_url = /[\w]{2,10}:[\\\/]+[\w\d\*\_\-\.\:]+([\\\/]*)([\\\/\w\_\-\d]*)(\?([^&'},)"])([^=]+=[^&'},)"]+)?)?/gmi;
    var end_list = [];
    for (var i = 0; i<filtered_list.length; i++){
        if (!filtered_list[i].match(regex_url)){
            end_list.push(filtered_list[i]);
            continue;
        }
        // parse URL
        var url = new URL(filtered_list[i]);
        var hostname = url.hostname.split(".").slice(-2).join(".");
        //console.log(hostname);
        if (!bad_domains.includes(hostname)){
            end_list.push(filtered_list[i]);
        } else {
            console.log("Matched bad domain",filtered_list[i])
        }
    }

    return end_list;
}

var find_links = function(stuff) {

    const regex_links = /[\w]{2,10}:[\\\/]+[\w\d\*\_\-\.\:]+(([\\\/]*)([\\\/\w\_\-\d]*)(\?([^&'},)"])([^=]+=[^&'},)"]+)?)?)?/gmi;
    console.log("Regex link");
    var x = Array.from(new Set(stuff.match(regex_links)));
    return sanitize(x);

}

var find_links_v2 = function(stuff) {

    const regex_links = /(?:"|')([\w]{2,10}:[\\\/]+[\w\d\*\_\-\.\:]+)?((([\\\/]+)([\.\w\d\_\-\:]+)((?![\.\w\d\_\-\:]+)[\\\/]+)?)+|(([\.\w\d\_\-\:]+)([\\\/]+)((?![\\\/]+)[\.\w\d\_\-\:]+)?)+)?(\?([\w\d\-\_\;{}()\[\]]+(\=([^&,\s]+(\&)?)?)?){0,})?(?:"|')/gmi;
    console.log("Regex path or link v2");
    var x = Array.from(new Set(stuff.match(regex_links)));
    return sanitize(x);

}

var find_paths_v3 = function(stuff) {

    const relative = /(?:"|')(?:[\w]{2,10}:(?:[\\\/]|[%]+(?:25)?2[fF])+[\w\d\*\_\-\.\:]+)?(?:(?:[\.\w\d\_\-\:]+)?(?:(?:(?:[\\\/]|[%]+(?:25)?2[fF])+)(?!(?:(?:<(?:[\w\s]+[\\\/]+)|(?:[\\\/]+[\w\s]))>))(?:[\.\w\+\d\_\-\:]+)))+(?:(?:(?:[\.\w\+\d\_\-\:]+)?(?:\?|[%]+(?:25)?3[Ff]))(?:[\w\d\-\_\;{}\(\)\[\]]+(?:(?:\=|[%]+(?:25)?3[dD])(?:[^&,\s]+(?:\&)?)?)?){1,})?(?:"|')/gmi;
    console.log("Regex path or link v3");
    var matches = new Array();
    for (match of stuff.matchAll(relative)){
        matches.push(match[0]);
    }
    
    var x = Array.from(new Set(matches));
    return sanitize(x)

}
var find_paths_v3_no_quotes = function(stuff) {

    const relative = /(?:[\w]{2,10}:(?:[\\\/]|[%]+(?:25)?2[fF])+[\w\d\*\_\-\.\:]+)?(?:(?:[\.\w\d\_\-\:]+)?(?:(?:(?:[\\\/]|[%]+(?:25)?2[fF])+)(?!(?:(?:<(?:[\w\s]+[\\\/]+)|(?:[\\\/]+[\w\s]))>))(?:[\.\w\+\d\_\-\:]+)))+(?:(?:(?:[\.\w\+\d\_\-\:]+)?(?:\?|[%]+(?:25)?3[Ff]))(?:[\w\d\-\_\;{}\(\)\[\]]+(?:(?:\=|[%]+(?:25)?3[dD])(?:[^&,\s]+(?:\&)?)?)?){1,})?/gmi;
    console.log("Regex path or link v3 no quotes");
    var matches = new Array();
    for (match of stuff.matchAll(relative)){
        matches.push(match[0]);
    }
    
    var x = Array.from(new Set(matches));
    return sanitize(x)

}

var find_jslinkfinder = function(stuff) {

    const regex_links = /(?:"|')(((?:[a-zA-Z]{1,10}:\/\/|\/\/)[^"'\/]{1,}\.[a-zA-Z]{2,}[^"']{0,})|((?:\/|\.\.\/|\.\/)[^"'><,;| *()(%%$^\/\\\[\]][^"'><,;|()]{1,})|([a-zA-Z0-9_\-\/]{1,}\/[a-zA-Z0-9_\-\/]{1,}\.(?:[a-zA-Z]{1,4}|action)(?:[\?|\/][^"|']{0,}|))|([a-zA-Z0-9_\-]{1,}\.(?:php|asp|aspx|jsp|json|action|html|js|txt|xml)(?:\?[^"|']{0,}|)))(?:"|')/gm
    console.log("Regex jslinkfinder");
    var x = Array.from(new Set(stuff.match(regex_links)));
    return sanitize(x);
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log("Command "+request.command+" Recieved");

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
    var c = [];
    var html_page = document.documentElement.innerHTML;

    const choose_regex = (stuff) => {
        if(request.command === "find_links_v2"){
            return find_links_v2(stuff);
        }
        else if(request.command === "find_paths_v3"){
            return find_paths_v3(stuff);
        }
        else if(request.command === "find_paths_v3_no_quotes"){
            return find_paths_v3_no_quotes(stuff);
        }
        else if(request.command === "jslinkfinder"){
            return find_jslinkfinder(stuff);
        }
    }
    // adding links from html source code
    c = c.concat(choose_regex(html_page));

    // adding links from js sources
    for (var i = 0; i < scripts.length; i++){

        c = c.concat(choose_regex(printScriptTextContent(scripts[i])));

    }
    // filter empty values
    var temp = [];
    for (let i of c)
        (i && i.length > 0) && temp.push(i);
    // removing duplicates
    c = Array.from(new Set(temp));

    var text_window = "";
    if (request.mode == "window"){
        console.log("Mode window");

        for (var i =0; i<c.length; i++){
            text_window+=c[i]+"\n";
        }
        chrome.runtime.sendMessage({
            action: 'newWindow',
            value: text_window
        });


    }
    else if (request.mode == "clip") {
        console.log("Mode clipboard");
        for (var i =0; i<c.length; i++){
            text_window+=c[i]+"\n";
        }

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
