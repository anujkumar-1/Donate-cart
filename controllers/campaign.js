import dotenv from 'dotenv';
import Campaign from '../models/campaignCard.js';
import User from '../models/user.js';
import Products from '../models/product.js';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
dotenv.config()

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";


export function generateAccessTokens(id, mobile, email,  campaignId, userId){
    console.log(id, mobile, email, campaignId, userId)
    const token = jwt.sign({campaignPrimaryKey: id, phoneOfEntity:mobile, emailOfCampaigner: email, campaignId: campaignId, userId}, "bitcoin101")
    console.log(token)
    return token
}


// AWS S3 Configuration
const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

export const ngoAndIndividualDetails  = async (req, res) => {
    try {
        const {name, state, city, type, phone} = req.body
        console.log(name, state, city, type, phone)
        
        const createCampaignData = await Campaign.create({userId: req.user.userId, nameOfBeneficiary: name, mobileOftheBeneficiary: phone, stateOfTheBeneficiary: state, cityOfTheBeneficiary: city, typeOfTheCampaign: type, emailOfTheCampaigner: req.user.email, campaignUniqueId: uuidv4()})
        console.log(createCampaignData.campaignId)
        const userDetail = await User.findAll({where: {email : req.user.email}})
        console.log("campaign", createCampaignData.id, createCampaignData.mobileOftheBeneficiary, createCampaignData.emailOfTheCampaigner,  createCampaignData.campaignUniqueId, createCampaignData.userId)
        res.status(200).json({sucess: true, campaignToken:generateAccessTokens(createCampaignData.id, createCampaignData.mobileOftheBeneficiary, createCampaignData.emailOfTheCampaigner,  createCampaignData.campaignUniqueId, createCampaignData.userId),  createCampaignData, userDetail})

        
        
    } catch (error) {
        res.json({msg: "Internal Server Error", error, sucess: false})
    }

}




export const createACampaign = async (req, res) => {
    try {
        const file = req.file;
        const { title, message,  goalAmount, campaignSubheading} = req.body;
        console.log("title", title, message, goalAmount, campaignSubheading)
        // Generate a unique filename
        const fileName = `uploads/${Date.now()}-${file.originalname}`;

        // Upload to S3
        const uploadParams = {
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key: fileName,
            Body: file.buffer,
            ContentType: file.mimetype,
            ACL: "public-read", // Makes it publicly accessible (optional)
        };

        const command = new PutObjectCommand(uploadParams);
        await s3.send(command);

        // Generate File URL
        const fileUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
        console.log(fileUrl, title, message, req.user, req.campaign)        
        const updateCampaignInfo = await Campaign.update({campaignTitle: title,  campaignImgLink:fileUrl, campaignDescription:message, campaignGoalAmount: goalAmount, }, {where: {campaignUniqueId : req.campaign.campaignId}})

        console.log("campID", req.campaign.campaignId)
        // const campaignData = await Campaign.create({campaignTitle:title, campaignImgLink:fileUrl, campaignDescription:message})

        res.status(201).json({
            message: "File uploaded successfully",
            authInfo: req.user,
            campaignInfo: req.campaign,
            fileUrl,
            title,
            message,
            success: true
        });

    } catch (error) {
        console.error("S3 Upload Error:", error);
        res.status(500).json({ error: "File upload failed" });
    }
   
}


export const createProducts = async(req, res)=>{
    try {
        const {products} = req.body
        console.log(products, req.campaign.campaignId)
        const allCampaignData= await Campaign.findAll({where:{campaignUniqueId:req.campaign.campaignId}})

        const productAlreadyExist = await Products.findAll({where: {campaignUniqueId: req.campaign.campaignId}})
        console.log(productAlreadyExist," Product ")
        if(productAlreadyExist.length>0){
            const productArr=await Products.update({product: products}, {where: {campaignUniqueId: req.campaign.campaignId}})
            res.status(200).json({sucess: true, uploadProducts: productAlreadyExist, updated:true, campaignData: allCampaignData})
        }else{
            const uploadProducts = await Products.create({campaignUniqueId: req.campaign.campaignId, product: products, campaignId: req.campaign.campaignPrimaryKey})
            console.log("uploadProducts", uploadProducts)
            res.status(201).json({sucess: true, uploadProducts: uploadProducts, campaignData: allCampaignData})
        }      
         


    } catch (error) {
        res.status(500).json({ error: "Products upload failed" });

    }
}

