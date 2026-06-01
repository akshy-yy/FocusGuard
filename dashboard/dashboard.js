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

                const websiteText =
                document.createElement("span");

                websiteText.textContent =
                site.website;

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

                wrapper.appendChild(toggle);

                wrapper.appendChild(slider);

                card.appendChild(
                    websiteText
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