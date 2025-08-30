import { Router } from "express";
import { 
    allUsers,
    toggleAccess,
    deleteUser
} from "../controllers/admin.controller.js";
import {upload} from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";
import isAdmin from "../middlewares/isAdmin.middleware.js";


const router = Router()

// GET /api/admin/users → List all users (with points & roles).
router.route("/").get(verifyJWT,isAdmin,allUsers)


// PATCH /api/admin/users/:id/role → Promote/demote user to admin.
router.route("/:id/role").patch(verifyJWT,isAdmin,toggleAccess)

// DELETE /api/admin/users/:id → Remove abusive users.
router.route("/:id").delete(verifyJWT,isAdmin,deleteUser)

export default router