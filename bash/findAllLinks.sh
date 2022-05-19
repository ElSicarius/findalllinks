#!/bin/bash

visit_link() {
    chromium-browser --incognito --proxy-auto-detect --temp-profile --headless --disable-logging --dump-dom $1 2>/dev/null
}

find_links() {
    grep -Pao "(?:\"|\')([\w]{2,10}:([\\\/]|[%]+(25)?2[fF])+[\w\d\*\_\-\.\:]+)?(((([\\\/]|[%]+(25)?2[fF])+)([\.\w\d\_\-\:]+)((?![\.\w\d\_\-\:]+)(([\\\/]|[%]+(25)?2[fF])+))?)+|(([\.\w\d\_\-\:]+)(([\\\/]|[%]+(25)?2[fF])+)((?!([\\\/]|[%]+(25)?2[fF])+)[\.\w\d\_\-\:]+)?)+)?(\?([\w\d\-\_\;{}\(\)\[\]]+(\=([^&,\s]+(\&)?)?)?){0,})?(?:\"|\')" | sed "s/[\"|']//g"  | sort -uV
}

for url in `visit_link $1 | find_links`; do
    if [[ "$url" == *".js"* ]]; then   
        echo $url
        for url2 in `visit_link $url | find_links`; do
            echo $url2
        done
    else
        echo $url
    fi
done