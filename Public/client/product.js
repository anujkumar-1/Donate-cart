const comboBoxInput = document.getElementById('combo-box-input');
const comboBoxList = document.getElementById('combo-box-list-group');
const comboBoxArrow = document.getElementById('combo-box-arrow-wrapper');
const priceInput = document.getElementById("price")

// Get DOM elements
const saveBtn = document.querySelector('.form_btn_wrapper .btn_gradient:not(.btn_cancel)');
const cancelBtn = document.getElementById("cancel-btn")
const submitSection = document.getElementById('submit-section');
const finalSubmitBtn = document.getElementById('final-submit-btn');
const form = document.querySelector('.form_wrapper');
const authToken = localStorage.getItem("authTokenDonate");
const campaignToken = localStorage.getItem("campaignToken");
const homeCard = document.getElementById("homeCard")
const videoContainer = document.getElementById("videoContainer")
const submissionCard = document.getElementById("submissionCard")
const navBar = document.getElementById("navbar")
const dropdownBtn = document.querySelector('.dropdown-btn');
const dropdownContent = document.querySelector('.dropdown-content');
const dropdown = document.querySelector(".dropdown");
const userDropdown = document.querySelector(".user-dropdown");
const dotsContainer = document.querySelector('.carousel-dots');
const menuButton = document.getElementById("menu-button")
const hamburgerIcon = document.querySelectorAll(".hamburger-icon")
const sliderOption = document.querySelectorAll(".slider-option")
let user = sessionStorage.getItem("authUser")

let addedProducts = [];       
let total = []
let campaign =[]


