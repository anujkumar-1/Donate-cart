 // Campaign data (from your provided JSON)
const liApproved= document.getElementById("approved-li")
const liRejected= document.getElementById("rejected-li")
const liDashboard= document.getElementById("dashboard-li")
const liLogout = document.getElementById("logout-li")


 let campaign = null
 const routes = {
    "/home": "<h1>Pending Campaigns</h1>",
    "/approved": "<h1>Approved Campaigns</h1>",
    "/rejected":  "<h1>Rejected Campaigns</h1>",
    "/users":  "<h1>Users</h1>",
    "/settings":  "<h1>Settings</h1>",
    "/logout":  "<h1></h1>"

  };

  
function combinedProductAndCampaignData(response){
    return response.data.campaignData.map(campaign => {
        // Find the matching products for this campaign
        const products = response.data.uploadProducts.find(
            product => product.campaignUniqueId === campaign.campaignUniqueId
        );
        
        // Return a new object combining campaign data with its products
        return {
            ...campaign,
            products: products ? products.product : [] // Include empty array if no products found
        };
    });
}

 async function loadCampaignData(){
     const response = await axios.get("http://localhost:7000/admin/getAllCampaigns")
     console.log(response.data.uploadProducts)
    console.log(response.data.campaignData[0].productTables[0].product)
     console.log("Data loaded:", campaign);
     renderCampaigns(response.data.campaignData);

 }

 window.addEventListener("DOMContentLoaded", loadCampaignData);

 console.log(campaign); // Always up-to-date



 

 // DOM Elements
 const campaignsContainer = document.getElementById('campaignsContainer');
 const campaignModal = document.getElementById('campaignModal');
 const modalTitle = document.getElementById('modalTitle');
 const modalBody = document.getElementById('modalBody');
 const closeModal = document.getElementById('closeModal');
 const approveCampaign = document.getElementById('approveCampaign');
 const rejectCampaign = document.getElementById('rejectCampaign');
 const toast = document.getElementById('toast');

 // Current selected campaign
 let currentCampaign = null;

 // Format currency
 const formatCurrency = (amount) => {
     return new Intl.NumberFormat('en-IN', {
         style: 'currency',
         currency: 'INR',
         maximumFractionDigits: 0
     }).format(amount);
 };

 // Format date
 const formatDate = (dateString) => {
     const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
     return new Date(dateString).toLocaleDateString('en-IN', options);
 };

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

 // Render campaign cards
 const renderCampaigns = (campaigns) => {
     campaignsContainer.innerHTML = '';
     
     campaigns.forEach(campaign => {
         const card = document.createElement('div');
         card.className = 'campaign-card';
         card.innerHTML = `
             <div class="campaign-image">
                 <img src="${campaign.campaignImgLink}" alt="${campaign.campaignTitle}">
             </div>
             <div class="campaign-content">
                 <div class="campaign-status">${campaign.status}</div>
                 <h3 class="campaign-title">${campaign.campaignTitle}</h3>
                 <p class="campaign-description">${campaign.campaignDescription.substring(0, 150)}...</p>
                 <div class="campaign-meta">
                     <span class="campaign-beneficiary"><i class="fas fa-user"></i> ${campaign.nameOfBeneficiary}</span>
                     <span class="campaign-location"><i class="fas fa-map-marker-alt"></i> ${campaign.cityOfTheBeneficiary}, ${campaign.stateOfTheBeneficiary}</span>
                 </div>
                 <div class="campaign-goal">Goal: ${formatCurrency(campaign.campaignGoalAmount)}</div>
                 <div class="campaign-actions">
                     <button class="btn btn-view view-btn" data-id="${campaign.campaignUniqueId}">
                         <i class="fas fa-eye"></i> View
                     </button>
                     <button class="btn btn-approve approve-btn" data-id="${campaign.campaignUniqueId}">
                         <i class="fas fa-check"></i> Approve
                     </button>
                     <button class="btn btn-reject reject-btn" data-id="${campaign.campaignUniqueId}">
                         <i class="fas fa-times"></i> Reject
                     </button>
                 </div>
             </div>
         `;
         campaignsContainer.appendChild(card);
     });

     // Add event listeners to buttons
     document.querySelectorAll('.view-btn').forEach(btn => {
         btn.addEventListener('click', (e) => {
             const campaignId = e.target.getAttribute('data-id')
             console.log("first", campaignId, campaigns)
             openCampaignModal(campaignId, campaigns);
         });
     });

     document.querySelectorAll('.approve-btn').forEach(btn => {
         btn.addEventListener('click', async (e) => {
             const campaignId = e.target.getAttribute('data-id')
             const approvedCampaign = await axios.post(`http://localhost:7000/admin/approveCampaign/${campaignId}`)
             console.log("first1", campaignId, campaigns, approvedCampaign)
             approveCampaignById(campaignId, campaigns);
         });
     });

     document.querySelectorAll('.reject-btn').forEach(btn => {
         btn.addEventListener('click', async(e) => {
             const campaignId = e.target.getAttribute('data-id')
            const rejectCampaign = await axios.post(`http://localhost:7000/admin/rejectCampaign/${campaignId}`)
             console.log("first2", campaignId, campaigns, rejectCampaign)
             rejectCampaignById(campaignId, campaigns);
         });
     });
 };

 // Open campaign modal with details
 const openCampaignModal = (campaignId, campaigns) => {
     currentCampaign = campaigns.find(c => c.campaignUniqueId === campaignId);
     console.log("currentCampaign", currentCampaign.productTables[0].product.length)
     if (!currentCampaign) return;
     
     modalTitle.textContent = currentCampaign.campaignTitle;
     
     // Format products list
     let productsHtml = '';
     currentCampaign.productTables[0].product.forEach(product => {
         productsHtml += `
             <div class="product-item">
                 <span class="product-name">${product.name}</span>
                 <div class="product-meta">
                     <span>Qty: ${product.quantity}</span>
                     <span>Price: ${formatCurrency(product.price)}</span>
                 </div>
             </div>
         `;
     });
     
     modalBody.innerHTML = `
         <div class="campaign-detail-row">
             <div class="campaign-detail-image">
                 <img src="${currentCampaign.campaignImgLink}" alt="${currentCampaign.campaignTitle}">
             </div>
             <div class="campaign-detail-info">
                 <div class="detail-item">
                     <div class="detail-label">Beneficiary</div>
                     <div class="detail-value">${currentCampaign.nameOfBeneficiary} (${currentCampaign.typeOfTheCampaign})</div>
                 </div>
                 <div class="detail-item">
                     <div class="detail-label">Contact</div>
                     <div class="detail-value">${currentCampaign.mobileOftheBeneficiary} | ${currentCampaign.emailOfTheCampaigner}</div>
                 </div>
                 <div class="detail-item">
                     <div class="detail-label">Location</div>
                     <div class="detail-value">${currentCampaign.cityOfTheBeneficiary}, ${currentCampaign.stateOfTheBeneficiary}</div>
                 </div>
                 <div class="detail-item">
                     <div class="detail-label">Goal Amount</div>
                     <div class="detail-value">${formatCurrency(currentCampaign.campaignGoalAmount)}</div>
                 </div>
                 <div class="detail-item">
                     <div class="detail-label">Created On</div>
                     <div class="detail-value">${formatDate(currentCampaign.createdAt)}</div>
                 </div>
             </div>
         </div>
         <div class="detail-item">
             <div class="detail-label">Description</div>
             <div class="detail-value" style="white-space: pre-line;">${currentCampaign.campaignDescription}</div>
         </div>
         <div class="products-list">
             <h3>Requested Products (${currentCampaign.productTables[0].product.length})</h3>
             ${productsHtml}
         </div>
         <button class="btn btn-approve approve-model-btn" data-id="${currentCampaign.campaignUniqueId}">
             <i class="fas fa-check"></i> Approve
         </button>
         <button class="btn btn-reject reject-model-btn" data-id="${currentCampaign.campaignUniqueId}">
             <i class="fas fa-times"></i> Reject
         </button>
     `;
     
     campaignModal.style.display = 'flex';

     const approveBtnModel = document.querySelector(".approve-model-btn")
     const rejectBtnModel = document.querySelector(".reject-model-btn")

     console.log(approveBtnModel, rejectBtnModel)
     // Modal approve/reject buttons
     
     approveBtnModel.addEventListener('click', async(e) => {
         const campaignId = e.target.getAttribute('data-id');
         const approvedCampaign = await axios.post(`http://localhost:7000/admin/approveCampaign/${campaignId}`)
         console.log("right", campaignId, campaigns) 
         approveCampaignById(campaignId, campaigns);
     });
 

     rejectBtnModel.addEventListener('click', async(e) => {
         const campaignId = e.target.getAttribute('data-id')
         const rejectCampaign = await axios.post(`http://localhost:7000/admin/rejectCampaign/${campaignId}`)
         console.log("left", campaignId, campaigns)
         rejectCampaignById(campaignId, campaigns);
     });
     


 };

 // Close modal
 closeModal.addEventListener('click', () => {
     campaignModal.style.display = 'none';
 });

 // Approve campaign
 const approveCampaignById = (campaignId, campaigns) => {
     const campaignIndex = campaigns.findIndex(c => c.campaignUniqueId === campaignId);
     console.log(currentCampaign, campaignIndex)
     if (campaignIndex !== -1) {
         campaigns[campaignIndex].status = 'approved';
         showToast('Campaign approved successfully!', 'success');
         renderCampaigns(campaigns);
         console.log("first100", campaignIndex)
         // If the approved campaign is currently open in modal, close the modal
         if (currentCampaign && currentCampaign.campaignUniqueId === campaignId) {
             campaignModal.style.display = 'none';
         }
     }
 };

 // Reject campaign
 const rejectCampaignById = (campaignId, campaigns) => {
     const campaignIndex = campaigns.findIndex(c => c.campaignUniqueId === campaignId);
     if (campaignIndex !== -1) {
         campaigns[campaignIndex].status = 'rejected';
         showToast('Campaign rejected.', 'error');
         renderCampaigns(campaigns);
         console.log("first100", campaignIndex)

         // If the rejected campaign is currently open in modal, close the modal
         if (currentCampaign && currentCampaign.campaignUniqueId === campaignId) {
             campaignModal.style.display = 'none';
         }
     }
 };

 

 // Close modal when clicking outside
 window.addEventListener('click', (e) => {
     console.log(e.target)
     if (e.target === campaignModal) {
        console.log(e)
         campaignModal.style.display = 'none';
     }
 });




