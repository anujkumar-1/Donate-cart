// Get all the elements we need
const amountButtons = document.querySelectorAll('.amount-btn');
const customAmountInput = document.querySelector('.amount-input');
const currencySelect = document.querySelector('.currency-select');
const donateButton = document.querySelector('.donate-btn'); // You'll need to add this button to your HTML
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const faqQuestions = document.querySelectorAll('.faq-question');
const userDropdown = document.querySelector(".user-dropdown");
const dropdown = document.querySelector(".dropdown");
const dropdownBtn = document.querySelector('.dropdown-btn');
const dropdownContent = document.querySelector('.dropdown-content');

const menuButton = document.getElementById("menu-button")
const hamburgerIcon = document.querySelectorAll(".hamburger-icon")
const sliderOption = document.querySelectorAll(".slider-option")
        
// Default amount (from the active button or input field)
let selectedAmount = 1500; // Default value from your input field
let selectedCurrency = 'INR'; // Default currency

let user = sessionStorage.getItem("authUser")

console.log(user)
// Simulate page loading (replace this with your actual loading logic)
function simulateLoading() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, 3000); // 3 seconds delay for demonstration
    });
  }
  
  // Hide spinner and show content when page is loaded
  async function init() {
    await simulateLoading(); // Replace with your actual loading logic
    
    const spinner = document.getElementById('spinner');
    const content = document.getElementById('container');
    
    // Fade out spinner
    spinner.style.opacity = '0';
    
    // After fade out completes, hide spinner and show content
    setTimeout(() => {
      spinner.style.display = 'none';
      content.style.display = 'block';
    }, 500); // Match this with the CSS transition time
  }
  


  // Start the loading process when page loads

document.addEventListener('DOMContentLoaded', async() =>{
    try {
        
        init()
        const params = new URLSearchParams(window.location.search);
        const uuid = params.get('id');
        console.log(uuid)
        const container = document.getElementById("campaignStory")
        const campaignId = localStorage.getItem("openCampaignId");
        const response = await axios.get(`http://localhost:7000/campaign/findCampaign/${campaignId}`)
        console.log("response", response.data.campaignData)
        container.innerHTML = ``
        createCampaignDescription(response.data.campaignData)
        hamburgerMenuForMobile()
        authUserLoggedIn()
        donateNow()
        
    } catch (error) {
        console.log(error)    
    }
    
});

function authUserLoggedIn(){
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
}


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
        if (window.innerWidth > 768) {
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

function donateNow(){
    const donateButton = document.getElementById('donateButton');
    const donationOptions = document.getElementById('donationOptions');
    const amountOptions = document.querySelectorAll('.amount-option');
    const customAmount = document.getElementById('customAmount');
    const donateAmount = document.getElementById('donateAmount');

    let selectedAmount = 0;
            
    // Toggle donation options
    donateButton.addEventListener('click', function() {
        donationOptions.classList.toggle('active');
        console.log(selectedAmount, "₹")
        // Scroll to bottom when options are shown
        // if (donationOptions.classList.contains('active')) {
        //     window.scrollTo(0, document.body.scrollHeight);
        // }
    });
    
    // Handle predefined amount selection
    amountOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove selected class from all options
            amountOptions.forEach(opt => opt.classList.remove('selected'));
            
            // Add selected class to clicked option
            this.classList.add('selected');
            
            // Get the amount
            selectedAmount = this.getAttribute('data-amount');
            donateAmount.textContent = `₹ ${selectedAmount}`;
            // Clear custom amount if any
            customAmount.value = '';
            
            // Close options after selection (optional)
            // donationOptions.classList.remove('active');
        });
    });

    // Handle custom amount input
    customAmount.addEventListener('input', function() {
        if (this.value) {
            selectedAmount = this.value;
            donateAmount.textContent = `₹ ${selectedAmount}`;
            
            // Remove selection from predefined options
            amountOptions.forEach(opt => opt.classList.remove('selected'));
        }
    });
    
    // Close options when clicking outside (optional)
    document.addEventListener('click', function(event) {
        if (!donateContainer.contains(event.target) && !donateButton.contains(event.target)) {
            donationOptions.classList.remove('active');
        }
    });
    
}

