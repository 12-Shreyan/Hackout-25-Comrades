import { Router } from "express";
import { 
    allUsers,
    toggleAccess,
    deleteUser
} from "../controllers/admin.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import isAdmin from "../middlewares/isAdmin.middleware.js";


const router = Router()
router.use(verifyJWT)
router.use(isAdmin)

router.route("/").get(allUsers)
router.route("/:id/role").patch(toggleAccess)
router.route("/:id").delete(deleteUser)

export default router