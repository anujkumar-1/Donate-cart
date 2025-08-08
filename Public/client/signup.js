const signupButton = document.getElementById('signupForm')

document.querySelector('.otpBtn').addEventListener('click', function() {
    alert('OTP sent to your mobile number!');
});

document.querySelector('.showPassword').addEventListener('click', function() {
    const passwordInput = document.getElementById('password');
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
    } else {
        passwordInput.type = 'password';
    }
});


async function handleForm(event){
    event.preventDefault();
    const nameInput = event.target.fullname.value
    const emailInput = event.target.email.value
    const phoneInput = event.target.mobile.value;
    const passwordInput = event.target.password.value;
    const obj = {
        name: nameInput,
        email: emailInput,
        phone: phoneInput,
        password: passwordInput
    }
    
    console.log("submitButton", nameInput, emailInput, phoneInput, passwordInput);
    if (!validateName(nameInput)) {
        alert("Please enter a valid name.");
        return;
    }
    
    if (!validateEmail(emailInput)) {
        alert("Please enter a valid email address.");
        return;
    }
    
    if (!validatePhoneNumber(phoneInput)) {
        alert("Please enter a valid phone number.");
        return;
    }
    if(!validatePassword(passwordInput)) {
        alert("Please enter a valid password min 8 characters.");
        return
    }
    

    const postUserDetails = await axios.post("http://localhost:7000/user/signup", obj)

    if(postUserDetails.status===201){
        alert("Signup successful, please login")
        window.location.href= "./Login"
    }
    else{
        alert("Failed to registered")
        throw new Error("Failed to login")
    }

}





function validateName(name) {
    const signup_name = name.toLowerCase();
    console.log(signup_name);
    
    const words = signup_name.split('');
    console.log(words)
    if(words.length > 32) {
        alert("Name cannot exceed 32 characters.");
        return false;
    }
    if(alphabetCheck(words) == false){
        alert("Name cannot have special characters or numbers");
        return false
    }
    
    return signup_name.trim() !== "";
}
 
function validateEmail(email) {
    const signupEmail = email;
    // Regular expression for basic email validation

    const words = signupEmail.split("");
    console.log("words", words)

    if(specialCharacterCheck(words)===false){
        return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
  
function validatePhoneNumber(phone) {
    // Basic phone number validation (can be more refined)
    return /^\d{10}$/.test(phone); // Assuming 10-digit phone numbers
}
  

function validatePassword(password) {
    const receivedPassword = password.split("")
    console.log(receivedPassword)
    if(receivedPassword.length < 8){
        return false
    }
    return password.trim() !== "";
    
}
  // Example usage:

function alphabetCheck(data){
    const map = new Map();
    for (let i = 97; i <= 122; i++) { 
        map.set(String.fromCharCode(i), String.fromCharCode(i)); 
    }
    console.log(map)
    for(let i=0; i<data.length; i++) {

        if(!map.has(data[i]) && data[i] != " ") {
            return false;
        }
    }
}

function specialCharacterCheck(data){
    const specialCharacters = [
        '!', '#', '$', '%', '^', '&', '*', '(', ')', '-', '_', '=', '+',
        '[', ']', '{', '}', '\\', '|', ';', ':', ',', '/', '<', '>', '?', '`', '~'
      ];
      
      const specialCharMap = new Map();
      
      specialCharacters.forEach(char => {
        specialCharMap.set(char, char);
      });
      
      console.log(specialCharMap)

    for(let i=0; i<data.length; i++) {
        if(specialCharMap.has(data[i])) {
            return false;
        }
    }
}
