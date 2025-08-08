import express from "express"
import multer from "multer";
const upload = multer({ storage: multer.memoryStorage() });
import auth from "../middleware/auth.js"
import campaignAuth from "../middleware/campaignAuth.js"
import {authLimiter, apiLimiter} from "../middleware/rateLimitter.js"
import {ngoAndIndividualDetails, createACampaign, createProducts, getAllCampaigns, searchAllCampaign, findCampaign, getAllMyCampaigns} from "../controllers/campaign.js"
const router=express.Router()

router.post("/basicInfo", authLimiter, auth, ngoAndIndividualDetails)

router.post("/campaignDetails", upload.single("file"), auth, campaignAuth, createACampaign)

router.post("/productInfo",  auth, campaignAuth, createProducts)

router.get("/getCampaigns/:pageId",apiLimiter , getAllCampaigns)

router.get("/findCampaign/:campaignId", apiLimiter, findCampaign)

router.get("/searchAllCampaign", apiLimiter, searchAllCampaign)

router.get("/getMyCampaigns/:email", apiLimiter, getAllMyCampaigns)


export default router