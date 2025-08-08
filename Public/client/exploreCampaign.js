const placeholderElement = document.getElementById('dynamic-placeholder');
const searchContainer = document.querySelector('.search-container');
const searchInput = document.getElementById('search-input');
const clearButton = document.getElementById('clearSearch');
const resultsContainer = document.getElementById('results'); // Container for results
const userDropdown = document.querySelector(".user-dropdown");
const dropdown = document.querySelector(".dropdown");
const dropdownBtn = document.querySelector('.dropdown-btn');
const dropdownContent = document.querySelector('.dropdown-content');

const menuButton = document.getElementById("menu-button")
const hamburgerIcon = document.querySelectorAll(".hamburger-icon")
const sliderOption = document.querySelectorAll(".slider-option")
let currentIndex = 0;

let user = sessionStorage.getItem("authUser")

document.querySelector(".hamburger").addEventListener("click", () => {
    document.querySelector(".nav-links").classList.toggle("active");
});

window.addEventListener("DOMContentLoaded", async(e)=>{
    console.log(user)
    
    if(user != null  && user != undefined  && user != ""){
        const shortName = user.split(" ")
        if(window.innerWidth <= 768){
            hamburgerIcon.forEach(icon=>{
                icon.style.display = "none"
            })
            sliderOption.forEach(option=>{
                option.style.display = "block"
            })
            console.log(hamburgerIcon)
            menuButton.style.display="inline-block"
            if(shortName.length == 1) {
                menuButton.innerText = shortName[0][0] 
            }
            else{
                console.log(shortName[0][0] + shortName[1][0])
                menuButton.innerText = `${shortName[0][0] + shortName[1][0]}` 
            }
        }
        else{  
            userDropdown.style.display = "none";
            dropdown.style.display = "inline-block";
            dropdownBtn.innerText= `${user} ▼`
        }
    }
    else{
        if(window.innerWidth > 768){
            
            dropdownBtn.style.display="none"
            userDropdown.style.display= "block"
        }
    }

    let combinedArr = sessionStorage.getItem("searchCampaign")
    const combinedData = JSON.parse(combinedArr)
    console.log(combinedData)
    hamburgerMenuForMobile()
})



function hamburgerMenuForMobile(){
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const sliderMenu = document.getElementById('sliderMenu');
    const closeBtn = document.getElementById('closeBtn');
    
    // Open slider menu when hamburger is clicked
    hamburgerMenu.addEventListener('click', function() {
        sliderMenu.classList.add('active');
        hamburgerMenu.style.display = 'none';
    });
    
    // Close slider menu when X is clicked
    closeBtn.addEventListener('click', function() {
        sliderMenu.classList.remove('active');
        // Only show hamburger if screen is mobile size
        if (window.innerWidth <= 768) {
            hamburgerMenu.style.display = 'block';
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 768) {
            // On desktop, ensure slider is closed and hamburger is hidden
            sliderMenu.classList.remove('active');
            hamburgerMenu.style.display = 'none';
        } else {
            // On mobile, show hamburger only if slider is closed
            if (!sliderMenu.classList.contains('active')) {
                hamburgerMenu.style.display = 'block';
            }
        }
    });

}



// Toggle dropdown menu on button click
dropdownBtn.addEventListener('click', () => {
    dropdownContent.classList.toggle('show');
});
    
// Close the dropdown if the user clicks outside of it
window.addEventListener('click', (event) => {
if (!event.target.matches('.dropdown-btn')) {
    if (dropdownContent.classList.contains('show')) {
    dropdownContent.classList.remove('show');
    }
}
});



// Search bar
// Dynamic placeholder text
const placeholderTexts = [
    "Search for food donations",
    "Try clothing for homeless",
    "Looking for school supplies donation?",
    "Find medical fundraisers",
    "Search animal shelter needs",
    "Explore disaster relief funds",
    "Search for children's education funds",
    "Try elderly care donations",
    "Looking for clean water projects?",
    "Find refugee support programs",
    "Search community garden supplies",
    "Explore holiday gift drives",
    "Search for homeless shelter needs",
    "Try women's empowerment NGOs",
    "Looking for environmental charities?",
    "Find mental health organizations",
    "Search veteran support groups",
    "Explore hunger relief programs",
    "Search for disability assistance",
    "Try youth mentorship programs"
];


