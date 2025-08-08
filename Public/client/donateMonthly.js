const userDropdown = document.querySelector(".user-dropdown");
const dropdown = document.querySelector(".dropdown");
const dropdownBtn = document.querySelector('.dropdown-btn');
const dropdownContent = document.querySelector('.dropdown-content');

const menuButton = document.getElementById("menu-button")
const hamburgerIcon = document.querySelectorAll(".hamburger-icon")
const sliderOption = document.querySelectorAll(".slider-option")
let user = sessionStorage.getItem("authUser")

window.addEventListener("DOMContentLoaded", ()=>{
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


document.querySelectorAll('.preset-amount').forEach(button => {
    button.addEventListener('click', function() {
        document.querySelectorAll('.preset-amount').forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        document.getElementById('amount').value = this.getAttribute('data-value');
    });
});

document.getElementById('donationForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const campaign = document.getElementById('campaign').value;
    const amount = document.getElementById('amount').value;
    if (!campaign || !amount) {
        alert('Please select a campaign and enter an amount.');
        return;
    }
    localStorage.setItem("donateMonthly", amount);
    alert(`Thank you for your donation of ₹${amount} to ${campaign}!`);
    window.location.href = "./Donate_Monthly_Payment"
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


function submitForm() {
    let btn = document.querySelector(".submit-btn");
    btn.classList.add("loading");

    // Simulate form submission
    setTimeout(() => {
        btn.classList.remove("loading");
    }, 3000);
}