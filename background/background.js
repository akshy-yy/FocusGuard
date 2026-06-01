chrome.tabs.onUpdated.addListener(

(tabId, changeInfo, tab) => {

    if(changeInfo.status !== "complete")
        return;

    if(!tab.url)
        return;

    checkSite(tab);

}

);

function checkSite(tab){

    chrome.storage.local.get(
        ["blockedSites"],
        result => {

            const sites =
            result.blockedSites || [];

            const now =
            Date.now();

            let hostname = "";

            try{

                hostname =
                new URL(
                    tab.url
                ).hostname;

            }

            catch{

                return;

            }

            const blocked =
            sites.find(site =>

                hostname.includes(site.website)
                &&
                site.active
                &&
                now <site.expiryTime

            );

            if(blocked){

                chrome.tabs.update(
                    tab.id,
                    {
                        url:
                        chrome.runtime.getURL(
                            "blocked/blocked.html"
                        )
                    }
                );

            }

        }
    );

}