// Handle link clicks
document.querySelectorAll(".sidebar-menu-a").forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const path = e.target.getAttribute("href");
      console.log(path);
      if (path === "/approved") {
        console.log(2);
      } else if (path === "/rejected") {
        console.log(3);
      } else if (path === "/users") {
        console.log(4);
      } else if (path === "/settings") {
        console.log(5);
      } else if (path === "/logout") {
        console.log(6);
      } else {
        console.log("Home");
      }
      history.pushState(null, null, path); // Update URL
      document.getElementById("heading").innerHTML = routes[path]; // Update content
    });
  });

  // Handle back/forward buttons
  window.addEventListener("popstate", () => {
    const path = window.location.pathname;
    console.log("path", path)
    document.getElementById("heading").innerHTML = routes[path] || "<h1>404 Not Found</h1>";
  });

liApproved.addEventListener("click", async (e)=>{
    const response = await axios.get("http://localhost:7000/admin/getAllApprovedCampaigns")
    console.log(response);
    renderCampaigns(response.data.campaignData)
    console.log("li got clicked")
}) 

liRejected.addEventListener("click", async (e)=>{
    const response = await axios.get("http://localhost:7000/admin/getAllRejectedCampaigns")
    console.log(response);
    renderCampaigns(response.data.campaignData)
    console.log("lit got clicked")
}) 

liDashboard.addEventListener("click", loadCampaignData)

liLogout.addEventListener("click", (e)=>{
    showToast("You have been logged out successfully", "success")
    window.location.href = "./Admin"
})
