const payment=document.getElementById("handlePayment");
const selectDate = document.getElementById("selectDate");
const amount = localStorage.getItem("donateMonthly");
document.addEventListener("click", (e)=>{
    console.log(e.target.id)
    const phone = document.getElementById("doPhone")
    const name = document.getElementById("doName")
    const email = document.getElementById("doEmail")

    if(e.target.id == "name"){
        name.style.color ="#ff7400"
        phone.style.color = "#666"
        email.style.color= "#666"                
        
    }
    else if(e.target.id == "email"){
        name.style.color ="#666"
        phone.style.color = "#666"
        email.style.color= "#ff7400"
    }
    else if(e.target.id == "phone"){
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




payment.addEventListener("submit", async(event)=>{
    event.preventDefault();

    let btn = document.querySelector(".submit-btn");
    btn.classList.add("loading");

    // Simulate form submission
    setTimeout(() => {
        btn.classList.remove("loading");
    }, 3000);

    const date = selectDate.value;
    const name = event.target.name.value
    const email = event.target.email.value
    const phone = event.target.phone.value
    const nationality = event.target.nationality.value
    const anonymous = event.target.anonymous.value
    const whatsapp = event.target.whatsapp.value
    if (!name || !email || !phone || !date) {
        alert('Please fill in all required fields');
        return;
    }

    const formData = {
        name: name,
        email: email,
        phone: phone,
        nationality: nationality,
        date: date,
        amount:amount
    };

    try {
        console.log("first", formData)

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
})