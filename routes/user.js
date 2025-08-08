import {signUp, login, postBasicDetails, verifyOTP, getProfileData} from "../controllers/user.js"
import {authLimiter, apiLimiter} from "../middleware/rateLimitter.js"
import auth from "../middleware/auth.js"
import express from "express"
const router=express.Router()



router.post("/signup", authLimiter, signUp)
router.get("/login",  authLimiter, login)
router.post("/basicInfo", authLimiter, postBasicDetails)
router.get("/verify", authLimiter, verifyOTP)
router.get("/userInfo/:email", apiLimiter, getProfileData)

export default router;