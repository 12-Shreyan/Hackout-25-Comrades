import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { Report } from "../models/report.model.js";
import isAdmin from "../middlewares/isAdmin.middleware.js";

const allUsers=asyncHandler(async(req,res)=>{
    const users=await User.aggregate([
        {
            $project:{
                username:1,
                points:1,
                isAdmin:1,
                avatar:1
            }
        }
    ])
    return res
    .status(200)
    .json(new ApiResponse(200, users, "users fetched successfully"))
})


const toggleAccess=asyncHandler(async(req,res)=>{
    const userId=req.params.id
    const user=await User.findById(userId)
    user.isAdmin=!user.isAdmin
    user.save()
    return res
    .status(200)
    .json(new ApiResponse(200, {}, "access toggled successfully"))
})


const deleteUser=asyncHandler(async(req,res)=>{
    let user=await User.findById(req.params.id)
    if(user.isAdmin) throw new ApiError(400,"admin cant be deleted")
    
    user=await User.findByIdAndDelete(req.params.id)
    if(!user) throw new ApiError(400,"user not found or not deleted")
    
    return res
    .status(200)
    .json(new ApiResponse(200, {}, "user deleted successfully"))
})


export {
    allUsers,
    toggleAccess,
    deleteUser
}