const products = [
    {name: "Atta 10kg", price: 400, image: "https://dkprodimages.gumlet.io/cataloguemaster/Atta10kg.webp?format=webp&w=480&dpr=1.3"},
    {name: "Basket Ball", price:600, image: "https://dkprodimages.gumlet.io/cataloguemaster/BasketBall.webp?format=webp&w=480&dpr=1.3"},
    {name: "Bat and Ball", price: 1200, image: "https://dkprodimages.gumlet.io/cataloguemaster/BatAndBall.webp?format=webp&w=480&dpr=1.3"},
    {name: "Besan 2kg", price: 180, image: "https://dkprodimages.gumlet.io/cataloguemaster/Besan2Kg.webp?format=webp&w=480&dpr=1.3"},
    {name: "Black chana 3kg", price: 270, image: "https://dkprodimages.gumlet.io/cataloguemaster/BlackChana3Kg.webp?format=webp&w=480&dpr=1.3"},
    {name: "Blankets", price: 399, image: "https://dkprodimages.gumlet.io/cataloguemaster/blanketsPackOf2.webp?format=webp&w=480&dpr=1.3"},
    {name: "Bricks pack of 50", price: 450, image: "https://dkprodimages.gumlet.io/cataloguemaster/BricksPackOf50.webp?format=webp&w=480&dpr=1.3"},
    {name: "Carrom board with coin & striker powder", price: 300, image: "https://dkprodimages.gumlet.io/cataloguemaster/CarromBoard.webp?format=webp&w=480&dpr=1.3"},
    {name: "Cat food kit", price: 500, image: "https://dkprodimages.gumlet.io/cataloguemaster/CatFoodKit.webp?format=webp&w=480&dpr=1.3"},
    {name: "Cement 50kg", price: 900, image: "https://dkprodimages.gumlet.io/cataloguemaster/Cement50Kg.webp?format=webp&w=480&dpr=1.3"},
    {name: "Chappi 2.8kg", price: 299, image: "https://dkprodimages.gumlet.io/cataloguemaster/Chappi2.8Kg.webp?format=webp&w=480&dpr=1.3"},
    {name: "Chess Board Set", price: 299, image: "https://dkprodimages.gumlet.io/cataloguemaster/ChessBoardSet.webp?format=webp&w=480&dpr=1.3"},
    {name: "Chole 2kg", price: 160, image: "https://dkprodimages.gumlet.io/cataloguemaster/Chole2Kg.webp?format=webp&w=480&dpr=1.3"},
    {name: "Construction kit", price: 700, image: "https://dkprodimages.gumlet.io/cataloguemaster/ConstructionKit.webp?format=webp&w=480&dpr=1.3"},
    {name: "Cow Food kit", price: 600, image: "https://dkprodimages.gumlet.io/cataloguemaster/CowFoodKit.webp?format=webp&w=480&dpr=1.3"},
    {name: "Daliya 5kg", price: 200, image: "https://dkprodimages.gumlet.io/cataloguemaster/Daliya5Kg.webp?format=webp&w=480&dpr=1.3"},
    {name: "Daliya 5kg (For cats)", price: 200, image: "https://dkprodimages.gumlet.io/cataloguemaster/Daliya5Kg(ForCats).webp?format=webp&w=480&dpr=1.3"},
    {name: "Daliya 5kg (For Cattle)", price: 200, image: "https://dkprodimages.gumlet.io/cataloguemaster/Daliya5Kg(ForCattle).webp?format=webp&w=480&dpr=1.3"},
    {name: "Daliya 5kg (for dogs)", price: 200, image: "https://dkprodimages.gumlet.io/cataloguemaster/Daliya5Kg(ForDogs).webp?format=webp&w=480&dpr=1.3"},
    {name: "Dog Coat - Pack of 2", price: 399, image: "https://dkprodimages.gumlet.io/cataloguemaster/dogCoat.webp?format=webp&w=480&dpr=1.3"},
    {name: "Dog Collar(Pack of 4)", price: 499, image: "https://dkprodimages.gumlet.io/cataloguemaster/DogCollar.webp?format=webp&w=480&dpr=1.3"},
    {name: "Dog food kit", price: 590, image: "https://dkprodimages.gumlet.io/cataloguemaster/DogFoodkit.webp?format=webp&w=480&dpr=1.3"},
    {name: "Dry Fodder 40kg", price: 800, image: "https://dkprodimages.gumlet.io/cataloguemaster/DryFodder40Kg.webp?format=webp&w=480&dpr=1.3"},
    {name: "Foot Ball", price: 599, image: "https://dkprodimages.gumlet.io/cataloguemaster/Footballs.webp?format=webp&w=480&dpr=1.3"},
    {name: "Geometry Box", price: 149, image: "https://dkprodimages.gumlet.io/cataloguemaster/GeometryBox.webp?format=webp&w=480&dpr=1.3"}, 
    {name: "Geometry Box (pack of 2)", price: 299, image: "https://dkprodimages.gumlet.io/cataloguemaster/GeometryBox(PackOf2).webp?format=webp&w=480&dpr=1.3"},
    {name: "Ghee 500ml", price: 399, image: "https://dkprodimages.gumlet.io/cataloguemaster/Ghee500ml.webp?format=webp&w=480&dpr=1.3"},
    {name: "Green Fodder 50kg", price: 1000, image: "https://dkprodimages.gumlet.io/cataloguemaster/GreenFodder50Kg.webp?format=webp&w=480&dpr=1.3"},
    {name: "Grocery Kit (535)", price: 535, image: "https://dkprodimages.gumlet.io/cataloguemaster/GroceryKit(535).webp?format=webp&w=480&dpr=1.3"},
    {name: "Grocery Kit (570)", price: 570, image: "https://dkprodimages.gumlet.io/cataloguemaster/GroceryKit(570).webp?format=webp&w=480&dpr=1.3"},
    {name: "Grocery Kit (625)", price: 625, image: "https://dkprodimages.gumlet.io/cataloguemaster/GroceryKit(625).webp?format=webp&w=480&dpr=1.3"},
    {name: "Groundnut 2kg", price: 280, image: "https://dkprodimages.gumlet.io/cataloguemaster/GroundNuts2Kg.webp?format=webp&w=480&dpr=1.3"},
    {name: "Gud 5kg", price: 500, image: "https://dkprodimages.gumlet.io/cataloguemaster/Gud5Kg.webp?format=webp&w=480&dpr=1.3"},
    {name: "Handwash 3x725 ml", price: 375, image: "https://dkprodimages.gumlet.io/cataloguemaster/Handwash3x725ml.webp?format=webp&w=480&dpr=1.3"},
    {name: "Hygeine Kit (520)", price: 520, image: "https://dkprodimages.gumlet.io/cataloguemaster/HygieneKit(520).webp?format=webp&w=480&dpr=1.3"},
    {name: "Hygeine Kit (545)", price: 555, image: "https://dkprodimages.gumlet.io/cataloguemaster/HygieneKit(545).webp?format=webp&w=480&dpr=1.3"},
    {name: "Jaggery 5kg", price: 240, image: "https://dkprodimages.gumlet.io/cataloguemaster/Jaggery5Kg.webp?format=webp&w=480&dpr=1.3"},
    {name: "Khal 12Kg", price: 600, image: "https://dkprodimages.gumlet.io/cataloguemaster/Khal12Kg.webp?format=webp&w=480&dpr=1.3"},
    {name: "Ludo", price: 99, image: "https://dkprodimages.gumlet.io/cataloguemaster/Ludo.webp?format=webp&w=480&dpr=1.3"},
    {name: "Masoor Daal 2kg", price: 280, image: "https://dkprodimages.gumlet.io/cataloguemaster/MasoorDal2Kg.webp?format=webp&w=480&dpr=1.3"},
    {name: "Moong Daal 2kg", price: 300, image: "https://dkprodimages.gumlet.io/cataloguemaster/MoongDal2Kg.webp?format=webp&w=480&dpr=1.3"},
    {name: "Note Book (pack of 12)", price: 240, image: "https://dkprodimages.gumlet.io/cataloguemaster/NotebooksPackOf12.webp?format=webp&w=480&dpr=1.3"},
    {name: "Pedigree adult dry food 1kg", price: 400, image: "https://dkprodimages.gumlet.io/cataloguemaster/PedigreeAdultDryFood1Kg.webp?format=webp&w=480&dpr=1.3"},
    {name: "Pedigree gravy pouches 100gm (6 pouches)", price: 199, image: "https://dkprodimages.gumlet.io/cataloguemaster/PedigreeGravyPouches100gm(PackOf6).webp?format=webp&w=480&dpr=1.3"},
    {name: "Poha 5kg", price: 200, image: "https://dkprodimages.gumlet.io/cataloguemaster/Poha5Kg.webp?format=webp&w=480&dpr=1.3"},
    {name: "Rajma 2kg", price: 260, image: "https://dkprodimages.gumlet.io/cataloguemaster/Rajma2Kg.webp?format=webp&w=480&dpr=1.3"},
    {name: "Rava 5kg", price: 250, image: "https://dkprodimages.gumlet.io/cataloguemaster/Rava5Kg.webp?format=webp&w=480&dpr=1.3"},
    {name: "Refined oil 2 Lit", price: 270, image: "https://dkprodimages.gumlet.io/cataloguemaster/RefinedOil2Lit.webp?format=webp&w=480&dpr=1.3"},
    {name: "Rice 10kg", price: 600, image: "https://dkprodimages.gumlet.io/cataloguemaster/Rice10Kg.webp?format=webp&w=480&dpr=1.3"},
    {name: "Rice 10kg (for animals)", price: 400, image: "https://dkprodimages.gumlet.io/cataloguemaster/Rice10Kg(ForAnimals).webp?format=webp&w=480&dpr=1.3"},
    {name: "Rice 5kg", price: 250, image: "https://dkprodimages.gumlet.io/cataloguemaster/Rice5Kg.webp?format=webp&w=480&dpr=1.3"},
    {name: "Salt 5kg", price: 200, image: "https://dkprodimages.gumlet.io/cataloguemaster/Salt5Kg.webp?format=webp&w=480&dpr=1.3"},
    {name: "Sand 6 cubic ft", price: 399, image: "https://dkprodimages.gumlet.io/cataloguemaster/Sand6CubicFt.webp?format=webp&w=480&dpr=1.3"},
    {name: "Sanitary Napkins(Pack of 7) 10 PKT", price: 150, image: "https://dkprodimages.gumlet.io/cataloguemaster/SanitaryNapkins(PackOf7).webp?format=webp&w=480&dpr=1.3"},
    {name: "School bag", price: 499, image: "https://dkprodimages.gumlet.io/cataloguemaster/SchoolBag.webp?format=webp&w=480&dpr=1.3"},
    {name: "Soft Toy", price: 99, image: "https://dkprodimages.gumlet.io/cataloguemaster/SoftToy.webp?format=webp&w=480&dpr=1.3"},
    {name: "Soya chunks 2Kg", price: 260, image: "https://dkprodimages.gumlet.io/cataloguemaster/SoyaChunks2Kg.webp?format=webp&w=480&dpr=1.3"},
    {name: "Stainless Steel- 1Kg", price: 200, image: "https://dkprodimages.gumlet.io/cataloguemaster/StainlessSteel1Kg.webp?format=webp&w=480&dpr=1.3"},
    {name: "Stationary Kit", price: 500, image: "https://dkprodimages.gumlet.io/cataloguemaster/StationeryKit.webp?format=webp&w=480&dpr=1.3"},
    {name: "Sugar 5kg", price: 230, image: "https://dkprodimages.gumlet.io/cataloguemaster/Sugar5Kg.webp?format=webp&w=480&dpr=1.3"},
    {name: "Sweater", price: 499, image: "https://dkprodimages.gumlet.io/cataloguemaster/sweater.webp?format=webp&w=480&dpr=1.3"},
    {name: "Tea Powder 1kg", price: 240, image: "https://dkprodimages.gumlet.io/cataloguemaster/TeaPowder1kg.webp?format=webp&w=480&dpr=1.3"},
    {name: "TMT Bar 8kg", price: 750, image: "https://dkprodimages.gumlet.io/cataloguemaster/TmtBars8Kg.webp?format=webp&w=480&dpr=1.3"},
    {name: "Toor Daal 2kg", price: 240, image: "https://dkprodimages.gumlet.io/cataloguemaster/ToorDal2Kg.webp?format=webp&w=480&dpr=1.3"},
    {name: "Urad daal 2kg", price: 220, image: "https://dkprodimages.gumlet.io/cataloguemaster/UradDal2Kg.webp?format=webp&w=480&dpr=1.3"},
    {name: "Whiskas dry cat food Adult 1.2 Kg", price: 550, image: "https://dkprodimages.gumlet.io/cataloguemaster/WhiskasDryCatFoodAdult1.2Kg.webp?format=webp&w=480&dpr=1.3"},
    {name: "Whiskas gravy Pouch 85 gms pack of 6", price: 400, image: "https://dkprodimages.gumlet.io/cataloguemaster/WhiskasGravyPouch85gmsPackOf6.webp?format=webp&w=480&dpr=1.3"},
    {name: "Woolen Cap", price: 100, image: "https://dkprodimages.gumlet.io/cataloguemaster/winterCaps.webp?format=webp&w=480&dpr=1.3"},
    {name: "Woolen Hand gloves 1 Pair", price: 50, image: "https://dkprodimages.gumlet.io/cataloguemaster/WoollenGloves.webp?format=webp&w=480&dpr=1.3"}
        ];




