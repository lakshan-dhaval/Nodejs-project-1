import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
import { JsonWebTokenError } from "jsonwebtoken";
import bcrypt from "bcrypt";

const videoSchema = (
    {
        videoFile: {
            type: String,        // Clouldinary url
            required: true
        },
        thumbnail: {
            type: String,        // Clouldinary url
            required: true
        },
        title: {
            type: String,        
            required: true
        },
        description: {
            type: String,        
            required: true
        },
        duration: {
            type: Number,        
            required: true
        },
        views: {
            type: Number,
            default: 0
        },
        isPublished: {
            type: Boolean,        
            default: true
        },
        owner: {
            type: Schema.Types.ObjectId,        
            ref: "User"
        },
    },
    {
        timeStamps: true
    }
)

videoSchema.plugin(mongooseAggregatePaginate)

export const Video = mongoose.model("Video", videoSchema)