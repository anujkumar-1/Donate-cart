import User from "../models/user.js";
import Products from "../models/product.js";
import Campaign from "../models/campaignCard.js";
export const verifyAdmin= async(req, res)=>{
    try {
        const email = req.query.email
        console.log(email)
        const response = await User.findAll({where:{email:email}})
        console.log(response)
        if(response[0].isAdmin=="admin"){
            res.json({success: true})
        }
        else{
            res.json({success: false})
        }
        
    } catch (error) {
        res.json({success: false})
    }
    
}

export const getAllCampaigns = async(req, res)=>{
    try {
        const getAllCampaigns = await Campaign.findAll({
            where: {status: "pending"},
             include: [{
                model: Products,
                attributes: ['product'] 
            }]
        })
        console.log("4fir", getAllCampaigns)
        const getAllProducts = await Products.findAll({})
        console.log("5fir", getAllProducts)

        res.status(200).json({campaignData: getAllCampaigns, uploadProducts: getAllProducts})
    } catch (error) {
        console.log(error)
    }
}

export const approveCampaign = async (req, res)=>{
    try {
        const campaignId = req.params.campaignId
        const response = await Campaign.update({status: "approved"}, {where: {campaignUniqueId : campaignId}})
        res.status(200).json({updatedData: response})


    } catch (error) {
        console.log(error)
    }
}


export const rejectCampaign = async (req, res)=>{
    try {
        const campaignId = req.params.campaignId
        const response = await Campaign.update({status: "rejected"}, {where: {campaignUniqueId : campaignId}})
        res.status(200).json({updatedData: response})


    } catch (error) {
        console.log(error)
    }
}

export const getAllApprovedCampaign = async (req, res)=>{
    try {
        const getAllApprovedCampaigns = await Campaign.findAll({
            where: {status: "approved"},
            include: [{
                model: Products,
                attributes: ['product'] 
            }],
        })
        res.status(200).json({campaignData: getAllApprovedCampaigns})

    } catch (error) {
        console.log(error)
    }
}

export const getAllRejectedCampaign = async (req, res)=>{
    try {
        const getAllApprovedCampaigns = await Campaign.findAll({
            where: {status: "rejected"},
            include: [{
                model: Products,
                attributes: ['product'] 
            }],
        })
        res.status(200).json({campaignData: getAllApprovedCampaigns})

    } catch (error) {
        console.log(error)

    }
}