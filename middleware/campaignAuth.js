import User from "../models/user.js"
import jwt from "jsonwebtoken"

const campaignAuth = async (req, res, next)=>{
    try {
        const campaignToken = req.header("X-Campaign-Token")
        const campaign= jwt.verify(campaignToken, process.env.JWT_TOKEN) 
        // const getCurrentUser = await User.findByPk(user.email)
        
        console.log(campaign)
        // req.activeUser = getCurrentUser
        req.campaign = campaign
        next()
    } catch (error) {
        console.error("auth :", error)
        res.status(500).json({message: "internal server error in auth"})
    }
}
export default campaignAuth;