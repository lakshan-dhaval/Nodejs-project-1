import mongoose, {Schema} from "mongoose";

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        fullname: {
            type: String,
            required: true,
            trim: true,
            index: true
        },
        avatar: {
            type: String,        // Clouldinary url
            required: true
        },
        coverImage: {
            type: String,        // Clouldinary url
        },
        watchHistory: [
            {
                type:Schema.Types.ObjectId,
                ref: "Video"
            }
        ],
        password: {
            type: String,
            required: [true, 'Password is required']
        },
        refreshToken: {
            type: String
        }
    },
    {timestamps: true}
)

// data save hone se pehele ye pre hook run hoga

userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next(); 

    this.password = bcrypt.hash(this.password, 10)                                                        
    next()
    
    userSchema.method.isPasswordCorrect = async function (password) {
        return await bcrypt.compare(password, this.password)
    }

    userSchema.methods.generateAccessToken = function () {
        return jwt.sign(
            {
                _id: this._id,
                username: this.username,
                email: this.email,
                fullname: this.fullname,
            },
            process.env.ACCESS_TOKEN_SECRET, 
            {
                expiresIn: process.env.ACCESS_TOKEN_EXPIRY
            }
        )
    }
    userSchema.methods.generateRefreshToken = function () {
        return jwt.sign(
            {
                _id: this._id,
            },
            process.env.REFRESH_TOKEN_SECRET, 
            {
                expiresIn: process.env.REFRESH_TOKEN_EXPIRY
            }
        )
    }
})

export const User = mongoose.model("User", userSchema)
