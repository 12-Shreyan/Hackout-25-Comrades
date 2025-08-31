import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import {deleteImageByUrl, uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { Report } from "../models/report.model.js";
import mongoose from "mongoose";


const createReport=asyncHandler(async(req,res)=>{
    const userId = new mongoose.Types.ObjectId(req.user._id);
    
    const { title, description,  longitude, latitude } = req.body;

    if (!title || !description) {
        throw new ApiError(400, "Title and description are required");
    }
    if (!longitude || !latitude) {
        throw new ApiError(400, "Longitude and latitude are required");
    }

    let imageUrls = [];

    if (req.files?.mangroove) {
        for (const file of req.files.mangroove) {
            const uploadRes = await uploadOnCloudinary(file.buffer); // ✅ use buffer
            if (uploadRes?.secure_url) imageUrls.push(uploadRes.secure_url);
        }
    }


    const report = await Report.create({
        title:title,
        description:description,
        imageUrl: imageUrls,
        userId: userId,
        location: {
            type: "Point",
            coordinates: [parseFloat(longitude), parseFloat(latitude)], // [lng, lat]
        },
    });

    return res
        .status(201)
        .json(new ApiResponse(201, report, "Report created successfully"));
        
})


const allReports=asyncHandler(async(req,res)=>{

    let {status,user,longitude, latitude, maxDistance}=req.query
    let matchedStage={}

    if(status) matchedStage.status=status
    else matchedStage.status="approved"

    if(user) matchedStage.userId=new mongoose.Types.ObjectId(user)

    if (longitude && latitude) {
        matchedStage.location = {
            $near: {
                $geometry: {
                    type: "Point",
                    coordinates: [parseFloat(longitude), parseFloat(latitude)],
                },
                $maxDistance: maxDistance ? parseInt(maxDistance) : 5000, // default 5 km
            },
        };
    }

    const reports=await Report.aggregate([
        {
            $match:matchedStage
        },
        {
            $lookup:{
                from:'users',
                localField:'userId',
                foreignField:'_id',
                as:'user',
                pipeline:[
                    {
                        $project:{
                            points:0,
                            isAdmin:0,
                            avatar:0,
                            password:0,
                            refreshToken:0,
                            createdAt:0,
                            updatedAt:0,
                        }
                    }
                ]
            }
        },
        {
            $unwind:'$user' 
        }
    ])

    return res
    .status(200)
    .json(new ApiResponse(200, reports, "Reports fetched successfully"));
})


const reportDetails=asyncHandler(async(req,res)=>{
    const id=new mongoose.Types.ObjectId(req.params.id)

    const report=await Report.aggregate([
        {
            $match:{_id:id}
        },
        {
            $lookup:{
                from:'users',
                localField:'userId',
                foreignField:'_id',
                as:'user',
                pipeline:[
                    {
                        $project:{
                            points:0,
                            isAdmin:0,
                            avatar:0,
                            password:0,
                            refreshToken:0,
                            createdAt:0,
                            updatedAt:0,
                        }
                    }
                ]
            }
        },
        {
            $unwind:'$user' 
        }
    ])
    if (!report.length) throw new ApiError(404, "Report not found");

    return res
    .status(200)
    .json(new ApiResponse(200, report[0], "Report fetched successfully"));
})

const updateReport=asyncHandler(async(req,res)=>{
    const userId=new mongoose.Types.ObjectId(req.user._id)
    const user=await User.findById(userId)

    const reportId=new mongoose.Types.ObjectId(req.params.id)
    let report=await Report.findById(reportId)
    if (!report) throw new ApiError(404, "Report not found");


    let matchedStage={}

    if(report.userId.toString()==userId.toString() || user.isAdmin){
        const {description,title}=req.body
        if(description) matchedStage.description=description
        if(title) matchedStage.title=title
        
        let imageUrls = [];

        if (req.files?.mangroove) {
            for (const file of req.files.mangroove) {
                const uploadRes = await uploadOnCloudinary(file.buffer); // ✅ use buffer
                if (uploadRes?.secure_url) imageUrls.push(uploadRes.secure_url);
            }
        }
        if (imageUrls.length > 0) matchedStage.imageUrls = imageUrls;

    }
    else throw new ApiError(403, "Access denied")
    
    const newReport=await Report.findByIdAndUpdate(
        reportId,
        {$set:matchedStage},
        {new:true}
    )
    return res
    .status(200)
    .json(new ApiResponse(200, newReport, "Report updated successfully"));
})


const deleteReport=asyncHandler(async(req,res)=>{
    const id=new mongoose.Types.ObjectId(req.params.id)
    let report=await Report.findById(id)
    if (!report) throw new ApiError(404, "Report not found");

    const userId=new mongoose.Types.ObjectId(req.user._id)
    const user=await User.findById(userId)

    if(report.userId.toString()!=userId.toString() && !user.isAdmin) throw new ApiError(403,"access denied")

    report=await Report.findByIdAndDelete(id)
    if(!report) throw new ApiError(400,"report not deleted")
     
    for (const url of report.imageUrl) {
        await deleteImageByUrl(url);
    }
    return res
    .status(200)
    .json(new ApiResponse(200, {}, "Report deleted successfully"));
})

const changeStatus=asyncHandler(async(req,res)=>{
    const reportId=new mongoose.Types.ObjectId(req.params.id)
    const {status}=req.params

    const user=await User.findById(req.user._id)
    
    const report=await Report.findById(reportId)
    if (!report) throw new ApiError(404, "Report not found");

    if(report.status==="pending"){
        if(status==="1") report.status="approved"
        else report.status="rejected"
    }
    else if((report.status==="rejected")) throw new ApiError(400,"cant change status of rejected one")
    else throw new ApiError(400,"report already approved")

    report.save()
    
    return res
    .status(200)
    .json(new ApiResponse(200, {}, "status updated successfully"));
})

export {
    createReport,
    allReports,
    reportDetails,
    updateReport,
    deleteReport,
    changeStatus
}