async function handleSearch(event){
    try {
        const searchValue = document.getElementById("search-input").value.toLowerCase();
        
        if (searchValue.length === 0) {
            resultsContainer.innerHTML = ''; // Clear results if search is empty
            return;
        }
        
        if (searchInput.value.length > 0) {
            clearButton.style.display = 'block';
            resultsContainer.style.display = "block";
        } else {
            clearButton.style.display = 'none';
            resultsContainer.style.display = "none";
        }

        const data = JSON.parse(sessionStorage.getItem("searchCampaign"));

        const filteredCampaigns = data.filter(campaign => {
            return (
            campaign.nameOfBeneficiary.toLowerCase().includes(searchValue) ||
            campaign.campaignTitle.toLowerCase().includes(searchValue) ||
            campaign.campaignDescription.toLowerCase().includes(searchValue)
            );
        });

        console.log(filteredCampaigns)
        displayResults(filteredCampaigns);

    } catch (error) {
        console.log(error)
    }
    
   
}

searchInput.addEventListener("input", handleSearch);


clearButton.addEventListener('click', function() {
    searchInput.value = '';
    this.style.display = 'none';
    resultsContainer.style.display = "none";
    searchInput.focus();
})

document.addEventListener('click', function(e) {
    // Check if click is outside the search container
    if (!searchContainer.contains(e.target)) {
        searchInput.value = '';
        clearButton.style.display = 'none';
        resultsContainer.style.display = "none";
    }
});


function updatePlaceholder() {
    placeholderElement.textContent = placeholderTexts[currentIndex];
    currentIndex = (currentIndex + 1) % placeholderTexts.length;
    
    // Reset animation
    placeholderElement.style.animation = 'none';
    void placeholderElement.offsetWidth; // Trigger reflow
    placeholderElement.style.animation = 'placeholderFade 2s infinite';
}

// Initial update
updatePlaceholder();

// Update every 2 seconds
setInterval(updatePlaceholder, 2000);

// Handle focus/blur
searchInput.addEventListener('focus', () => {
    placeholderElement.style.display = 'none';
});

searchInput.addEventListener('blur', () => {
    if (!searchInput.value) {
        placeholderElement.style.display = 'block';
    }
});

// 6. Helper function to truncate long descriptions
function truncateDescription(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
}


// 5. Function to display results
function displayResults(campaigns) {
    if (campaigns.length === 0) {
      resultsContainer.innerHTML = '<li class="no-results">No matching campaigns found</li>';
      return;
    }
    
    resultsContainer.innerHTML = campaigns.map(campaign => `
        <li class="campaign-item">
          <div class="campaign-image-container">
            <img src="${campaign.campaignImgLink}" 
                 alt="${campaign.campaignTitle}" 
                 class="campaign-search-img">
          </div>
          <div class="campaign-content">
            <h3>${campaign.campaignTitle}</h3>
            <p class="beneficiary">By ${campaign.nameOfBeneficiary}</p>
            <div class="description">${truncateDescription(campaign.campaignDescription, 200)}</div>
            <button class="campaign-button" campaign-id="${campaign.campaignUniqueId}">Donate Now</button>
          </div>
        </li>
      `).join('');


      document.querySelectorAll('.campaign-button').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const campaignId = e.target.getAttribute('campaign-id')
            console.log("first1", campaignId, campaigns)
            const currentCampaign = campaigns.find(c => c.campaignUniqueId === campaignId);
            console.log(currentCampaign)
            getCampaignDescription(campaignId, currentCampaign);
        });
    });
}


async function getCampaignDescription(campaignId, campaign){
    console.log("abcd", campaignId, campaign)
    localStorage.setItem("openCampaignId", campaignId)
    localStorage.setItem("openCampaignData", JSON.stringify(campaign))
    window.location.href="./Campaign_Description"
}
