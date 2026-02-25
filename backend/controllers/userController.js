import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";

export const register = async (req, res) => {
    try {
        let { fullname, username, password, confirmedPassword, gender, profilePhoto } = req.body;

        if (!fullname || !username || !password || !confirmedPassword || !gender) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Clean up fullname: collapse multiple spaces and trim
        fullname = fullname.replace(/\s\s+/g, ' ').trim();

        if (fullname.length < 3 || fullname.length > 40) {
            return res.status(400).json({ message: "Full Name must be between 3 and 40 characters" });
        }

        if (username.length < 3 || username.length > 20) {
            return res.status(400).json({ message: "Username must be between 3 and 20 characters" });
        }

        // Username should not contain spaces and should be alphanumeric
        const usernameRegex = /^[a-zA-Z0-9_]+$/;
        if (!usernameRegex.test(username)) {
            return res.status(400).json({ message: "Username can only contain letters, numbers, and underscores (no spaces)" });
        }

        if (password.length < 6 || password.length > 25) {
            return res.status(400).json({ message: "Password must be between 6 and 25 characters" });
        }

        if (password !== confirmedPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        const user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ message: "Username already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const maleProfilePhoto = `https://static.vecteezy.com/system/resources/previews/014/388/508/non_2x/avatar-portrait-of-a-young-caucasian-boy-man-in-round-blue-frame-illustration-in-cartoon-flat-style-vector.jpg`;
        const femaleProfilePhoto = `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTK3ld3OtGOABKUv-gxfVyfus01zn5Dpx_5-2EYaONOTct5BCR10RXMyoA&s`;

        await User.create({
            fullname,
            username,
            password: hashedPassword,
            profilePhoto: profilePhoto || (gender === "Male" ? maleProfilePhoto : femaleProfilePhoto),
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
            gender: user.gender,
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