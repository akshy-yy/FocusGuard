const params = new URLSearchParams(window.location.search);
const blockedWebsite = params.get("site");

const formattedName = blockedWebsite.replace("www.","").replace(".com","").replace(".in","");
const displayName = formattedName.charAt(0).toUpperCase()+ formattedName.slice(1);
document.getElementById("siteName").textContent = displayName;

const timer = document.getElementById("blockedTimer");

chrome.storage.local.get(["blockedSites"],result => {

        const sites = result.blockedSites || [];
        const site = sites.find(s => s.website === blockedWebsite);

        if(!site)
            return;

        const interval = setInterval(()=>{

            const remaining = site.expiryTime -Date.now();
            if(remaining <= 0){
                clearInterval(
                    interval
                );
                site.active = false;

                chrome.storage.local.set({
                    blockedSites: sites
                });

                if(site.blockedUrl){
                    window.location.href = site.blockedUrl;
                }
                return;
            }

            const hrs = Math.floor(remaining / 3600000);
            const mins = Math.floor((remaining % 3600000)/ 60000);
            const secs = Math.floor((remaining % 60000)/ 1000);

            timer.textContent = `${hrs}h ${mins}m ${secs}s`;
        },1000);
    }
);