
const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const placeholderElement = document.getElementById('dynamic-placeholder');
const searchContainer = document.querySelector('.search-container');
const searchInput = document.getElementById('search-input');
const clearButton = document.getElementById('clearSearch');
const resultsContainer = document.getElementById('results'); // Container for results
const dropdownBtn = document.querySelector('.dropdown-btn');
const dropdownContent = document.querySelector('.dropdown-content');
const dropdown = document.querySelector(".dropdown");
const userDropdown = document.querySelector(".user-dropdown");
const dotsContainer = document.querySelector('.carousel-dots');
const menuButton = document.getElementById("menu-button")
const hamburgerIcon = document.querySelectorAll(".hamburger-icon")
const sliderOption = document.querySelectorAll(".slider-option")
let currentIndex = 0;
let index = 0;
let page = 0
let index1 = 0;
let user = sessionStorage.getItem("authUser")

window.addEventListener("DOMContentLoaded", async (event)=>{
    page = 1
    
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
    hamburgerMenuForMobile()
    renderSlides()
    renderTicker()
    renderTestimonials();
    const response = await axios.get(`http://localhost:7000/campaign/getCampaigns/${page}`);
    console.log("responseDom", response)
    console.log(page)
    createAndAppendCampaigns(response.data.campaignData)
    console.log(user)

    // search all campaign

    const allCampaigns = await axios.get("http://localhost:7000/campaign/searchAllCampaign")
    // const allDataArr = combinedProductAndCampaignData(allCampaigns)
    sessionStorage.setItem("searchCampaign", JSON.stringify(allCampaigns.data.campaignData))

    console.log(allCampaigns)
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


document.querySelector(".hamburger").addEventListener("click", () => {
    document.querySelector(".nav-links").classList.toggle("active");
});


// dropdown 



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


// slider



// window.addEventListener("DOMContentLoaded", async (e)=>{
    // page = 1
    // const response = await axios.get(`http://localhost:7000/campaign/getCampaigns/${page}`);


// })

function updateCarousel() {
    track.style.transform = `translateX(-${index * 100}%)`;
}

function nextSlide() {
    index = (index + 1) % slides.length;
    updateCarousel();
}

nextButton.addEventListener('click', nextSlide);

prevButton.addEventListener('click', () => {
    index = (index - 1 + slides.length) % slides.length;
    updateCarousel();
});

setInterval(nextSlide, 3000); // Auto-slide every 3 seconds



        // Promo campaigns Below

        const promoCampaigns = [
    {
        title: "Save the Rainforest",
        description: "Help preserve 1000 acres of Amazon rainforest. Every donation plants 10 trees.",
        image: "https://cimg.acharyaprashant.org/images/img-f8a568a7-d420-4436-877b-3b266531fa9b/30/image.jpg"
    },
    {
        title: "Clean Water Initiative",
        description: "Providing clean water to 50 villages in Africa. Goal: 10,000 water filters.",
        image: "https://cimg.acharyaprashant.org/images/img-f07de5cb-84db-4b24-a6ed-cf2a6c8b3a7b/30/image.jpg"
    },
    {
        title: "Education for All",
        description: "Supporting 500 children's education in rural India. 300 kids already enrolled!",
        image: "https://cimg.acharyaprashant.org/images/img-ddb2694d-cf2f-4833-9c42-158bc8e41dda/30/image.jpg"
    },
    {
        title: "Wildlife Protection",
        description: "Rescuing endangered species. Join our mission to save 1000 animals this year.",
        image: "https://cimg.acharyaprashant.org/images/img-ba06d85c-88c6-4447-80d9-2ca6b58ef011/30/image.jpg"
    }
];

const carouselTrack = document.querySelector('.promo-carousel-track');

function renderSlides() {
    carouselTrack.innerHTML = '';
    promoCampaigns.forEach(campaign => {
        const slide = document.createElement('div');
        slide.className = 'promo-slide';
        slide.innerHTML = `
            <img src="${campaign.image}" alt="${campaign.title}" class="promo-image">
            <div class="promo-content">
                <h3 class="promo-title">${campaign.title}</h3>
                <p class="promo-description">${campaign.description}</p>
            </div>
             <div class="promo-content">
                <h3 class="promo-title">${campaign.title}</h3>
                <p class="promo-description">${campaign.description}</p>
            </div>
             <div class="promo-content">
                <h3 class="promo-title">${campaign.title}</h3>
                <p class="promo-description">${campaign.description}</p>
            </div>
        `;
        carouselTrack.appendChild(slide);
    });
}
        


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
        console.log("first233", searchValue)
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

        console.log("filteredCampaigns", filteredCampaigns)
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


// 5. Function to display results
function displayResults(campaigns) {
    console.log("c", campaigns)
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
            console.log("campi", currentCampaign, campaigns)
            getCampaignDescription(campaignId, currentCampaign);
        });
    });
}

