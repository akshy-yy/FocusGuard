const websiteInput =
document.getElementById("website");

const durationSelect =
document.getElementById("duration");

const addBtn =
document.getElementById("addBtn");

const websiteList =
document.getElementById("websiteList");

loadSites();

addBtn.addEventListener("click", addSite);

function addSite(){

    const website =
    websiteInput.value.trim();

    if(!website)
        return;

    const duration =
    Number(document.getElementById("minutes").value);

    const expiryTime =
    Date.now() +
    duration * 60 * 1000;

    chrome.storage.local.get(
        ["blockedSites"],
        result => {

            const sites =
            result.blockedSites || [];

            sites.push({
                website,
                active: true,
                expiryTime
            });

            chrome.storage.local.set({
                blockedSites: sites
            }, () => {

                websiteInput.value = "";

                loadSites();

            });

        }
    );

}

function loadSites(){

    chrome.storage.local.get(
        ["blockedSites"],
        result => {

            const sites =
            result.blockedSites || [];

            websiteList.innerHTML = "";

            sites.forEach((site,index)=>{

                const card =
                document.createElement("div");

                card.className =
                "website-card";

                const leftSide =
                document.createElement("div");

                leftSide.className =
                "website-info";

                const logo =
                document.createElement("img");

                logo.src =
                `https://www.google.com/s2/favicons?domain=${site.website}&sz=64`;

                logo.className =
                "site-logo";

                const websiteName =
                document.createElement("span");

                websiteName.className =
                "website-name";

                websiteName.textContent =
                site.website
                    .replace("www.","")
                    .replace(".com","")
                    .replace(".in","");

                leftSide.appendChild(
                    logo
                );

                leftSide.appendChild(
                    websiteName
                );

                const toggle =
                document.createElement("input");

                toggle.type =
                "checkbox";

                toggle.checked =
                site.active;

                toggle.onchange = ()=>{

                    if(toggle.checked){

                        const minutes =
                        prompt(
                            "Block for how many minutes?"
                        );

                        if(!minutes){

                            toggle.checked =
                            false;

                            return;

                        }

                        sites[index].active =
                        true;

                        sites[index].expiryTime =
                        Date.now() +
                        Number(minutes) *
                        60 *
                        1000;

                    }

                    else{

                        sites[index].active =
                        false;

                    }

                    chrome.storage.local.set({
                        blockedSites:sites
                    });

                };

                const wrapper =
                document.createElement("label");

                wrapper.className =
                "switch";

                const slider =
                document.createElement("span");

                slider.className =
                "slider";

                wrapper.appendChild(
                    toggle
                );

                wrapper.appendChild(
                    slider
                );

                card.appendChild(
                    leftSide
                );

                card.appendChild(
                    wrapper
                );

                websiteList.appendChild(
                    card
                );

            });

        }
    );

}