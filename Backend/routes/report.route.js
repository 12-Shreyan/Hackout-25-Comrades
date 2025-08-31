import { Router } from "express";
import { 
    createReport,
    allReports,
    reportDetails,
    updateReport,
    deleteReport,
    changeStatus
} from "../controllers/report.controller.js";
import {upload} from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";
import isAdmin from "../middlewares/isAdmin.middleware.js";


const router = Router()

router.route("/")
.post(
    verifyJWT,
    upload.fields([{name:"mangroove",maxCount:3}]),
    createReport
)
.get(allReports)


router.route("/:id")
.get(reportDetails)
.put(verifyJWT,upload.fields([{name:"mangroove",maxCount:3}]),updateReport)
.delete(verifyJWT,deleteReport)


router.route("/:id/status/:status").patch(verifyJWT,isAdmin,changeStatus)


export default router