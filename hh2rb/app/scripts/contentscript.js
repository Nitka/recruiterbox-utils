'use strict';

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.debug(request);

    if (request.type && (request.type == "getDOM")) {
        sendResponse(document.all[0].outerHTML);
    }
});
