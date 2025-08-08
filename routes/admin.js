import {verifyAdmin, getAllCampaigns, approveCampaign, rejectCampaign, getAllApprovedCampaign, getAllRejectedCampaign} from "../controllers/admin.js"
import {authLimiter, apiLimiter} from "../middleware/rateLimitter.js"
import auth from "../middleware/auth.js"
import express from "express"
const router=express.Router()



router.get("/verify", authLimiter, verifyAdmin)
router.get("/getAllCampaigns", apiLimiter, getAllCampaigns)
router.post("/approveCampaign/:campaignId", authLimiter, approveCampaign)
router.post("/rejectCampaign/:campaignId", authLimiter, rejectCampaign)
router.get("/getAllApprovedCampaigns", authLimiter, getAllApprovedCampaign)
router.get("/getAllRejectedCampaigns", authLimiter, getAllRejectedCampaign)
export default router;