import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import {deleteImageByUrl, uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js";
import { Report } from "../models/report.model.js";
import mongoose from "mongoose";

const generateAccessAndRefereshTokens = async(userId) =>{
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return {accessToken, refreshToken}


    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating referesh and access token")
    }
}

const registerUser = asyncHandler( async (req, res) => {
    const {email, username, password } = req.body
    
    if (
        [email, username, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists")
    }

    console.log(req.file);
    
    const avatarLocalPath = req.file;

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath.buffer)

    if (!avatar) {
        throw new ApiError(400, "Avatar uplodation failed")
    }
   

    const user = await User.create({
        username:username.toLowerCase(),
        email:email,
        avatar: avatar.secure_url,
        password:password,
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    )

} )

const loginUser = asyncHandler(async (req, res) =>{
    const {email, username, password} = req.body

    if (!username && !email) {
        throw new ApiError(400, "username or email is required")
    }

    const user = await User.findOne({
        $or: [{username}, {email}]
    })

    if (!user) {
        throw new ApiError(404, "User does not exist")
    }

   const isPasswordValid = await user.isPasswordCorrect(password)

   if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials")
    }

   const {accessToken, refreshToken} = await generateAccessAndRefereshTokens(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200, 
            {
                user: loggedInUser, accessToken, refreshToken
            },
            "User logged In Successfully"
        )
    )

})

const logoutUser = asyncHandler(async(req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1 // this removes the field from document
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"))
})

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if (!incomingRefreshToken) {
        throw new ApiError(401, "unauthorized request")
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )
    
        const user = await User.findById(decodedToken?._id)
    
        if (!user) {
            throw new ApiError(401, "Invalid refresh token")
        }
    
        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "Refresh token is expired or used")
            
        }
    
        const options = {
            httpOnly: true,
            secure: true
        }
    
        const {accessToken, newRefreshToken} = await generateAccessAndRefereshTokens(user._id)
    
        return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", newRefreshToken, options)
        .json(
            new ApiResponse(
                200, 
                {accessToken, refreshToken: newRefreshToken},
                "Access token refreshed"
            )
        )
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh token")
    }

})

const changeCurrentPassword = asyncHandler(async(req, res) => {
    const {oldPassword, newPassword} = req.body

    const user = await User.findById(req.user?._id)
    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)

    if (!isPasswordCorrect) {
        throw new ApiError(400, "Invalid old password")
    }

    user.password = newPassword
    await user.save({validateBeforeSave: false})

    return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password changed successfully"))
})


const updateAccountDetails = asyncHandler(async(req, res) => {
    const {username, email} = req.body

    let matchedStage={}
    if(username) matchedStage.username=username
    if(email) matchedStage.email=email
    
    if (Object.keys(matchedStage).length === 0) {
        throw new ApiError(400, "At least one field is required");
    }

console.log("UserId from req.user:", req.user?._id);

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: matchedStage
        },
        {new: true}
        
    ).select("-password")

    return res
    .status(200)
    .json(new ApiResponse(200, user, "Account details updated successfully"))
});

const updateUserAvatar = asyncHandler(async(req, res) => {
    const avatarLocalPath = req.file

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is missing")
    }

    const userData=await User.findById(req.user._id) 
    if (userData.avatar) {
        const isDeleted = await deleteImageByUrl(userData.avatar)
        if (!isDeleted || isDeleted.result !== "ok") {
            console.warn("Old avatar could not be deleted:", isDeleted)
        }
    }


    const avatar = await uploadOnCloudinary(avatarLocalPath.buffer)

    if (!avatar.secure_url) {
        throw new ApiError(400, "Error while uploading on avatar")
        
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set:{
                avatar: avatar.secure_url
            }
        },
        {new: true}
    ).select("-password")

    return res
    .status(200)
    .json(
        new ApiResponse(200, user, "Avatar image updated successfully")
    )
})

const userProfile=asyncHandler(async(req,res)=>{
    const userId=req.user._id
    const user=await User.findById(userId).select("-password")
    return res
    .status(200)
    .json(
        new ApiResponse(200, user, "user profile")
    )
})

const deleteProfile = asyncHandler(async (req, res) => {
  const userId = req.user?._id;

  if (!userId) {
    throw new ApiError(400, "User ID not found in request");
  }

  const deletedUser = await User.findByIdAndDelete(userId);

  if (!deletedUser) {
    throw new ApiError(404, "User not found or already deleted");
  }

  return res.status(200).json(
    new ApiResponse(200, {}, "User deleted successfully")
  );
});

const userContributions=asyncHandler(async(req,res)=>{
    const userId=new mongoose.Types.ObjectId(req.params.id)
    
    const user=await User.findById(userId)
    if(!user) throw new ApiError(404,"no user found")
    
    let contributions=await Report.find({userId:userId})
    contributions.username=user.username
    contributions.save()

    return res
    .status(200)
    .json(
        new ApiResponse(200, contributions, "user contributions")
    )
})

const topContributors=asyncHandler(async(req,res)=>{
    const contributors=await User.aggregate([
        {
            $sort:{points:-1}
        },
        {
            $limit:10
        },
        {
            $project:{
                username: 1,
                avatar:1,
                points: 1,
                _id: 0
            }
        }
    ])
    return res
    .status(200)
    .json(
        new ApiResponse(200, contributors, "top contributors")
    )
})

const userContributionProfile=asyncHandler(async(req,res)=>{
    const userId = req.params.id;

    const profile = await User.aggregate([
        {
            $match: { _id: new mongoose.Types.ObjectId(userId) } // Match the user
        },
        {
            $lookup: { // Join reports authored by this user
                from: "reports",
                localField: "_id",
                foreignField: "userId",
                as: "reports"
            }
        },
        {
            $lookup: { // Join comments authored by this user
                from: "comments",
                localField: "_id",
                foreignField: "userId",
                as: "comments"
            }
        },
        {
            $addFields: {
                reportsCount: { $size: "$reports" },
                commentsCount: { $size: "$comments" },
                approvedReports: {
                    $size: {
                        $filter: {
                            input: "$reports",
                            as: "report",
                            cond: { $eq: ["$$report.status", "approved"] }
                        }
                    }
                }
            }
        },
        {
            $addFields: {
                pendingReports: {
                        $size: {
                            $filter: {
                                input: "$reports",
                                as: "report",
                                cond: { $eq: ["$$report.status", "pending"] }
                            }
                        }
                }       
            }
        },
        {
            $addFields: {
                rejectedReports: {
                        $size: {
                            $filter: {
                                input: "$reports",
                                as: "report",
                                cond: { $eq: ["$$report.status", "rejected"] }
                            }
                        }
                }       
            }
        },
        {
        $project: {
            username: 1,
            email: 1, // include if public, otherwise remove
            reportsCount: 1,
            commentsCount: 1,
            approvedReports: 1,
            pendingReports: 1,
            rejectedReports: 1,
            createdAt: 1,
            updatedAt: 1,
            points:1
        }
        }
  ]);

  if (!profile || profile.length === 0) {
    throw new ApiError(404, "User not found");
  }

  return res.status(200).json(
    new ApiResponse(200, profile[0], "User profile fetched successfully")
  );
})

export {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    changeCurrentPassword,
    updateAccountDetails,
    updateUserAvatar,
    userProfile,
    deleteProfile,
    userContributions,
    topContributors,
    userContributionProfile
}