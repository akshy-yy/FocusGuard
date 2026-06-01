chrome.storage.local.get(
    ["blockedSites"],
    result=>{

        const sites = result.blockedSites || [];

        const activeSite =
        sites.find(
            site =>
            site.active
        );

        if(!activeSite)
            return;

        const timer = document.getElementById("blockedTimer");

        const interval = setInterval(()=>{
            const remaining = activeSite.expiryTime - Date.now();
            if(remaining <= 0){
                clearInterval(
                    interval
                );

                activeSite.active = false;
                chrome.storage.local.set({
                    blockedSites:sites
                });

                if(activeSite.blockedUrl){
                    window.location.href =
                    activeSite.blockedUrl;
                }
                return;
            }

            const hrs = Math.floor(remaining/3600000);
            const mins = Math.floor((remaining%3600000)/60000);
            const secs = Math.floor((remaining%60000)/1000);
            timer.textContent = `${hrs}h ${mins}m ${secs}s`;
        },1000);
    });