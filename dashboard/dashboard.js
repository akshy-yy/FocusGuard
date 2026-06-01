const websiteInput = document.getElementById("website");
const durationSelect = document.getElementById("duration");
const addBtn = document.getElementById("addBtn");
const websiteList = document.getElementById("websiteList");
const modalOverlay = document.getElementById("modalOverlay");
const modalMinutes = document.getElementById("modalMinutes");
const confirmModal = document.getElementById("confirmModal");
const cancelModal = document.getElementById("cancelModal");

let currentToggleIndex = null;

loadSites();

addBtn.addEventListener("click", addSite);

function addSite(){

    const website = websiteInput.value.trim();

    if(!website)
        return;

    const duration = Number(document.getElementById("minutes").value);

    const expiryTime = Date.now() + duration * 60 * 1000;

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

                const card = document.createElement("div");
                card.className = "website-card";
                
                const leftSide = document.createElement("div");
                leftSide.className = "website-info";

                const logo = document.createElement("img");
                logo.src = `https://www.google.com/s2/favicons?domain=${site.website}&sz=64`;
                logo.className = "site-logo";

                const websiteName = document.createElement("span");
                
                const timer= document.createElement("div");
                timer.className= "countdown";

                websiteName.className = "website-name";
                const formattedName = site.website.replace("www.","").replace(".com","").replace(".in","");
                websiteName.textContent= formattedName.charAt(0).toUpperCase()+formattedName.slice(1);

                leftSide.appendChild(
                    logo
                );

                leftSide.appendChild(
                    websiteName
                );

                leftSide.appendChild(
                    timer
                );

                const toggle =
                document.createElement("input");

                toggle.type =
                "checkbox";

                toggle.checked =
                site.active;

                toggle.onchange = ()=>{

                    if(toggle.checked){

                        currentToggleIndex = index;
                        modalOverlay.classList.remove("hidden");
                        toggle.checked = false;

                        if(!minutes){
                            toggle.checked =
                            false;
                            return;
                        }

                        sites[index].active = true;

                        sites[index].expiryTime = Date.now() + Number(minutes) *60 *1000;

                    }

                    else{

                        sites[index].active = false;

                    }

                    chrome.storage.local.set({
                        blockedSites:sites
                    });

                };

                if(site.active){

                    const remaining =
                    site.expiryTime -
                    Date.now();

                    if(remaining > 0){

                        const mins =
                        Math.floor(
                            remaining / 60000
                        );

                        const secs =
                        Math.floor(
                            (remaining % 60000)
                            /1000
                        );

                        updateCountdown(timer, site, toggle);

                    }

                }

                const wrapper = document.createElement("label");

                wrapper.className = "switch";

                const slider = document.createElement("span");

                slider.className = "slider";

                wrapper.appendChild(
                    toggle
                );

                wrapper.appendChild(
                    slider
                );

                const deleteBtn = document.createElement("button");
                deleteBtn.className = "delete-btn";

                const deleteIcon = document.createElement("img");
                deleteIcon.src = "../assets/delete.png";

                deleteIcon.className = "delete-icon";
                deleteBtn.appendChild(
                    deleteIcon
                );

                deleteBtn.onclick =()=>{sites.splice(index, 1);

                    chrome.storage.local.set(
                        {
                            blockedSites:sites
                        },
                        ()=>{
                            loadSites();
                        }
                    );

                };

                const controls = document.createElement("div");
                controls.className = "controls";

                controls.appendChild(
                    wrapper
                );

                controls.appendChild(
                    deleteBtn
                );

                card.appendChild(
                    leftSide
                );

                card.appendChild(
                    controls
                );

                websiteList.appendChild(
                    card
                );

            });

        }
    );

}

confirmModal.onclick = ()=>{

    const minutes = Number(modalMinutes.value);

    if(!minutes || currentToggleIndex === null)
        return;

    chrome.storage.local.get(
        ["blockedSites"],
        result=>{
            const sites = result.blockedSites || [];
            sites[currentToggleIndex].active = true;
            sites[currentToggleIndex].expiryTime = Date.now() + minutes *60 * 1000;
            chrome.storage.local.set({
                blockedSites:sites
            },()=>{

                modalOverlay.classList.add(
                    "hidden"
                );

                modalMinutes.value = "";

                currentToggleIndex = null;

                loadSites();

            });

        }
    );

};

cancelModal.onclick = ()=>{

    modalOverlay.classList.add(
        "hidden"
    );

    modalMinutes.value = "";

    currentToggleIndex = null;

};

setInterval(()=>{

    chrome.storage.local.get(["blockedSites"],result=>{

            const sites = result.blockedSites || [];
            let changed = false;

            sites.forEach(site=>{
                if(site.active && Date.now() > site.expiryTime){
                    site.active = false;
                    changed = true;
                }
            });

            if(changed){
                chrome.storage.local.set({
                    blockedSites:sites
                });
                loadSites();
            }
        });
},1000);

function updateCountdown(timerElement, site, toggle){
    const interval = setInterval(()=>{
        const remaining = site.expiryTime -Date.now();
        if(remaining <= 0){
            clearInterval(interval);
            timerElement.textContent = "Not blocked";
            toggle.checked = false;
            site.active = false;
            loadSites();

            chrome.storage.local.get(
                ["blockedSites"],
                result=>{

                    const sites =
                    result.blockedSites || [];

                    chrome.storage.local.set({
                        blockedSites:sites
                    });

                });

            return;
        }

        const hrs = Math.floor(remaining/3600000);
        const mins = Math.floor((remaining%3600000)/60000);
        const secs = Math.floor((remaining%60000)/1000);
        timerElement.textContent = `${hrs}h ${mins}m ${secs}s`;

    },1000);
}