import { User } from "../models/userModel.js";
import jwt from "jsonwebtoken";

//authentication
export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({
        message: "User not authenticated",
        success: false,
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(403).json({
        message: "Unauthorized user",
        success: false,
      });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log("error occured while authentication ", error);
    return res.status(401).json({
      message: "User not authenticated, please try again later",
      success: false,
    });
  }
};

//authorization
export const isAdmin = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: `user with given role ${req.user.role} not allowed to access `,
        success: false,
      });
    }
    next();
  };
};
