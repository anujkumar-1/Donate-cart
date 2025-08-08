
async function handleEvent(event){
    event.preventDefault()
    const email = event.target.email.value
    console.log(email)
    const response = await axios.get("http://localhost:7000/admin/verify", {params: {
        email: email,
    }})
    console.log(response)
    if(response.data.success){
        window.location.href="./Admin_Dashboard"
    }else{
        console.log(response)
        // window.location.href="./adminLogin.html"
    }
}