function createCampaignDescription(campaign) {
    console.log("campaign", campaign)
    const container = document.getElementById("campaignStory")
    const campaignStory = document.createElement('div');
    
    // Set campaign title
    const title = document.querySelector('.story-title');
    if (title) {
        title.textContent = campaign.campaignTitle;
    }
    
    // Create image slider
    const sliderContainer = document.createElement('div');
    sliderContainer.className = 'slider-container';
    
    const slider = document.createElement('div');
    slider.className = 'slider';
    
    // Add main campaign image as the only slide
    const slide = document.createElement('div');
    slide.className = 'slide';
    const img = document.createElement('img');
    img.src = campaign.campaignImgLink;
    img.alt = campaign.campaignTitle;
    img.width = 700;
    slide.appendChild(img);
    slider.appendChild(slide);
    
    // Add slider controls (simplified - would need JS for functionality)
    const sliderControls = document.createElement('div');
    sliderControls.className = 'slider-controls';
    const prevBtn = document.createElement('button');
    prevBtn.className = 'control-btn prev-btn';
    prevBtn.textContent = '❮';
    prevBtn.onclick = () => prevSlide();
    const nextBtn = document.createElement('button');
    nextBtn.className = 'control-btn next-btn';
    nextBtn.textContent = '❯';
    nextBtn.onclick = () => nextSlide();
    sliderControls.appendChild(prevBtn);
    sliderControls.appendChild(nextBtn);
    
    // Add single dot (since we only have one image)
    const sliderDots = document.createElement('div');
    sliderDots.className = 'slider-dots';
    const dot = document.createElement('span');
    dot.className = 'dot active';
    dot.onclick = () => goToSlide(0);
    sliderDots.appendChild(dot);
    
    sliderContainer.appendChild(slider);
    sliderContainer.appendChild(sliderControls);
    sliderContainer.appendChild(sliderDots);
    campaignStory.appendChild(sliderContainer);
    
    // Create "Where Your Money Goes" section
    const moneyDropdown = document.createElement('div');
    moneyDropdown.className = 'money-dropdown';
    
    const dropdownHeader = document.createElement('div');
    dropdownHeader.className = 'dropdown-header';
    dropdownHeader.id = 'dropdownHeader';
    dropdownHeader.innerHTML = '<span>Where Your Money Goes</span><span class="dropdown-icon" id="dropIcon">▼</span>';
    
    const dropdownBody = document.createElement('div');
    dropdownBody.className = 'dropdown-body';
    dropdownBody.id = 'dropdownBody';
    
    // Add product heading
    const productHeading = document.createElement('div');
    productHeading.className = 'product-heading';
    productHeading.innerHTML = `
        <div class="product-name">Material</div>
        <div class="product-quantity">Required Quantity</div>
        <div class="product-price">Price/Unit</div>
    `;
    dropdownBody.appendChild(productHeading);

    // Add products from campaign data
    campaign.productTables[0].product.forEach(product => {
        const productRow = document.createElement('div');
        productRow.className = 'product-row';
        productRow.innerHTML = `
            <div class="product-name">${product.name}</div>
            <div class="product-quantity">${product.quantity}</div>
            <div class="product-price">₹ ${product.price}</div>
        `;
        dropdownBody.appendChild(productRow);
    });

    
    
    // Add view more link
    const viewMore = document.createElement('a');
    viewMore.href = '#';
    viewMore.className = 'view-more';
    viewMore.textContent = 'View More';
    dropdownBody.appendChild(viewMore);
    
    // Add separator
    const separator = document.createElement('div');
    separator.className = 'separator';
    dropdownBody.appendChild(separator);
    
    // Add payment charges (placeholder)
    const chargesRow = document.createElement('div');
    chargesRow.className = 'charges-row';
    chargesRow.innerHTML = `
        <div class="charges-label">Payment Gateway Charges</div>
        <div class="charges-amount">₹ ${Math.round(campaign.campaignGoalAmount * 0.02).toLocaleString()}</div>
    `;
    dropdownBody.appendChild(chargesRow);
    
    // Add dropdown footer with total
    const dropdownFooter = document.createElement('div');
    dropdownFooter.className = 'dropdown-footer';
    dropdownFooter.innerHTML = `
        <div class="total-wrapper">
            <span>Total Campaign Goal</span>
            <span>₹ ${campaign.campaignGoalAmount.toLocaleString()}</span>
        </div>
    `;
    
    moneyDropdown.appendChild(dropdownHeader);
    moneyDropdown.appendChild(dropdownBody);
    moneyDropdown.appendChild(dropdownFooter);
    campaignStory.appendChild(moneyDropdown);
    
    
    const rawDescription = campaign.campaignDescription;

    const cleanDescription = rawDescription
    .replace(/#{1,3}\s*/g, '')      
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/>\s*/g, '')           
    .replace(/---+/g, '')           
    .replace(/\s{2,}/g, '\n\n');   

    const descriptionContainer = document.createElement('div');
    descriptionContainer.className = 'clean-description';

    cleanDescription.split('\n\n').forEach(paragraph => {
    if (paragraph.trim()) {
        const para = document.createElement('p');
        para.className = 'story-text';
        para.textContent = paragraph.trim();
        descriptionContainer.appendChild(para);
    }
    });

    campaignStory.appendChild(descriptionContainer);

    // Add updates section
    const updatesSection = document.createElement('div');
    updatesSection.className = 'updates-section';
    
    const updatesHeading = document.createElement('h3');
    updatesHeading.className = 'section-heading';
    updatesHeading.textContent = 'Updates';
    updatesSection.appendChild(updatesHeading);
    
    const update = document.createElement('div');
    update.className = 'update';
    
    const updateHeader = document.createElement('div');
    updateHeader.className = 'update-header';
    updateHeader.innerHTML = `<span>Latest Update | ${new Date(campaign.updatedAt).toLocaleDateString()}</span>`;
    
    const updateContent = document.createElement('div');
    updateContent.innerHTML = `
        <p class="story-text">Dear Supporters,</p>
        <p class="story-text">Thank you for your interest in our campaign. We'll be posting updates here as we make progress.</p>
        <p class="story-text">Check back soon for our first update!</p>
        <p class="story-text">Regards,<br>${campaign.nameOfBeneficiary}</p>
    `;
    
    update.appendChild(updateHeader);
    update.appendChild(updateContent);
    updatesSection.appendChild(update);
    
    const askUpdate = document.createElement('div');
    askUpdate.className = 'ask-update';
    askUpdate.innerHTML = `
        <p>Feel free to ask Campaigner for a new update on this Fundraiser.</p>
        <button class="ask-update-btn">Ask for update</button>
    `;
    updatesSection.appendChild(askUpdate);
    
    campaignStory.appendChild(updatesSection);
    container.appendChild(campaignStory);
    
    const whereMyMoneyGoes= document.getElementById("dropdownHeader");
    const dropIcon = document.getElementById("dropIcon");
    whereMyMoneyGoes.addEventListener('click', function() {
        dropdownBody.classList.toggle('active');
        dropIcon.classList.toggle('active');
    });

    const amountRaised=document.getElementById("amountRaised");
    const campaignGoal = document.getElementById("campaignGoal")
    const progressFill = document.querySelector("#progressFill")
    let progressBar = Math.ceil((campaign.amountRaised / campaign.campaignGoalAmount) * 100)
    if(campaign.amountRaised== null){
        const amountRaise=0
        progressFill.style.width = `${progressBar}%`
        amountRaised.textContent = `₹ ${amountRaise} Raised`
        campaignGoal.textContent = `₹ ${campaign.campaignGoalAmount}` 
    }
    else{
        progressFill.style.width = `${progressBar}%`
        amountRaised.textContent = `₹ ${campaign.amountRaised}`
        campaignGoal.textContent = `₹ ${campaign.campaignGoalAmount}` 
    }
    

    return container;
}