export const getAllCampaigns= async(req, res)=>{
    try {
       const page = +req.params.pageId 
       const campaignPerReq= 6
       const response = await Campaign.findAll({
        where: {status: "approved"},
          limit: campaignPerReq,
          offset: (page - 1) * campaignPerReq,
          attributes: ['campaignUniqueId', 'nameOfBeneficiary', 'campaignTitle', 'campaignDescription', 'campaignImgLink', 'campaignGoalAmount', 'amountRaised', 'backerCount', 'updatedAt', 'status'],

       }); 

    //    const allProducts = await Products.findAll({}); 

       const campaigns = await Campaign.findAll({
            include: [{
                model: Products,
                attributes: ['product'] 
            }],
            limit: campaignPerReq,
            offset: (page - 1) * campaignPerReq,
            attributes: ['id', 'campaignUniqueId', 'nameOfBeneficiary', 'campaignTitle', 'campaignDescription', 'campaignImgLink', 'campaignGoalAmount', 'amountRaised', 'backerCount', 'updatedAt'],
            order: [['updatedAt', 'ASC']], // Optional: order by creation date

        });
       res.status(200).json({campaignData: response, campaigns:campaigns, page: page, lastPage: Math.floor(response.length / campaignPerReq)})
    } catch (error) {
        console.log(error)
    }
}


export const searchAllCampaign = async(req, res)=>{
    try {
        const response = await Campaign.findAll({
            where: {status: "approved"},
            attributes: ['campaignUniqueId', 'nameOfBeneficiary', 'campaignTitle', 'campaignDescription', 'campaignImgLink'],
        });

        // const campaigns = await Campaign.findAll({
        //     where: {
        //       [Op.or]: [
        //         { 
        //           campaignTitle: { 
        //             [Op.like]: `%${searchTerm}%` 
        //           } 
        //         },
        //         { 
        //           campaignDescription: { 
        //             [Op.like]: `%${searchTerm}%` 
        //           } 
        //         }
        //       ]
        //     }
        //   });

        const allProducts = await Products.findAll({}); 
        res.status(200).json({campaignData: response,  uploadProducts: allProducts})

    } catch (error) {
        console.log(error)        
    }
}


export const findCampaign = async (req, res)=>{
    try {
        const campaignUUID = req.params.campaignId;

        const campResponse = await Campaign.findOne({where : {campaignUniqueId: campaignUUID}})
        console.log("campResponse", campResponse)
        const result = await Campaign.findOne({
            where: { id: campResponse.id},
            include: [{
              model: Products,
              attributes: ['product'] 
            }],
            attributes: ['id', 'campaignUniqueId', 'nameOfBeneficiary', 'campaignTitle', 'campaignDescription', 'campaignImgLink', 'campaignGoalAmount', 'amountRaised', 'backerCount', 'updatedAt'],
        });


        
        res.status(200).json({campaignData:result })
    } catch (error) {
        console.log(error)
    }
}

export const getAllMyCampaigns = async (req, res)=>{
    try {
        const useremail = req.params.email;
        const response = await Campaign.findAll({
            where: {emailOfTheCampaigner: useremail},
            attributes: ['campaignTitle', 'campaignImgLink', 'campaignGoalAmount', 'amountRaised', 'backerCount', 'status', 'emailOfTheCampaigner'],
        })

        const totalAmountOfFundraiser = await Campaign.sum('amountRaised', {where: {emailOfTheCampaigner: useremail}})
        const totalDonors = await Campaign.sum('backerCount', {where: {emailOfTheCampaigner: useremail}})

        res.status(200).json({fundraiser:response, totalAmountOfFundraiser, totalDonors})

    } catch (error) {
        console.log(error)
    }
}