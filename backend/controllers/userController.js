import { User } from "../models/userModel.js";
import { v2 as cloudinary } from "cloudinary";
import bcrypt from "bcryptjs";
import createTokenAndSaveCookies from "../jwt/AuthToken.js";

export const register = async (req, res) => {
  try {
    console.log("req.files:", req.files);
    console.log("req.body:", req.body);
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({
        message: "No files were uploaded.",
        success: false,
      });
    }

    const { photo } = req.files;
    const allowedFormat = [
      "image/jpg",
      "image/png",
      "image/jpeg",
      "image/webp",
    ];
    if (!allowedFormat.includes(photo.mimetype)) {
      return res.status(400).json({
        message: "Invalid file format. Only jpg, png, jpeg are allowed.",
        success: false,
      });
    }

    const { name, email, password, education, role, phone } = req.body;
    if (
      !name ||
      !email ||
      !password ||
      !education ||
      !role ||
      !phone ||
      !photo
    ) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "Email already exists",
        success: false,
      });
    }

    const cloudResponse = await cloudinary.uploader.upload(photo.tempFilePath);
    if (!cloudResponse || cloudResponse.error) {
      return res.status(500).json({
        message: "Error uploading photo to cloudinary",
        success: false,
      });
    }

    console.log("photo file:", photo);
    console.log("tempFilePath:", photo.tempFilePath);

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      phone,
      role,
      name,
      education,
      password: hashedPassword,
      photo: {
        public_id: cloudResponse.public_id,
        url: cloudResponse.secure_url,
      },
    });
    //yaha secure_url ke jagah url rhega

    await newUser.save();

    if (newUser) {
      const token = await createTokenAndSaveCookies(newUser._id, res);
      return res.status(200).json({
        message: "User registered successfully",
        success: true,
        user: newUser,
        token,
      });
    }
  } catch (error) {
    console.log("Error registering module ", error);
    return res.status(400).json({
      message: "Error in register controller",
      success: false,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Incorrect password",
        success: false,
      });
    }

    if (user.role !== role) {
      return res.status(403).json({
        message: `Given role ${role} does not exist`,
        success: false,
      });
    }

    const token = await createTokenAndSaveCookies(user._id, res);
    return res.status(200).json({
      message: `Welcome back ${email}`,
      success: true,
      user,
      token,
    });
  } catch (error) {
    console.log("Error in login", error);
    return res.status(400).json({
      message: "Error in login controller",
      success: false,
    });
  }
};

export const logOut = async (req, res) => {
  try {
    res.clearCookie("jwt");
    return res.status(200).json({
      message: "Logged out successfully",
      success: true,
    });
  } catch (error) {
    console.log("error while logout", error);
    return res.status(400).json({
      message: "Error in logout controller",
      success: false,
    });
  }
};

export const getMyProfile = async (req, res) => {
  try {
    const user = await req.user;
    if (!user) {
      return res.status(401).json({
        message: "User not found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "My profile fetched successfully",
      success: true,
      user,
    });
  } catch (error) {
    console.log("error occurred while getting my profile ", error);
    return res.status(400).json({
      message: "Error in getting my profile controller",
      success: false,
    });
  }
};

export const getAdmins = async (req, res) => {
  try {
    const admins = await User.find({ role: "admin" });
    if (!admins) {
      return res.status(400).json({
        message: "No admins found",
        success: false,
      });
    }
    // console.log("admins", admins);
    return res.status(200).json({
      message: "Admins fetched successfully",
      success: true,
      admins,
    });
  } catch (error) {
    console.log("error while getting admins", error);
    return res.status(400).json({
      message: "Error in getting admins controller",
      success: false,
    });
  }
};
