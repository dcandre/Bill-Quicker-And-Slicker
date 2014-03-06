chrome.runtime.onInstalled.addListener(function(object, details) {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        chrome.declarativeContent.onPageChanged.addRules([
            {
                conditions: [
                    new chrome.declarativeContent.PageStateMatcher({
                        pageUrl: { urlEquals: "http://billquick.intouchsol.com/wbFrmMain.aspx", schemes: ["http"] },
                        css: ["#btntime[class~=main]"]
                    })
                ],
                actions: [ new chrome.declarativeContent.ShowPageAction() ]
            } 
        ]);
    });
});
