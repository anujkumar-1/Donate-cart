import Payment from "../models/payment.js";
import dotenv from 'dotenv';
import Razorpay from "razorpay";
import Campaign from "../models/campaignCard.js";

dotenv.config()

export const intiateDonationPostReq = async(req, res)=>{
    try {
        const {name, email, phone, nationality, amount, currency, isAnonymous, whatsappUpdates, token} = req.body;

        var rzp = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        });

        let amountInPesa = Math.floor(amount * 100)
        rzp.orders.create({ amount: amount*100, currency: "INR" }, async (err, order) => {
            if (err) {
                throw new Error(JSON.stringify(err));
            }
            const data = await Payment.create({orderid: order.id, status: "pending", name:name, email:email, phone:phone, amount:amount, isAnonymous:isAnonymous, whatsappUpdates:whatsappUpdates, campignUniqueId: token});
            res.status(201).json({ order, key_id: rzp.key_id, status: "pending", data});
        });

    } catch (error) {
        throw new Error(JSON.stringify(error));
    }
}


export const updateDonationSuccessReq  = async(req, res)=>{
    try {
        const { order_id, payment_id, token} = req.body;

        const response = await Payment.update({paymentid: payment_id, status: "success", campignUniqueId: token}, {where:{orderid: order_id}});  

        const backersCount = await Payment.count({
            where:{
                campignUniqueId: token,
                status: "success"
            }
        })
        const totalDonationReceived = await Payment.sum('amount', {where:{
            campignUniqueId: token,
            status: "success"
        }}); 


        const updateCampaignTable = await Campaign.update({amountRaised: totalDonationReceived, backerCount: backersCount}, {
            where:{campaignUniqueId: token}
        })

        res.status(200).json({sucess: true, message: "your donation is successful", response, backersCount, totalDonationReceived});  
    } catch (error) {
        throw new Error(error);
    }
}

export const updateDonationFailedReq = async function (req, res) {
    try {
        
    const { order_id, payment_id, token } = req.body;
   
    const response = await Payment.update({paymentid: payment_id, status: "failed", campignUniqueId: token}, {where:{orderid: order_id}});
      res.status(200).json({ sucess: false, message: "Transaction Failed", response });
    } catch (error) {
      throw new Error(error);
    }
};
