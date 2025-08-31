import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { Report } from "../models/report.model.js";
import { Comment } from "../models/comment.model.js";
import mongoose from "mongoose";

const addComment=asyncHandler(async(req,res)=>{
    const reportId=new mongoose.Types.ObjectId(req.params.id)
    const userId=new mongoose.Types.ObjectId(req.user._id)
    const {text}=req.body
    if(!text) throw new ApiError(401,"provide text")

    const report=await Report.findById(reportId)
    if(!report) throw new ApiError(404,"report not found")

    
    const comment=await Comment.create({
        reportId,
        userId,
        text:text
    })
    if(!comment) throw new ApiError(500,"comment creation failed")
    
    return res
    .status(201)
    .json(new ApiResponse(200, comment, "comment added successfully"))
})

const getComments=asyncHandler(async(req,res)=>{
    const reportId=new mongoose.Types.ObjectId(req.params.id)
    
    const report=await Report.findById(reportId)
    if(!report) throw new ApiError(404,"report not found")
    
    const comments=await Comment.aggregate([
        {
            $match:{reportId:reportId}
        },
        {
            $lookup:{
                from:'users',
                localField:'userId',
                foreignField:'_id',
                as:'user',
                pipeline:[{
                    $project:{
                        _id:0,
                        username:1,
                        avatar:1
                    }
                }]
            }
        },
        {$unwind:'$user'},
        {
            $lookup:{
                from:'reports',
                localField:'reportId',
                foreignField:'_id',
                as:'report',
                pipeline:[{
                    $project:{
                        _id:0,
                        title:1,
                        description:1,
                        location:1,
                        status:1
                    }
                }]
            }
        },
        {$unwind:'$report'},
        {
            $project:{
                _id:0
            }
        }
    ])

    return res
    .status(200)
    .json(new ApiResponse(200, comments, "comments fetched"))
})

const updateComment=asyncHandler(async(req,res)=>{
    const reportId=new mongoose.Types.ObjectId(req.params.id)
    const userId=new mongoose.Types.ObjectId(req.user._id)
    const {text}=req.body
    if(!text) throw new ApiError(401,"provide text")

    const report=await Report.findById(reportId)
    if(!report) throw new ApiError(404,"report not found")

    const comment=await Comment.findOneAndUpdate(
        {reportId:reportId,userId:userId},
        {$set:{text:text}},
        {new:true}
    )
    if(!comment) throw new ApiError(404,"comment not found")
    
    return res
    .status(200)
    .json(new ApiResponse(200, comment, "comment updated successfully"))
})

const deleteComment=asyncHandler(async(req,res)=>{
    const reportId=new mongoose.Types.ObjectId(req.params.id)
    const userId=new mongoose.Types.ObjectId(req.user._id)
    const user=await User.findById(userId)

    const report=await Report.findById(reportId)
    if(!report) throw new ApiError(404,"report not found")

    if(report.userId.toString()!=userId.toString() && !user.isAdmin) throw new ApiError(400,"access denied")
    
    const comment=await Comment.findOneAndDelete(
        {reportId:reportId,userId:userId}
    )
    if(!comment) throw new ApiError(500,"comment not deleted")
    
    return res
    .status(200)
    .json(new ApiResponse(200, {}, "comment deleted successfully"))
})

export {
    addComment,
    getComments,
    updateComment,
    deleteComment
}