// Example usage:
// const campaign = campaigns[0]; // Your campaign object
// const campaignDescription = createCampaignDescription(campaign);
// document.body.appendChild(campaignDescription);

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




// Function to update the donate button text
function updateDonateButton() {
if (donateButton) {
    donateButton.textContent = `Donate ${selectedCurrency} ${selectedAmount.toLocaleString()}`;
}
}

// Handle predefined amount button clicks
amountButtons.forEach(button => {
button.addEventListener('click', function() {
    // Remove active class from all buttons
    amountButtons.forEach(btn => btn.classList.remove('active'));
    
    // Add active class to clicked button
    this.classList.add('active');
    
    // Get amount from button text (handle "Enter Amount" case)
    const buttonText = this.textContent.trim();
    if (buttonText === 'Enter Amount') {
        customAmountInput.focus();
        return;
    }
    
    // Extract amount from button text (remove currency symbol and commas)
    const amount = parseInt(buttonText.replace(/[^0-9]/g, ''));
    
    // Update selected amount and button
    if (!isNaN(amount)) {
        selectedAmount = amount;
        customAmountInput.value = amount;
        updateDonateButton();
    }
});
});

// Handle custom amount input changes
customAmountInput.addEventListener('input', function() {
    const amount = parseInt(this.value) || 0;

    // Remove active class from all buttons (since user is entering custom amount)
    amountButtons.forEach(btn => btn.classList.remove('active'));

    // Update selected amount and button
    selectedAmount = amount;
    updateDonateButton();
});

// Handle currency selection changes
currencySelect.addEventListener('change', function() {
    selectedCurrency = this.value.toUpperCase();
    updateDonateButton();
});

// Initialize the donate button
updateDonateButton();

// Add donate button click handler (you can implement the actual donation logic here)
if (donateButton) {
donateButton.addEventListener('click', function() {
    alert(`Donating ${selectedCurrency} ${selectedAmount.toLocaleString()} - Implement your payment processing here`);

    localStorage.setItem("donateAmount", selectedAmount)
    // C:\Users\risha\OneDrive\Pictures\Donate Kart\Public\Payment_Section.html
    window.location.href="./Payment_Section"
    // Here you would typically:
    // 1. Validate the amount
    // 2. Collect additional payment details
    // 3. Process the payment via your payment gateway
});
}



faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const answer = question.nextElementSibling;
        const icon = question.querySelector('.faq-icon');
        
        // Toggle active class on answer
        answer.classList.toggle('active');
        
        // Toggle active class on icon
        icon.classList.toggle('active');

        // Close other open FAQs
        faqQuestions.forEach(otherQuestion => {
            if (otherQuestion !== question) {
                otherQuestion.nextElementSibling.classList.remove('active');
                otherQuestion.querySelector('.faq-icon').classList.remove('active');
            }
        });
    });
});

// 3 point image slider

function updateSlider() {
    const slider = document.querySelector('.slider');
    slider.style.transform = `translateX(-${currentSlide * 690}px)`;
    
    // Update dots
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    console.log(currentSlide)
    updateSlider();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    console.log(currentSlide)
    updateSlider();
}

function goToSlide(index) {
    currentSlide = index;
    updateSlider();
}

