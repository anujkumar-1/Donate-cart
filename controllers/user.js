import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import Campaign from "../models/campaignCard.js";
import Payment from "../models/payment.js"
import { v4 as uuidv4 } from 'uuid';
import nodemailer from "nodemailer"
import Otp from "../models/OTP.js";
import sequelize from "../utils/database.js";
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // Use `true` for port 465, `false` for all other ports
    auth: {
        user: "jesuoor@gmail.com",
        pass: process.env.NODEMAILER_GMAIL_PASSKEY,
    },
});


  
const sendEmail = async (email, otp, name) => {
    try {

      const info = await transporter.sendMail({
        from: `"YesDonate" <your-email@gmail.com>`,
        to: `${email}`,
        subject: 'no reply - OTP Verification',
        html: `
            <!DOCTYPE html>
            <html lang="en">
            <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Email Template</title>
            <style>
                /* Reset styles */
                body, html {
                margin: 0;
                padding: 0;
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                }

                /* Container */
                .email-container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                border-radius: 8px;
                overflow: hidden;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                }

                /* Header */
                .email-header {
                background-color: #1877f2; /* Facebook blue */
                color: #ffffff;
                text-align: center;
                padding: 20px;
                }

                .email-header h1 {
                margin: 0;
                font-size: 24px;
                }

                /* Body */
                .email-body {
                padding: 20px;
                color: #333333;
                line-height: 1.6;
                }

                .email-body h2 {
                font-size: 20px;
                margin-bottom: 16px;
                }

                .email-body p {
                margin: 0 0 16px;
                }

                .otp-code {
                font-size: 32px;
                font-weight: bold;
                color: #1877f2;
                text-align: center;
                margin: 24px 0;
                }

                /* Footer */
                .email-footer {
                background-color: #f4f4f4;
                padding: 16px;
                text-align: center;
                font-size: 12px;
                color: #666666;
                }

                .email-footer a {
                color: #1877f2;
                text-decoration: none;
                }

                .email-footer a:hover {
                text-decoration: underline;
                }

                /* Responsive Design */
                @media only screen and (max-width: 600px) {
                .email-container {
                    width: 100%;
                    border-radius: 0;
                }

                .email-header h1 {
                    font-size: 20px;
                }

                .email-body h2 {
                    font-size: 18px;
                }

                .otp-code {
                    font-size: 24px;
                }
                }
            </style>
            </head>
            <body>
            <div class="email-container">
                <!-- Header -->
                <div class="email-header">
                <h1>Your OTP Code</h1>
                </div>

                <!-- Body -->
                <div class="email-body">
                <h2>Hello, ${name}!</h2>
                <p>We've received a request to verify your email address. Please use the following OTP (One-Time Password) to complete your verification:</p>
                <div class="otp-code">${otp}</div>
                <p>This OTP is valid for <strong>15 minutes</strong>. Do not share this code with anyone.</p>
                <p>If you didn't request this, please ignore this email or contact support.</p>
                </div>

                <!-- Footer -->
                <div class="email-footer">
                <p>If you have any questions, feel free to <a href="mailto:support@example.com">contact us</a>.</p>
                <p>&copy; 2023 Your Company. All rights reserved.</p>
                </div>
            </div>
            </body>
            </html>
        
        `
    });
      console.log('Email sent: ', info.messageId);
    } catch (error) {
      console.error('Error sending email: ', error);
    }
};
  
//   sendEmail();

export function generateAccessTokens(id, name, email, mobile){
    console.log("id", id, name, email, mobile);
    const token = jwt.sign({userId: id, name:name, email, mobile}, process.env.JWT_TOKEN)
    return token
}





export const signUp = async (req, res)=>{
    try {
        // const t = await sequelize.transaction()
        const username = req.body.name
        const email = req.body.email
        const password = req.body.password
        const mobile = req.body.phone
        const saltrounds = 10

        const userAlreadyExist = await User.findAll({where: {email: email}});
        console.log("userAlreadyExist", userAlreadyExist.length)

        if(userAlreadyExist.length > 0){
            res.status(401).json({message: 'User Already Exist. Try Another'});
            
        }
        else{
            bcrypt.hash(password, saltrounds, async(err, hash)=>{
                if(err){
                
                    throw new Error("Something went wrong")
                }
                const data = await User.create({name: username, email: email, password: hash, mobile: mobile})
                // await t.commit()
                res.status(201).json({user: data, message: "Sucessfully registered"})
            })
            
        }

    } catch (error) {
        // await t.rollback()
        res.json({message: "Internal server error, Please try again"})
        
    }
}


