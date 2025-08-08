const beneficiaryTargetDropdown = document.getElementById("beneficiaryType")
const dropdownBtn = document.querySelector('.dropdown-btn');
const dropdownContent = document.querySelector('.dropdown-content');
const dropdown = document.querySelector(".dropdown");
const userDropdown = document.querySelector(".user-dropdown");
const dotsContainer = document.querySelector('.carousel-dots');
const menuButton = document.getElementById("menu-button")
const hamburgerIcon = document.querySelectorAll(".hamburger-icon")
const sliderOption = document.querySelectorAll(".slider-option")
let basicDetails = {}
const token = localStorage.getItem("authTokenDonate")
let user = sessionStorage.getItem("authUser")



document.addEventListener("DOMContentLoaded", function () {
    const stateSelect = document.getElementById("state");
    const citySelect = document.getElementById("city");

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


    const states = {
    "Andhra Pradesh": [
        "Anantapur", "Chittoor", "East Godavari", "Guntur", "Kadapa", "Krishna", "Kurnool",
        "Nellore", "Prakasam", "Srikakulam", "Visakhapatnam", "Vizianagaram", "West Godavari"
    ],
    "Arunachal Pradesh": [
        "Tawang", "West Kameng", "East Kameng", "Papum Pare", "Kurung Kumey", "Kra Daadi",
        "Lower Subansiri", "Upper Subansiri", "West Siang", "East Siang", "Siang", "Upper Siang",
        "Lower Dibang Valley", "Dibang Valley", "Anjaw", "Lohit", "Namsai", "Changlang", "Tirap", "Longding"
    ],
    "Assam": [
        "Baksa", "Barpeta", "Biswanath", "Bongaigaon", "Cachar", "Charaideo", "Chirang",
        "Darrang", "Dhemaji", "Dhubri", "Dibrugarh", "Goalpara", "Golaghat", "Hailakandi",
        "Hojai", "Jorhat", "Kamrup", "Kamrup Metropolitan", "Karbi Anglong", "Karimganj",
        "Kokrajhar", "Lakhimpur", "Majuli", "Morigaon", "Nagaon", "Nalbari", "Sivasagar",
        "Sonitpur", "South Salmara-Mankachar", "Tinsukia", "Udalguri", "West Karbi Anglong"
    ],
    "Bihar": [
        "Araria", "Arwal", "Aurangabad", "Banka", "Begusarai", "Bhagalpur", "Bhojpur", "Buxar",
        "Darbhanga", "East Champaran", "Gaya", "Gopalganj", "Jamui", "Jehanabad", "Kaimur",
        "Katihar", "Khagaria", "Kishanganj", "Lakhisarai", "Madhepura", "Madhubani", "Munger",
        "Muzaffarpur", "Nalanda", "Nawada", "Patna", "Purnia", "Rohtas", "Saharsa", "Samastipur",
        "Saran", "Sheikhpura", "Sheohar", "Sitamarhi", "Siwan", "Supaul", "Vaishali", "West Champaran"
    ],
    "Chhattisgarh": [
        "Balod", "Baloda Bazar", "Balrampur", "Bastar", "Bemetara", "Bijapur", "Bilaspur",
        "Dantewada", "Dhamtari", "Durg", "Gariaband", "Janjgir-Champa", "Jashpur", "Kabirdham",
        "Kanker", "Kondagaon", "Korba", "Koriya", "Mahasamund", "Mungeli", "Narayanpur",
        "Raigarh", "Raipur", "Rajnandgaon", "Sukma", "Surajpur", "Surguja"
    ],
    "Goa": ["North Goa", "South Goa"],
    "Gujarat": [
        "Ahmedabad", "Amreli", "Anand", "Aravalli", "Banaskantha", "Bharuch", "Bhavnagar",
        "Botad", "Chhota Udaipur", "Dahod", "Dang", "Devbhoomi Dwarka", "Gandhinagar", "Gir Somnath",
        "Jamnagar", "Junagadh", "Kheda", "Kutch", "Mahisagar", "Mehsana", "Morbi", "Narmada",
        "Navsari", "Panchmahal", "Patan", "Porbandar", "Rajkot", "Sabarkantha", "Surat",
        "Surendranagar", "Tapi", "Vadodara", "Valsad"
    ],
    "Haryana": [
        "Ambala", "Bhiwani", "Charkhi Dadri", "Faridabad", "Fatehabad", "Gurgaon", "Hisar",
        "Jhajjar", "Jind", "Kaithal", "Karnal", "Kurukshetra", "Mahendragarh", "Mewat", "Palwal",
        "Panchkula", "Panipat", "Rewari", "Rohtak", "Sirsa", "Sonipat", "Yamunanagar"
    ],
    "Himachal Pradesh": [
        "Bilaspur", "Chamba", "Hamirpur", "Kangra", "Kinnaur", "Kullu", "Lahaul & Spiti",
        "Mandi", "Shimla", "Sirmaur", "Solan", "Una"
    ],
    "Jharkhand": [
        "Bokaro", "Chatra", "Deoghar", "Dhanbad", "Dumka", "East Singhbhum", "Garhwa",
        "Giridih", "Godda", "Gumla", "Hazaribagh", "Jamtara", "Khunti", "Koderma", "Latehar",
        "Lohardaga", "Pakur", "Palamu", "Ramgarh", "Ranchi", "Sahibganj", "Seraikela-Kharsawan",
        "Simdega", "West Singhbhum"
    ],
    "West Bengal": [
        "Alipurduar", "Bankura", "Birbhum", "Cooch Behar", "Dakshin Dinajpur",
        "Darjeeling", "Hooghly", "Howrah", "Jalpaiguri", "Jhargram", "Kalimpong",
        "Kolkata", "Malda", "Murshidabad", "Nadia", "North 24 Parganas", "Paschim Bardhaman",
        "Paschim Medinipur", "Purba Bardhaman", "Purba Medinipur", "Purulia",
        "South 24 Parganas", "Uttar Dinajpur"
    ],
    "Delhi": ["Central Delhi", "East Delhi", "New Delhi", "North Delhi", "North East Delhi", "North West Delhi", "Shahdara", "South Delhi", "South East Delhi", "South West Delhi", "West Delhi"],
    "Puducherry": ["Karaikal", "Mahe", "Puducherry", "Yanam"],
    "Chandigarh": ["Chandigarh"],
    "Ladakh": ["Kargil", "Leh"],
    "Jammu & Kashmir": ["Anantnag", "Bandipora", "Baramulla", "Budgam", "Doda", "Ganderbal", "Jammu", "Kathua", "Kishtwar", "Kulgam", "Kupwara", "Poonch", "Pulwama", "Rajouri", "Ramban", "Reasi", "Samba", "Shopian", "Srinagar", "Udhampur"]
    };



    for (let state in states) {
        let option = document.createElement("option");
        option.value = state;
        option.textContent = state;
        stateSelect.appendChild(option);
    }

    stateSelect.addEventListener("change", function (event) {
        citySelect.innerHTML = `<option value=${event}>Select City</option>`;
        if (this.value in states) {
            states[this.value].forEach(city => {
                let option = document.createElement("option");
                option.value = city;
                option.textContent = city;
                citySelect.appendChild(option);
            });
        }
    });
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
    }, 6000);
}

