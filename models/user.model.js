import mongoose from "mongoose";


const userDetailSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    mobile: {
        type: Number,
        required: true
    },
    otp: {
        type: String,
    },
    otpExpireAt: {
        type: Number,
    }
})



export const UserDetails = mongoose.model("User Details", userDetailSchema)