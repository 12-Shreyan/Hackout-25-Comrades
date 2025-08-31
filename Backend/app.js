import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

import userRouter from "./routes/user.route.js"
import reportRouter from "./routes/report.route.js"
import adminRouter from "./routes/admin.route.js"
import commentRouter from "./routes/comment.route.js"

app.use("/api/users",userRouter)
app.use("/api/reports",reportRouter)
app.use("/api/admin/users",adminRouter)
app.use("/api/comments",commentRouter)

app.use('/',(req,res)=>{
    res.send('404: page not found')
})

export { app }