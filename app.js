import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';
import { fileURLToPath } from 'url';
dotenv.config()
const app= express()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(cors())



app.use(express.json({ limit: "50mb" }))
app.use(express.urlencoded({ limit: "50mb", extended: true })); 

app.use(express.static(path.join(__dirname, 'Public')));
console.log("expxessss", express.static(path.join(__dirname, 'Public')))



// Derive __dirname in ES module scope


import {sequelize} from "./models/relation.js"
import userRoute from "./routes/user.js"
import campaignRoute from "./routes/campaign.js"
import adminRoute from "./routes/admin.js"
import paymentRoutes from "./routes/payment.js"

app.use("/user", userRoute)
app.use("/campaign", campaignRoute)
app.use("/admin", adminRoute)
app.use("/payment", paymentRoutes)

app.get('/Campaign_Description', (req, res) => {
    res.sendFile(path.join(__dirname, 'Public', 'Campaign_Description.html'));
});
// app.use('/', (req, res) => {
//     console.log("urlll", req)
//   res.sendFile(path.join(__dirname, 'Public', 'Signup.html'));
// });


app.get('/:page?', (req, res, next) => {
    let page = req.params.page || 'Homepage'; // default to index
    console.log("first", page)
    let filePath = path.join(__dirname, 'Public', `${page}.html`);

    const validAdminPages = ['home', 'approved', 'rejected', 'settings', 'logout'];

  
    if (validAdminPages.includes(page)) {
        // Send admin.html for all valid admin pages
        const adminPath = path.join(__dirname, 'Public', 'Admin_Dashboard.html');
        return res.sendFile(adminPath);
    } else {
        // Handle other pages normally
        const filePath = path.join(__dirname, 'Public', `${page}.html`);
        res.sendFile(filePath, (err) => {
            if (err) {
                next(); // Proceed to 404 handler if file not found
            }
        });
    }
});





// Optional: 404 page
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});


sequelize.sync({}).then(result=>{
    app.listen(7000, ()=>{
        console.log("Server is running on port 7000")
    })
    console.log("database connected sucessfully")
}).catch(err=>{
    console.log(err)
})
