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
    Number(durationSelect.value);

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

            sites.forEach(
                (site,index) => {

                const li =
                document.createElement("li");

                const deleteBtn =
                document.createElement("button");

                deleteBtn.textContent =
                "Delete";

                deleteBtn.onclick =
                () => {

                    sites.splice(
                        index,
                        1
                    );

                    chrome.storage.local.set({
                        blockedSites: sites
                    });

                    loadSites();

                };

                li.textContent =
                site.website;

                li.appendChild(
                    deleteBtn
                );

                websiteList.appendChild(
                    li
                );

            });

        }
    );

}