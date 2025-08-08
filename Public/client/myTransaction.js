

const dropdownBtn = document.querySelector('.dropdown-btn');
const dropdownContent = document.querySelector('.dropdown-content');
const dropdown = document.querySelector(".dropdown");
const userDropdown = document.querySelector(".user-dropdown");
const dotsContainer = document.querySelector('.carousel-dots');
const menuButton = document.getElementById("menu-button")
const hamburgerIcon = document.querySelectorAll(".hamburger-icon")
const sliderOption = document.querySelectorAll(".slider-option")
let user = sessionStorage.getItem("authUser")


// Mobile menu toggle functionality
document.addEventListener('DOMContentLoaded', function() {

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

    
    
});


        
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