// 6. Helper function to truncate long descriptions
function truncateDescription(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
}
  
// document.addEventListener('click', (e) => {
//     const resultsList = document.getElementById('results');
//     if (!e.target.closest('.search-container')) {
//         searchInput.value=""
//       resultsList.style.display = "none";
//     }
// });

// campaign ticker
const tickerCampaign = [
    {
        title: "Rainforest Rescue",
        description: "Save 1000 acres of Amazon. Donate now!",
        image: "https://thumbs.dreamstime.com/z/kid-creativity-education-concept-child-learning-art-mathematics-formula-school-boy-ideas-black-chalk-board-57852601.jpg?ct=jpeg"
    },
    {
        title: "Clean Water",
        description: "10,000 filters for African villages.",
        image: "https://thumbs.dreamstime.com/b/source-spring-water-woman-drinking-17169893.jpg?w=992"
    },
    {
        title: "Education Fund",
        description: "Support 500 kids in rural India.",
        image: "https://thumbs.dreamstime.com/z/kid-creativity-education-concept-child-learning-art-mathematics-formula-school-boy-ideas-black-chalk-board-57852601.jpg?ct=jpeg"
    },
    {
        title: "Wildlife Protect",
        description: "Rescue endangered species today.",
        image: "https://thumbs.dreamstime.com/b/enigmatic-mysterious-rainforests-central-america-guatema-guatemala-32665564.jpg?w=992"    }
];

const tickerTrack = document.querySelector('.campaign-ticker-track');
function renderTicker() {
    tickerTrack.innerHTML = '';
    tickerCampaign.forEach(campaign => {
        const slide = document.createElement('div');
        slide.className = 'campaign-ticker-slide';
        slide.innerHTML = `
            <img src="${campaign.image}" alt="${campaign.title}" class="campaign-ticker-image">
           <div class="campaign-ticker-content">
                <h4 class="campaign-ticker-title">${campaign.title}</h4>
                <p class="campaign-ticker-description">${campaign.description}</p>
            </div>
        `;
        tickerTrack.appendChild(slide);
    });
}


// testimonials

const testimonials = [
    {
        name: "Shanti Mohan",
        role: "Founder, LetsVenture",
        image: "https://www.donatekart.com/_next/static/images/shanti-mohan-610f37ffd471924f8d273058f5d3f2f8.jpg",
        text: "What struck me most about this venture is the passion and commitment of the founders to make the process of giving easy.",
        companyLogo: "https://letsventure.com/static/images/logo.svg"
    },
    {
        name: "Vijay Shekhar Sharma",
        role: "Founder, Paytm",
        image: "https://www.donatekart.com/_next/static/images/vijay-sekhar-sharma-900048ee44bbbf993de82e60202c43ed.jpg",
        text: "Anyone who donates often thinks about whether they're actually making a difference. This is why Donatekart is an incredible idea.",
        companyLogo: "https://pwebassets.paytm.com/commonwebassets/paytmweb/header/images/logo.svg"
    },
    {
        name: "Yuvraj Singh",
        role: "Former Indian Cricketer",
        image: "https://www.donatekart.com/_next/static/images/yuvraj-singh-96bd4e92e7cfe9c5c2be08dae20d7f3e.jpg",
        text: "Donatekart is a unique platform where you can be assured that the products you donate are delivered responsibly to NGOs.",
        companyLogo: "https://www.youwecan.org/images/logo.png"
    },
    {
        name: "Elon Musk",
        role: "CEO, Tesla & SpaceX",
        image: "https://assets-us-01.kc-usercontent.com/5cb25086-82d2-4c89-94f0-8450813a0fd3/0c3fcefb-bc28-4af6-985e-0c3b499ae832/Elon_Musk_Royal_Society.jpg",
        text: "A brilliant initiative that utilizes technology to make a real impact in the world. Absolutely inspiring!",
        companyLogo: "https://www.tesla.com/sites/all/themes/custom/tesla_theme/assets/img/icons/favicon.ico"
    },
    {
        name: "Sundar Pichai",
        role: "CEO, Google",
        image: "https://ztd-euwest2-prod-s3.s3.eu-west-2.amazonaws.com/sundar_4e29dcb79b.jpg",
        text: "The ability to create such a transparent donation process is what makes this platform so powerful.",
        companyLogo: "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
    },
    {
        name: "Oprah Winfrey",
        role: "Media Mogul & Philanthropist",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTegkV7zH54uMjyo14W96fQgm0cbl4oWlHsiw&s",
        text: "I love seeing innovation in philanthropy. This is exactly what the world needs right now!",
        companyLogo: "https://www.oprah.com/img/oprah-logo-200x200.png"
    }
];

const testimonialsGrid = document.querySelector('.testimonials-grid');
const viewMoreBtn = document.getElementById('viewMoreBtn');
let visibleCount = 3;

