import {intiateDonationPostReq, updateDonationSuccessReq, updateDonationFailedReq} from "../controllers/payment.js"
import {authLimiter, apiLimiter} from "../middleware/rateLimitter.js"
import auth from "../middleware/auth.js"
import express from "express"
const router=express.Router()

router.post("/intiateDonation", authLimiter, intiateDonationPostReq)
router.post("/updateDonationStatus", authLimiter, updateDonationSuccessReq)
router.post("/updateErrorStatus", authLimiter, updateDonationFailedReq)

export default router;