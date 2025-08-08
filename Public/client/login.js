const message = document.getElementById("message")
const toast = document.getElementById('toast');

function togglePassword() {
    const passwordField = document.getElementById("password");
    const eyeIcon = document.getElementById("eyeIcon");

    if (passwordField.type === "password") {
        passwordField.type = "text";
        eyeIcon.classList.remove("fa-eye-slash");
        eyeIcon.classList.add("fa-eye");
    } else {
        passwordField.type = "password";
        eyeIcon.classList.remove("fa-eye");
        eyeIcon.classList.add("fa-eye-slash");
    }
}


// Show toast notification
const showToast = (message, type) => {
    toast.textContent = message;
    toast.className = `toast show toast-${type}`;
    
    // Add icon based on type
    const icon = document.createElement('i');
    icon.className = type === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-circle';
    toast.insertBefore(icon, toast.firstChild);
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
};


async function handleForm(event){
    try {
        event.preventDefault();
        const email = event.target.email.value
        const password = event.target.password.value

        const obj = {
            email,
            password,
        }
        
        const loginResponse = await axios.get("http://localhost:7000/user/login", {params: {
            email: email,
            password: password
        }})

        console.log(loginResponse)
        
        if(loginResponse.status === 200) {
            if(loginResponse.data.message==="logged in sucessfully"){
                showToast('Login successfully!', 'success');
                localStorage.setItem("authTokenDonate", loginResponse.data.token)
                localStorage.setItem("authorizationData", JSON.stringify(loginResponse.data.user))
                sessionStorage.setItem("authUser", loginResponse.data.user[0].name)
                window.location.href= "./Homepage"
            }
        }
        else{
            
            message.textContent = `Error ocurred, Please try again`
        }
    } catch (error) {
        
        message.textContent = `${error}`
    }
    
}