export const login = async (req, res)=>{
    try {
        const email = req.query.email
        const password = req.query.password

        const user = await User.findAll({
            where: {
              email: email
            },
        });
        console.log(user)

        if (user.length > 0) {
            bcrypt.compare(password, user[0].password, function(err, result) {
                // result == true
                if(err){
                    res.json({message: "Internal server error, Please try again"})
                }
                if(result===true){
                    console.log("user result", user[0].id, user[0].name, user[0].email, user[0].mobile, user[0].password)
                    res.status(200).json({user: user, message: "logged in sucessfully", token: generateAccessTokens(user[0].id, user[0].name, user[0].email, user[0].mobile)});
                }
                else{
                    res.status(401).json({message: "incorrect passoword, Please try again"});
                }
            });
            
            
        }else {
            res.status(404).json({ message: 'User not found' });
        }
        
        
        
    } catch (error) {
        res.json({message: "Internal server error, Please try again"})
    }
}


export const postBasicDetails = async (req, res)=>{
    try {
        const campaign = req.body.category
        const name = req.body.name
        const email = req.body.email
        const mobile = req.body.phone
        const otp = generateOTP()


        console.log(name, email, mobile, otp)
        // to check if email is already registered
        const userRegistered = await Otp.findAll({where: {email: email}})
        console.log(userRegistered.length)
        if(userRegistered.length > 0){
            const prevTime = new Date(userRegistered[0].updatedAt);
            const currTimeUTC = new Date(); 
            const currTimeIST = convertToIST(currTimeUTC);
            const diffInMinutes = Math.floor((currTimeIST - prevTime) / (1000 * 60));
            console.log("diffInMinutes", diffInMinutes)
            if(diffInMinutes > 15){
                const updateOtp = await Otp.update({otp: otp}, { where: { email: email} })
                sendEmail(email, otp, name)
                res.status(200).json({otpTable: updateOtp, message: "Updated OTP sent" })
            }
            else{
                res.status(200).json({otpTable:userRegistered, message: "Previous OTP still valid" })
            }
        }
        else{
            const data = await User.create({name: name, email: email, mobile: mobile})
            const otpData = await Otp.create({otp: otp, email: email})
            sendEmail(email, otp, name)
            res.status(201).json({userTable: data, otp, message: "New OTP sent"})
        }

    } catch (error) {
        res.json({message: "Internal server error, Please try again"})
    }
}


export const verifyOTP = async (req, res)=>{
    try {
        const {email, userOTP} = req.query
        const OTP = await Otp.findAll({where: {email: email}})
        const user= await User.findAll({where: {email:email}})
        console.log("otp", OTP[0].email, OTP[0].otp, OTP[0].updatedAt)

        if(OTP.length > 0){
            if(userOTP == OTP[0].otp){
                res.status(200).json({ message: "OTP Verified", username: user[0].name,  token: generateAccessTokens(user[0].id, user[0].name, user[0].email, user[0].mobile)})
            }
            else{
                res.status(401).json({message: "Incorrect OTP"});
            }
        }
        else{
            res.json({message: "Internal Server Error"})
        }
        
    } catch (error) {
        res.json({error: error})
    }
}


export const getProfileData = async(req, res)=>{
    try {
        const email = req.params.email
        const campaignCount = await Payment.findAndCountAll({
            where: {email: email, status: "success"},
            attributes: [
                [sequelize.fn('COUNT', sequelize.col('email')), 'count'],
                [sequelize.fn('SUM', sequelize.col('amount')), 'totalAmount']
            ],
            raw: true
        })
        
        res.status(200).json({profileData: campaignCount, email})
        
    } catch (error) {
        console.log(error)
    }
}

function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000); // Generate 6-digit OTP
}


function convertToIST(date) {
    return new Date(date.getTime() + (5.5 * 60 * 60 * 1000)); // Add 5.5 hours to convert UTC to IST
}