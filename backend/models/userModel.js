import mongoose from "mongoose";
const userModel = new mongoose.Schema({
    fullname: { type: String, required: true, minlength: 3, maxlength: 40 },
    username: { type: String, required: true, unique: true, minlength: 3, maxlength: 20 },
    password: { type: String, required: true },
    profilePhoto: { type: String, default: "" },
    gender: { type: String, enum: ['Male', 'Female'], required: true },
}, { timestamps: true });

export const User = mongoose.model("User", userModel);