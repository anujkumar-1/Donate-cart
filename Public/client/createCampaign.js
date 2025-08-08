// Preview Uploaded Photo
const photoInput = document.getElementById('campaign-photo');
const photoPreview = document.getElementById('photo-preview');
const campaignTitle = document.getElementById("campaign-title")
const campaignMessage = document.getElementById("campaign-message")
// button dropdown on navbar
const dropdownBtn = document.querySelector('.dropdown-btn');
const dropdownContent = document.querySelector('.dropdown-content');
const dropdown = document.querySelector(".dropdown");
const userDropdown = document.querySelector(".user-dropdown");
const dotsContainer = document.querySelector('.carousel-dots');
const menuButton = document.getElementById("menu-button")
const hamburgerIcon = document.querySelectorAll(".hamburger-icon")
const sliderOption = document.querySelectorAll(".slider-option")
const authToken = localStorage.getItem("authTokenDonate");
const campaignToken = localStorage.getItem("campaignToken");
// Handle Form Submission
const form = document.getElementById('campaign-form');
let user = sessionStorage.getItem("authUser")



window.addEventListener("DOMContentLoaded", (event)=>{
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
})

photoInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            photoPreview.innerHTML = `<img src="${e.target.result}" alt="Campaign Photo">`;
        };
        reader.readAsDataURL(file);
        } else {
            photoPreview.innerHTML = '<img src="./Assets/user.png" alt="Default User Icon" class="default-icon">';
    }
});

function submitForm() {
    let btn = document.querySelector(".submit-btn");
    btn.classList.add("loading");

    // Simulate form submission
    setTimeout(() => {
        btn.classList.remove("loading");
    }, 10000);
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


async function handleEvent(event){
    try {
        event.preventDefault()
        // Get Form Data
        const photo = document.getElementById('campaign-photo').files[0];
        const title = document.getElementById('campaignTitle').value;
        const message = document.getElementById('campaignContent').value;
        const goalAmount = document.getElementById("goalAmount").value;
        const campaignSubheading = document.getElementById("campaignSubheading").value;
        console.log(photo, title, message, photo.name, photo.type)

        // Validate Form
        if (!photo || !title || !message || !goalAmount || !campaignSubheading) {
            alert('Please fill out all fields.');
            return;
        }

        const formData = new FormData();
        
        formData.append("file", photo);
        formData.append("title", title);
        formData.append("message", message);
        formData.append("goalAmount", goalAmount);
        formData.append("campaignSubheading", campaignSubheading);
        console.log(formData)
        const response = await axios.post("http://localhost:7000/campaign/campaignDetails", formData, {
            headers: {Authorization: authToken, "X-Campaign-Token": campaignToken}
        });
        
        console.log("Upload Success:", response.data.success);
        if(response.data.success){
            window.location.href="./Product"
        }
        else{
            console.log("Error in campaign 3")
        }
        
    } catch (error) {
        console.error("Upload Error:", error);
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


