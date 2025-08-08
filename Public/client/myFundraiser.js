const dropdownBtn = document.querySelector('.dropdown-btn');
const dropdownContent = document.querySelector('.dropdown-content');
const dropdown = document.querySelector(".dropdown");
const userDropdown = document.querySelector(".user-dropdown");
const campaignsWrapper = document.getElementById("campaigns-wrapper")
const dotsContainer = document.querySelector('.carousel-dots');
const menuButton = document.getElementById("menu-button")
const hamburgerIcon = document.querySelectorAll(".hamburger-icon")
const sliderOption = document.querySelectorAll(".slider-option")
const viewAllBtn = document.getElementById('viewAllBtn');
const campaignDetailsContainer = document.getElementById('campaignDetailsContainer');
const closeIcon = document.getElementById('closeIcon');
const closeBtn = document.getElementById('closeBtn');
const totalDonation = document.getElementById("total-donation");
const totalDonors = document.getElementById("total-donors")



// Call the function

let user = sessionStorage.getItem("authUser")
let authData = JSON.parse(localStorage.getItem("authorizationData"))
console.log(authData[0].email)
window.addEventListener("DOMContentLoaded", async ()=>{
     
    const myCampaign = await axios.get(`http://localhost:7000/campaign/getMyCampaigns/${authData[0].email}`)
    console.log(myCampaign.data)
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

    totalDonation.textContent = `₹${myCampaign.data.totalAmountOfFundraiser}`
    totalDonors.textContent = `${myCampaign.data.totalDonors}`
    hamburgerMenuForMobile()
    createCampaignCards(myCampaign.data.fundraiser, '.campaigns-wrapper');

})




// Toggle Mobile Menu
document.querySelector(".hamburger").addEventListener("click", () => {
document.querySelector(".nav-links").classList.toggle("active");
});


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


// Open Campaign Details Container
viewAllBtn.addEventListener('click', () => {
campaignDetailsContainer.classList.add('active');
});

// Close Campaign Details Container
closeIcon.addEventListener('click', () => {
campaignDetailsContainer.classList.remove('active');
});

closeBtn.addEventListener('click', () => {
campaignDetailsContainer.classList.remove('active');
});

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
    console.log(window.innerWidth);
    hamburgerMenu.style.display = 'block';
}
});

// Handle window resize
window.addEventListener('resize', function() {
if (window.innerWidth > 768) {
    // On desktop, ensure slider is closed and hamburger is hidden
    sliderMenu.classList.remove('active');
    hamburgerMenu.style.display = 'none';
    menuButton.style.display="none"

} else {
    // On mobile, show hamburger only if slider is closed
    if (!sliderMenu.classList.contains('active')) {
        if(user != null  && user != undefined  && user != ""){
            const shortName = user.split(" ")
            menuButton.style.display="inline-block"
            if(shortName.length == 1) {
                menuButton.innerText = shortName[0][0] 
            }
            else{
                console.log(shortName[0][0] + shortName[1][0])
                menuButton.innerText = `${shortName[0][0] + shortName[1][0]}` 
            }
        }
        hamburgerMenu.style.display = 'block';
        
    }
}
});

}


function createCampaignCards(campaignsData, containerSelector) {
    const container = document.querySelector(containerSelector);
    
    if (!container) {
        console.error(`Container with selector '${containerSelector}' not found`);
        return;
    }
    
    campaignsData.forEach(campaign => {
        // Create the main campaign card div
        const campaignCard = document.createElement('div');
        campaignCard.className = 'campaign-card';
        
        // Create image element
        const img = document.createElement('img');
        img.className = 'campaign-img';
        img.src = campaign.campaignImgLink || 'https://via.placeholder.com/300x180?text=No+Image';
        img.alt = 'Campaign';
        campaignCard.appendChild(img);
        
        // Create campaign details div
        const detailsDiv = document.createElement('div');
        detailsDiv.className = 'campaign-details';
        
        // Create title
        const title = document.createElement('p');
        title.className = 'campaign-title';
        title.title = campaign.campaignTitle;
        title.textContent = campaign.campaignTitle;
        detailsDiv.appendChild(title);
        
        // Create goal amount wrapper
        const amountWrapper = document.createElement('div');
        amountWrapper.className = 'amount-wrapper';
        
        const goalLabel = document.createElement('label');
        goalLabel.className = 'amount-label';
        goalLabel.textContent = 'Goal:';
        
        const goalAmount = document.createElement('p');
        goalAmount.className = 'amount';
        goalAmount.textContent = `₹${campaign.campaignGoalAmount}`;
        
        amountWrapper.appendChild(goalLabel);
        amountWrapper.appendChild(goalAmount);
        detailsDiv.appendChild(amountWrapper);
        
        // Create raised amount
        const raisedAmount = document.createElement('p');
        raisedAmount.className = 'amount';
        raisedAmount.textContent = `₹${campaign.amountRaised || 0} raised`;
        detailsDiv.appendChild(raisedAmount);
        
        // Create progress bar
        const progressBar = document.createElement('div');
        progressBar.className = 'progress-bar';
        
        const progress = document.createElement('div');
        progress.className = 'progress';
        
        // Calculate progress percentage (avoid division by zero)
        const percentage = campaign.campaignGoalAmount > 0 
            ? Math.min(100, (campaign.amountRaised || 0) / campaign.campaignGoalAmount * 100) 
            : 0;
        progress.style.width = `${percentage}%`;
        
        progressBar.appendChild(progress);
        detailsDiv.appendChild(progressBar);
        
        // Create donors count
        const donorsCount = document.createElement('p');
        donorsCount.className = 'amount';
        donorsCount.textContent = `${campaign.backerCount || 0} donors`;
        detailsDiv.appendChild(donorsCount);
        
        campaignCard.appendChild(detailsDiv);
        
        // Create KYC alert div if needed
        if (campaign.status) {
            const kycAlert = document.createElement('div');
            kycAlert.className = `kyc-alert ${campaign.status === 'rejected' ? 'rejected' : ''}`;
            
            const kycMessage = document.createElement('p');
            kycMessage.textContent = campaign.status === 'rejected' 
                ? 'Campaign content is rejected.' 
                : 'Complete your KYC to continue fundraise or withdraw fund.';
            kycAlert.appendChild(kycMessage);
            
            if (campaign.status !== 'rejected') {
                const kycLinks = document.createElement('div');
                kycLinks.className = 'kyc-links';
                
                const completeLink = document.createElement('a');
                completeLink.href = '#';
                completeLink.className = 'kyc-link';
                completeLink.textContent = 'Complete Now';
                
                const editLink = document.createElement('a');
                editLink.href = '#';
                editLink.className = 'kyc-link';
                editLink.textContent = 'Edit';
                
                kycLinks.appendChild(completeLink);
                kycLinks.appendChild(editLink);
                kycAlert.appendChild(kycLinks);
            }
            
            campaignCard.appendChild(kycAlert);
        }
        
        // Append the complete card to the container
        container.appendChild(campaignCard);
    });
}