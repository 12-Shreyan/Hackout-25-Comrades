import { Router } from "express";
import { 
    loginUser, 
    logoutUser, 
    registerUser, 
    refreshAccessToken, 
    changeCurrentPassword, 
    updateUserAvatar, 
    updateAccountDetails,
    userProfile,
    deleteProfile,
    userContributions,
    topContributors,
    userContributionProfile
} from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";


const router = Router()

router.route("/register").post(
    upload.single('avatar'),
    registerUser
    )

router.route("/login").post(loginUser)

//secured routes
router.route("/refresh-token").post(refreshAccessToken)
router.route("/logout").post(verifyJWT,  logoutUser)
router.route("/me").get(verifyJWT,  userProfile).delete(verifyJWT,deleteProfile)
router.route("/update-account").patch(verifyJWT, updateAccountDetails)
router.route("/change-password").post(verifyJWT, changeCurrentPassword)
router.route("/avatar").patch(verifyJWT, upload.single("avatar"), updateUserAvatar)


router.route("/:id/contributions").get(userContributions)
router.route("/leaderboard").get(topContributors)

router.route("/:id").get(verifyJWT,userContributionProfile)
export default router