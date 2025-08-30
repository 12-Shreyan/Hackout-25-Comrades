import mongoose, {Schema} from "mongoose";


const reportSchema = new Schema(
    {
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
            required:true
        },
        title: {
            type: String,
            required: true,
            trim: true,
            maxlength: 100, // optional limit
        },
        imageUrl: {
            type: [String], // cloudinary url
            default:[]
        },
        description: {
            type: String,
            lowercase: true,
            trim: true
        },
        location: {
            type: {
                type: String,
                enum: ["Point"],
                default: "Point"
            },
            coordinates: {
                type: [Number], // [longitude, latitude]
                required: true
            }
        },
        status:{
            type:String,
            enum:["pending", "approved" , "rejected"],
            default: "pending"
        }

    },
    {
        timestamps: true
    }
)

reportSchema.index({ location: "2dsphere" });

export const Report= mongoose.model("Report", reportSchema)