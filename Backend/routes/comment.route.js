import { Router } from "express";
import { 
    addComment,
    getComments,
    updateComment,
    deleteComment
} from "../controllers/comment.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";


const router = Router()
router.use(verifyJWT)
router.route("/:id")
.post(addComment)
.get(getComments)
.put(updateComment)
.delete(deleteComment)

export default router