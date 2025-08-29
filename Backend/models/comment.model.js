import mongoose, {Schema} from "mongoose";


const commentSchema = new Schema(
    {
        reportId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Report',
            required:true
        },
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
            required:true
        },
        text:{
            type: String,
            lowercase: true,
            trim: true
        }
    },
    {
        timestamps: true
    }
)


export const Comment= mongoose.model("Comment", commentSchema)