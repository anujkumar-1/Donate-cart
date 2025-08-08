const form = document.getElementById('donationForm');
const amountDisplay = document.getElementById('amountDisplay');
const tipPercentage = document.getElementById('tipPercentage');
const currencySelector = document.getElementById('currencySelector');
const amountButtons = document.querySelectorAll('.amount-option:not(.custom-amount)');
let donationAmount =  +localStorage.getItem("donateAmount")
    
 // Base donation amount
 let tipAmount = Math.floor(donationAmount * 16/ 100); // Default tip (12% of 3000)
 let totalAmount = donationAmount + tipAmount;
 let additionalAmount= 0
 // Update amount display
 function updateAmountDisplay() {
     const currency = currencySelector.value;
     let symbol = '₹';
     
     switch(currency) {
         case 'usd': symbol = '$'; break;
         case 'eur': symbol = '€'; break;
         case 'gbp': symbol = '£'; break;
         case 'aed': symbol = 'AED '; break;
     }
     
     amountDisplay.textContent = symbol + totalAmount.toLocaleString();
 }
 
 // Handle amount button clicks
 amountButtons.forEach(button => {
     button.addEventListener('click', function() {

         // Update donation amount
         additionalAmount = parseInt(this.dataset.amount);
         
         calculateTotal();
     });
 });
 
 // Handle tip percentage change
 tipPercentage.addEventListener('change', function() {
     calculateTotal();
 });
 
 // Handle currency change
 currencySelector.addEventListener('change', function() {
     updateAmountDisplay();
 });
 
 // Calculate total amount with tip
 function calculateTotal() {
     const tipValue = parseInt(tipPercentage.value);
     
     if (tipValue === 0) {
         // For "Other" option, you might want to show an input field
         tipAmount = 0; // Or prompt for custom tip
     } else {
         tipAmount = Math.round(donationAmount * (tipValue / 100));
     }
     
     totalAmount = additionalAmount + donationAmount + tipAmount;
     updateAmountDisplay();
 }
 
 
 // Initialize
 updateAmountDisplay();

document.addEventListener("click", (e)=>{
    console.log(e.target.id)
    const phone = document.getElementById("doPhone")
    const name = document.getElementById("doName")
    const email = document.getElementById("doEmail")

    if(e.target.id == "donorName"){
        name.style.color ="#ff7400"
        phone.style.color = "#666"
        email.style.color= "#666"                
        
    }
    else if(e.target.id == "donorEmail"){
        name.style.color ="#666"
        phone.style.color = "#666"
        email.style.color= "#ff7400"
    }
    else if(e.target.id == "donorPhone"){
        name.style.color ="#666"
        phone.style.color = "#ff7400"
        email.style.color= "#666"
    }
    else{
        name.style.color ="#666"
        phone.style.color = "#666"
        email.style.color= "#666"
    }
    
})


// Form submission
form.addEventListener('submit', async function(e) {
    
    e.preventDefault();
    let btn = document.querySelector(".submit-btn");

    
    // Validate form
    const name = document.getElementById('donorName').value;
    const email = document.getElementById('donorEmail').value;
    const phone = document.getElementById('donorPhone').value;
    const token = localStorage.getItem("openCampaignId")
    if (!name || !email || !phone || !token) {
        alert('Please fill in all required fields');
        return;
    }

    btn.classList.add("loading");

    // Simulate form submission
    setTimeout(() => {
        btn.classList.remove("loading");
    }, 6000);
    
    // Prepare form data
    const formData = {
        name: name,
        email: email,
        phone: document.getElementById('countryCode').value + phone,
        nationality: document.querySelector('input[name="nationality"]:checked').value,
        amount: totalAmount,
        currency: currencySelector.value,
        isAnonymous: document.getElementById('anonymousDonation').checked,
        whatsappUpdates: document.getElementById('whatsappUpdates').checked,
        token: token
    };
    
    // In a real app, you would send this data to your server
    console.log('Form data:', formData);
    try {
        
        const response = await axios.post("http://localhost:7000/payment/intiateDonation", formData);
        console.log(response)
        var options = {
            "key": response.data.key_id,
            "order_id": response.data.order.id,
            "currency": "INR",
            "name": "YesDonate", //your business name
            
            "handler": async function(response){
              const data = await axios.post("http://localhost:7000/payment/updateDonationStatus",{
                order_id: options.order_id,
                payment_id: response.razorpay_payment_id,
                token:token
              })
              console.log(data)
              alert("You donation is successful, thankyou for your contribution")
            }
            
        }

        const rzp1 = new Razorpay(options);
        rzp1.open();
        e.preventDefault();


        rzp1.on("payment.failed", async function(response){
            const reponse = await axios.post("http://localhost:7000/payment/updateErrorStatus",{
                order_id: options.order_id,
                payment_id: response.razorpay_payment_id, 
              })
            console.log("Something went wrong");
            alert("Something went wrong")
        })
      
      

    } catch (error) {
        console.log(error)
    }
    
    
    // Reset form (optional)
    // form.reset();
});


// payment section
  
// document.getElementById('rzp-button1').onclick = async function(e){
//     console.log("Razorpay got clicked")
//     const token = localStorage.getItem("token");
    
    // const response = await axios.get("http://localhost:3000/buyPremiumMembership", { headers: { Authorization: token }});
    
    
    // var options = {
    //   "key": response.data.key_id,
    //   "order_id": response.data.order.id,
    //   "currency": "INR",
    //   "name": "Acme Corp", //your business name
    //   "handler": async function(response){
    //     const data = await axios.post("http://localhost:3000/updatePremiumMembership",{
    //       order_id: options.order_id,
    //       payment_id: response.razorpay_payment_id

    //     }, { headers: { Authorization: token }})
        
        
    //     alert("You are a premium user now")
    //     showPremiumUserMsg()
    //     localStorage.setItem("token", data.data.token)
    //     showAllLeaderboardUser()
    //     downloadDataFromS3()

    //   }
      
    //  }
    // const rzp1 = new Razorpay(options);
    // rzp1.open();
    // e.preventDefault();

//     rzp1.on("payment.failed", async function(response){
//       const reponse = await axios.post("http://localhost:3000/updateErrorPremiumMembership",{
//           order_id: options.order_id,
//           payment_id: response.razorpay_payment_id
          
//         }, { headers: { Authorization: token }})
//       console.log("Something went wrong");
//       alert("Something went wrong")
//     })


//   }
  