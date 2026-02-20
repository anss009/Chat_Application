import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";

export const register = async (req, res) => {
    try {
        const { fullname, username, password, confirmedPassword, gender, profilePhoto } = req.body;

        if (!fullname || !username || !password || !confirmedPassword || !gender) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (password !== confirmedPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        const user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ message: "Username already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const maleProfilePhoto = `https://icon-library.com/icon/boy-icon-png-27.html?username=${username}`;
        const femaleProfilePhoto = `https://icon-library.com/icon/female-employee-icon-15.html?username=${username}`;

        await User.create({
            fullname,
            username,
            password: hashedPassword,
            profilePhoto: gender === "Male" ? maleProfilePhoto : femaleProfilePhoto,
            gender
        });
        res.status(201).json({
            message: "User registered successfully",
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({
                message: "Incorrect UserName and Password",
                success: false
            });
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect UserName and Password",
                success: false
            });
        }
        const tokenData = {
            userId: user._id
        };
        const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });

        return res.status(200).cookie('token', token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'strict' }).json({
            _id: user._id,
            username: user.username,
            fullname: user.fullname,
            profilePhoto: user.profilePhoto,
            message: `Welcome back ${user.fullname}`,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};

export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: " The User is logout"
        })
    } catch (error) {
        console.log(error)
    }
}


export const getOtherUsers = async (req, res) => {
    try {
        const loggedInUserId = req.id;
        const otherUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password")
        return res.status(200).json(otherUsers)
    } catch (error) {
        console.log(error)

    }
}