function renderTestimonials() {
    testimonialsGrid.innerHTML = '';
    testimonials.slice(0, visibleCount).forEach(testimonial => {
        const card = document.createElement('div');
        card.className = 'testimonial-card';
        card.innerHTML = `
            <div class="testimonial-content">
                <p class="testimonial-text">${testimonial.text}</p>
                <div class="testimonial-author">
                    <img src="${testimonial.image}" alt="${testimonial.name}" class="author-image">
                    <div class="author-info">
                        <h3 class="author-name">${testimonial.name}</h3>
                        <p class="author-role">${testimonial.role}</p>
                    </div>
                    ${testimonial.companyLogo ? `<img src="${testimonial.companyLogo}" alt="Company logo" class="company-logo">` : ''}
                </div>
            </div>
        `;
        testimonialsGrid.appendChild(card);
    });
    
    viewMoreBtn.style.display = visibleCount >= testimonials.length ? 'none' : 'block';
}

viewMoreBtn.addEventListener('click', () => {
    visibleCount = Math.min(visibleCount + 3, testimonials.length);
    renderTestimonials();
    
    // Smooth scroll to the newly loaded testimonials
    setTimeout(() => {
        window.scrollBy({
            top: 400,
            behavior: 'smooth'
        });
    }, 100);
});



// async function showIntialCampaigns(){
//     const response = await axios.get(`http://localhost:7000/campaign/getCampaigns/${++page}`);
//     const combinedArr = combinedProductAndCampaignData(response)
//     createAndAppendCampaigns(combinedArr)

// }

// Function to generate campaign card HTML
function createAndAppendCampaigns(campaigns) {
    const container = document.getElementById("campaignMain");
    const fragment = document.createDocumentFragment();

    const taxBenefitBadge = true 
      ? '<span class="tax-benefit">Tax Benefit</span>' 
      : '';
    
    // Calculate progress percentage (assuming you want to show progress bar)
    

    campaigns.forEach(campaign => {
        const card = document.createElement('div');
        const progressPercentage = Math.min(100, (campaign.amountRaised / campaign.campaignGoalAmount) * 100);
        console.log(progressPercentage)
        card.className = 'campaign-card';
        card.innerHTML = `
            <div class="campaign-image">
                <img src="${campaign.campaignImgLink}" alt="${campaign.campaignTitle}" />
                ${taxBenefitBadge}
            </div>
            <div class="campaign-details">
                <h4 class="campaign-title">${campaign.campaignTitle}</h4>
                <p class="campaign-author">${campaign.nameOfBeneficiary}</p>
                <div class="progress-bar-container">
                    <div class="progress-bar" style="width: ${progressPercentage}%"></div>
                </div>
                <p class="campaign-stats">₹${campaign.amountRaised} Raised - ${campaign.backerCount} Backers</p>
            </div>
            <div class="campaign-actions">
                <button class="share-btn">Share</button>
                <button class="donate-button" data-id="${campaign.campaignUniqueId}">Donate Now</button>
            </div>`;         
         
        fragment.appendChild(card);
    });

     container.appendChild(fragment)


    document.querySelectorAll('.donate-button').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const campaignId = e.target.getAttribute('data-id')
            console.log("aaa14", campaignId, campaigns)
            const currentCampaign = campaigns.find(c => c.campaignUniqueId === campaignId);
            console.log("donate", currentCampaign, campaigns)
            getCampaignDescription(campaignId, currentCampaign);
        });
    });
}


  
function combinedProductAndCampaignData(response){
    return response.data.campaignData.map(campaign => {
        // Find the matching products for this campaign
        const products = response.data.uploadProducts.find(
            product => product.campaignUniqueId === campaign.campaignUniqueId
        );
        
        // Return a new object combining campaign data with its products
        return {
            ...campaign,
            products: products ? products.product : [] // Include empty array if no products found
        };
    });
}



async function getCampaignDescription(campaignId, campaign){
    console.log("abcd", campaignId, campaign)
    localStorage.setItem("openCampaignId", campaignId)
    localStorage.setItem("openCampaignData", JSON.stringify(campaign))
    // C:\Users\risha\OneDrive\Pictures\Donate Kart\Public\Campaign_Description.html

    window.location.href = `./Campaign_Description?id=${campaignId}`;
}

async function handleCampaign(event){
    let currPage = ++page
    const response = await axios.get(`http://localhost:7000/campaign/getCampaigns/${currPage}`);
    console.log("responseCampaign", response)
    console.log(currPage)
    createAndAppendCampaigns(response.data.campaignData)

}

const logout = document.getElementById("logout-dropdown")
logout.addEventListener("click", (e)=>{
    sessionStorage.removeItem("authUser")
    window.location.reload(); // Refreshes the current page

})