beneficiaryTargetDropdown.addEventListener("change", (e)=>{
    console.log(e.target.value )
    const namelabel = document.getElementById("nameLabel")
    const phonelabel = document.getElementById("phoneLabel")
    const phoneDiv = document.getElementById("input-group")

    if(e.target.value === "Individual"){
        namelabel.textContent = "Individual Name"
        phonelabel.textContent= "Individual Phone No"
        phoneDiv.style.display="block"
    }
    else if(e.target.value === "NGO"){
        namelabel.textContent = "NGO Name"
        phoneDiv.style.display="none"
    }
    else if(e.target.value === "Self"){
        phoneDiv.style.display="block"
        namelabel.textContent = "Name"
        phonelabel.textContent= "Phone No"
    }
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




async function handleEvent(event){
    event.preventDefault()
    const state = document.getElementById("state").value;
    const city = document.getElementById("city").value;
    const beneficiaryType = document.getElementById("beneficiaryType").value;
    const name = event.target.name.value;
    const phone = event.target.phone.value;
    
    
    switch (beneficiaryType) {
        case "Self":
            if(!isValidIndianPhoneNumber(phone)) {
                alert("Incorrect phone number")
                return
            }
            basicDetails = {
                name: name, 
                state: state,
                city: city,
                phone: phone,
                type: beneficiaryType
            }
            break;
        
        case "Individual":
            if(!isValidIndianPhoneNumber(phone)) {
                alert("Incorrect phone number")
                return
            }
            basicDetails = {
                name: name, 
                state: state,
                city: city,
                phone: phone,
                type: beneficiaryType
            }
            break;
    
        default:
            basicDetails = {
                name: name, 
                state: state,
                city: city,
                type: beneficiaryType
            }
    }
    console.log(basicDetails);

    
   
   
    console.log(basicDetails);
    const campaign2 = await axios.post("http://localhost:7000/campaign/basicInfo", basicDetails, {headers:{Authorization: token}})
    console.log(campaign2, token)
    if(campaign2.data.sucess){
        localStorage.setItem("campaignToken", campaign2.data.campaignToken)
        // C:\Users\risha\OneDrive\Pictures\Donate Kart\Public\Create_Campaign.html
        window.location.href="./Create_Campaign"
    }
    
}


function isValidIndianPhoneNumber(phoneNumber) {
    const regex = /^(?:\+91[-\s]?)?[6-9]\d{9}$/;
    return regex.test(phoneNumber);
}