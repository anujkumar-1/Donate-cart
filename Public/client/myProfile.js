

const dropdownBtn = document.querySelector('.dropdown-btn');
const dropdownContent = document.querySelector('.dropdown-content');
const dropdown = document.querySelector(".dropdown");
const userDropdown = document.querySelector(".user-dropdown");
const dotsContainer = document.querySelector('.carousel-dots');
const menuButton = document.getElementById("menu-button")
const hamburgerIcon = document.querySelectorAll(".hamburger-icon")
const sliderOption = document.querySelectorAll(".slider-option")
const userEmail = document.getElementById("userEmail");
const userName = document.getElementById("userName");
const userPhone = document.getElementById("userPhone");
const totalDonation = document.getElementById("totalDonations");
const campaignSupported = document.getElementById("campaignsSupported")
let user = sessionStorage.getItem("authUser")
const authData = JSON.parse(localStorage.getItem("authorizationData"));

console.log(authData)

// User data
const userData = {
    name: "Anuj Kumar",
    email: "anuj39263@gmail.com",
    phone: "+919310256220",
    profileImage: "https://dkprodimages.gumlet.io/UserImages/f775f6ef-8d43-4257-b7ac-428ee7e82153.webp?format=webp&w=160&dpr=1.3",
    totalDonations: "₹0",
    campaignsSupported: 0
};

// Function to load user data
function loadUserData() {
    document.getElementById('userName').textContent = userData.name;
    document.getElementById('userEmail').textContent = userData.email;
    document.getElementById('userPhone').textContent = userData.phone;
    document.getElementById('profileImage').src = userData.profileImage;
    document.getElementById('totalDonations').textContent = userData.totalDonations;
    document.getElementById('campaignsSupported').textContent = userData.campaignsSupported;
}



// Initialize the page
document.addEventListener('DOMContentLoaded', async function() {
    loadUserData();
    
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

    // Tab switching functionality
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            // Here you would typically load different content based on the tab
        });
    });
    
    // // Edit profile functionality
    // const editBtn = document.querySelector('.edit-icon');
    // editBtn.addEventListener('click', function() {
    //     // Implement edit profile functionality
    //     alert('Edit profile functionality would go here');
    // });

    
    if(authData[0].email){
        const data = await axios.get(`http://localhost:7000/user/userInfo/${authData[0].email}`)
        console.log(data.data.profileData)
        profileData(data)
    }

});

function profileData(data){
    userEmail.textContent = authData[0].email
    userName.textContent = authData[0].name
    userPhone.textContent =authData[0].mobile
    totalDonation.textContent = `₹${data.data.profileData.rows[0].totalAmount}`
    campaignSupported.textContent = data.data.profileData.rows[0].count
}



function createPaymentRows(payments, tableId) {
  const table = document.getElementById(tableId)

  payments.forEach(payment => {
    const tr = document.createElement('tr');
    
    // Add class if payment is in progress
    if (payment.status.toLowerCase().includes('progress')) {
      tr.className = 'in-progress';
    }

    // Create table cells
    tr.innerHTML = `
      <td>${payment.date}</td>
      <td>${payment.amount}</td>
      <td>${payment.fee || 'INR 0.00'}</td>
      <td>
        <span class="status ${getStatusClass(payment.status)}" title="${getStatusTooltip(payment.status)}">
          ${payment.status}
        </span>
      </td>
      <td>${payment.id}</td>
    `;

    table.appendChild(tr);
  });
}

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