window.addEventListener("DOMContentLoaded", (event)=>{
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
        if (window.innerWidth <=768) {
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




comboBoxList.innerHTML = products.map(product => `
    <div class="combobox_list_item">
        <img src="${product.image}" alt="${product.name}" class="combobox_list_img">
        <span id=${product.price}>${product.name}</span>
    </div>
`).join('');


comboBoxInput.addEventListener('click', function (e) {
    comboBoxList.style.display = 'block';
});

let html = ""

comboBoxInput.addEventListener('keyup', function (e) {
    const filteredProduct = products.filter(product =>{
        return product.name.toLowerCase().includes(comboBoxInput.value.toLowerCase())
    })

    comboBoxList.innerHTML = filteredProduct.map(prod => `
        <div class="combobox_list_item">
            <img src="${prod.image}" alt="${prod.name}" class="combobox_list_img">
            <span id=${prod.price}>${prod.name}</span>
        </div>
    `).join('');

    
});





comboBoxList.addEventListener('click', function (e) {
    if (e.target.classList.contains('combobox_list_item')) {
        console.log(e)
        comboBoxVal = e.target.querySelector('span').textContent;
        comboBoxPrice = e.target.querySelector('span').id;
        console.log(comboBoxVal, comboBoxPrice)
    }
    comboBoxInput.value = comboBoxVal
    priceInput.value = +comboBoxPrice
    comboBoxList.style.display = 'none';
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



function updateProductTable() {
        const tableBody = document.getElementById('product-table-body');
        tableBody.innerHTML = '';

        addedProducts.forEach(product => {
            const row = document.createElement('tr');
            
            const nameCell = document.createElement('td');
            nameCell.textContent = product.name;
            
            const quantityCell = document.createElement('td');
            quantityCell.textContent = product.quantity;
            
            const priceCell = document.createElement('td');
            priceCell.textContent = `₹${product.price}`;
            
            row.appendChild(nameCell);
            row.appendChild(quantityCell);
            row.appendChild(priceCell);
            
            tableBody.appendChild(row);
        });
}


// Handle campaign goal submission
document.getElementById('goal-submit-btn').addEventListener('click', function() {
        const goalInput = document.getElementById('campaign-goal-input');
        const goalAmount = parseFloat(goalInput.value);

        if (isNaN(goalAmount)) {
            alert('Please enter a valid amount');
            return;
        }

        if (goalAmount <= 0) {
            alert('Goal amount must be greater than 0');
            return;
        }

        // Here you would typically save the goal amount to your database
        console.log('Campaign goal set to:', goalAmount);
        
        // Show success message
        document.getElementById('success-message').style.display = 'block';
        
        // Hide the message after 3 seconds
        setTimeout(() => {
            document.getElementById('success-message').style.display = 'none';
        }, 3000);
});



saveBtn.addEventListener('click', function() {
    // Get form values
    cancelBtn.style.display = "none";
    const productName = document.getElementById('combo-box-input').value;
    const price = parseFloat(document.getElementById('price').value);
    const quantity = parseInt(document.getElementById('requiredQuantity').value);
    const description = document.getElementById('description').value;
  
    // Validate inputs
    if (!productName || isNaN(price) || isNaN(quantity)) {
      alert('Please fill all required fields with valid values');
      return;
    }

    if (price <= 0) {
        alert('Price must be greater than 0');
        return;
    }
    
    if (quantity <= 0) {
        alert('Quantity must be at least 1');
        return;
    }
  
    totalPerItem = +price * +quantity
    total.push(totalPerItem)
    
    // Add product to array
    addedProducts.push({
      name: productName,
      price: price,
      quantity: quantity,
      description: description
    });
    
  
    // Show submit button
    submitSection.style.display = 'block';

    updateProductTable()

    document.querySelector('.product-table').style.display = 'table';
    document.querySelector('.campaign-goal').style.display = 'block';


    // Clear form (optional)
    form.reset();
  
    // Update product table (you'll need to implement this)
    // updateProductTable();
  });


  finalSubmitBtn.addEventListener('click', async function(e) {
    e.preventDefault();
    
    // Get the submit button
    const submitBtn = document.getElementById("final-submit-btn")

    if (addedProducts.length === 0) {
      alert('Please add at least one product before submitting');
      return;
    }

            
     // Add loading class
     submitBtn.classList.add('loading');
     
     // Simulate form submission (3 seconds)
     setTimeout(function() {
         submitBtn.classList.remove('loading');
     }, 3000);


    const productResponse = await axios.post("http://localhost:7000/campaign/productInfo", {products: addedProducts},  {
        headers: {Authorization: authToken, "X-Campaign-Token": campaignToken}
    });
    

    // Simulate form processing (3 seconds)
    setTimeout(function() {
        // Hide form and show submission card
        homeCard.style.display = 'none';
        videoContainer.style.display =  "none";
        navBar.style.display="none"
        submissionCard.style.display = 'block';
        
        // After 3 more seconds, hide loading message and show completion
        setTimeout(function() {
            document.getElementById('loadingState').style.display = 'none';
        }, 3000);
        
    }, 1500);

    console.log(productResponse, data)

  
    // Here you would typically send the data to your backend
    console.log('Submitting products:',addedProducts, campaignToken, authToken)
    // alert('Campaign submitted successfully with ' + addedProducts.length + ' products!');
    
    // Reset form and products (optional)
    // addedProducts = [];
    // submitSection.style.display = 'none';
    // form.reset();
  });