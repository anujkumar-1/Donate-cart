const socialCauseDropdown = document.getElementById("socialCause");
const medicalCard = document.querySelector(".cause_causeWrapper");
const medicalDiv = document.querySelector("#medcaid")
const selectWrapper = document.querySelector("#select_selectWrapper")
const socialCauseOption= document.getElementsByClassName("social-cause-text")
const token = localStorage.getItem("authTokenDonate")
const emailVerificationForm = document.getElementById("otp-modal")
let otpGeneratedTime = null;
let timer = null;
const userDropdown = document.querySelector(".user-dropdown");
const dropdown = document.querySelector(".dropdown");
const dropdownBtn = document.querySelector('.dropdown-btn');
const dropdownContent = document.querySelector('.dropdown-content');

const menuButton = document.getElementById("menu-button")
const hamburgerIcon = document.querySelectorAll(".hamburger-icon")
const sliderOption = document.querySelectorAll(".slider-option")

let basicDetailsObj = {}

let user = sessionStorage.getItem("authUser")

window.addEventListener("DOMContentLoaded", ()=>{
    if(user != null  && user != undefined  && user != ""){

        window.location.href = "./Ngo_Individual"
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



socialCauseDropdown.addEventListener("change", function (event) {
    const selectedValue = this.value;
    console.log("selectedValue", selectedValue, socialCauseDropdown.value)

    if (selectedValue !== "-1") {
        console.log(socialCauseDropdown.value)
        
        medicalDiv.style.backgroundColor = "white";
        medicalDiv.style.color = "black";
        socialCauseDropdown.style.backgroundColor="#423b7d"
        socialCauseDropdown.style.color="white"
        alert(`Selected Social Cause: ${this.options[this.selectedIndex].text}`);
    }
});

medicalCard.addEventListener("click", function (event) {
    console.log("event", event)
    medicalDiv.style.backgroundColor = "#423b7d";
    medicalDiv.style.color = "white";
    socialCauseDropdown.style.backgroundColor="white"
    socialCauseDropdown.style.color="black"
    alert("Medical category selected!");
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


async function handleForm(event){
    try {
        event.preventDefault()
        const name = event.target.name.value;
        const email = event.target.email.value;
        const phone = event.target.phone.value;
        const category = socialCauseDropdown.value

        basicDetailsObj = {
            name: name,
            email: email,
            category: category,
            phone: phone
        }

    if (name == "" && email == "" && phone == ""){

    }
    else{
        // console.log(name, email, phone, category);

        

        const fundRaiser = await axios.post("http://localhost:7000/user/basicInfo", basicDetailsObj)
        showOTPModal()
        startOTPTimer()
        console.log(fundRaiser)
        
    }

        
    } catch (error) {
        console.log(error)
    }
    
    // console.log(name, email, phone, category);
}




// Show OTP Modal
function showOTPModal() {
    emailVerificationForm.style.display="flex"
    console.log("basicDetailsObj", basicDetailsObj)
    document.getElementById("otp-input").value = "";
    document.getElementById("otp-input").disabled = false;
    document.querySelector("button[onclick='verifyOTP()']").disabled = false;
}

// Start 15-minute Countdown Timer
function startOTPTimer() {
    otpGeneratedTime = new Date().getTime(); // Store OTP generation timestamp
    updateTimerDisplay();

    clearInterval(timer);
    timer = setInterval(() => {
        if (getRemainingSeconds() <= 0) {
            clearInterval(timer);
            disableOTPInput();
        } else {
            updateTimerDisplay();
        }
    }, 1000);
}

// Calculate Remaining Time
function getRemainingSeconds() {
    if (!otpGeneratedTime) return 0;

    const currentTime = new Date().getTime();
    const elapsedSeconds = Math.floor((currentTime - otpGeneratedTime) / 1000);
    const remainingSeconds = Math.max(15 * 60 - elapsedSeconds, 0);

    return remainingSeconds;
}

// Update Timer Display
function updateTimerDisplay() {
    let timeLeft = getRemainingSeconds();
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    
    document.getElementById("timer").textContent = 
        `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

// Disable OTP Input & Show Resend Button
function disableOTPInput() {
    document.getElementById("otp-input").disabled = true;
    document.querySelector("button[onclick='verifyOTP()']").disabled = true;
    document.getElementById("resend-otp").classList.remove("hidden");
}

// Example: Restart Timer on OTP Resend
function resendOTP() {
    otpGeneratedTime = new Date().getTime(); // Reset OTP timestamp
    document.getElementById("otp-input").disabled = false;
    document.querySelector("button[onclick='verifyOTP()']").disabled = false;
    document.getElementById("resend-otp").classList.add("hidden");
    
    startOTPTimer();
}


// Close OTP Modal
function closeOTPModal() {
    emailVerificationForm.style.display="none"
    clearInterval(timer);
}

async function verifyOTP() {
    try {
        let enteredOTP = document.getElementById("otp-input").value;
        if (enteredOTP == "" || enteredOTP.length != 6) {
            alert("incorrect otp")
        }
        console.log(313626)
        console.log(basicDetailsObj, enteredOTP)
        const fundRaiserVerify = await axios.get("http://localhost:7000/user/verify", {params: {
            email: basicDetailsObj.email,
            userOTP: enteredOTP
        }})


        
        if(fundRaiserVerify.status === 200){
            alert("Login Successfully")
            localStorage.setItem("authTokenDonate",  fundRaiserVerify.data.token)
            sessionStorage.setItem("authUser", fundRaiserVerify.data.username)
            console.log(fundRaiserVerify.data)
            // C:\Users\risha\OneDrive\Pictures\Donate Kart\Public\Ngo_Individual.html
            window.location.href = "./Ngo_Individual";
        }
        else{
            alert("inccorect otp Successfully")
        }
        
    } catch (error) {
        console.log(error)
    }
    

}


function submitForm() {
    let btn = document.querySelector(".submit-btn");
    btn.classList.add("loading");

    // Simulate form submission
    setTimeout(() => {
        btn.classList.remove("loading");
    }, 3000);
}