import mongoose from "mongoose";
import { Blog } from "../models/blogModel.js";
import { v2 as cloudinary } from "cloudinary";

export const createBlog = async (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({
        message: "No file uploaded",
        success: false,
      });
    }

    const { blogImage } = req.files;
    const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
    if (!allowedFormats.includes(blogImage.mimetype)) {
      return res.status(400).json({
        message: "Invalid file format. Only .png,.jpg,.webp are allowed",
        success: false,
      });
    }

    const { title, category, about } = req.body;
    if (!title || !category || !about) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    const adminName = req?.user?.name;
    const adminPhoto = req?.user?.photo?.url;
    const createdBy = req?.user?._id;

    const cloudinaryResponse = await cloudinary.uploader.upload(
      blogImage.tempFilePath
    );

    if (!cloudinaryResponse || cloudinaryResponse.error) {
      return res.status(400).json({
        message: "Error while uploading to cloudinary",
        success: false,
      });
    }

    const blogData = {
      title,
      category,
      about,
      adminName,
      adminPhoto,
      createdBy,
      blogImage: {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.url,
      },
    };

    const blog = await Blog.create(blogData);

    return res.status(201).json({
      message: "Blog created successfully",
      success: true,
      blog,
    });
  } catch (error) {
    console.log("error while creating blog", error);
    return res.status(400).json({
      message: "Error in creating blog",
      success: false,
    });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findByIdAndDelete(id);
    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Blog deleted successfully",
      success: true,
    });
  } catch (error) {
    console.log("Error in deleting blog ", error);
    return res.status(400).json({
      message: "Error in deleting blog",
      success: false,
    });
  }
};

export const getAllBlogs = async (req, res) => {
  try {
    const allBlogs = await Blog.find();
    return res.status(200).json({
      message: "All blogs fetched successfully",
      success: true,
      blogs: allBlogs,
    });
  } catch (error) {
    console.log("error while getting all blogs", error);
    return res.status(400).json({
      message: "Error in getting all blogs",
      success: false,
    });
  }
};

export const getSingleBlog = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid blog id",
        success: false,
      });
    }

    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Blog fetched successfully",
      success: true,
      blog,
    });
  } catch (error) {
    console.log("error while getting single blog", error);
    return res.status(400).json({
      message: "Error in getting single blog",
      success: false,
    });
  }
};

export const getMyBlogs = async (req, res) => {
  try {
    const createdBy = req.user._id;
    const myblogs = await Blog.find({ createdBy });

    if (!myblogs) {
      return res.status(404).json({
        message: "No blogs found for this user",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Blogs fetched successfully",
      success: true,
      blogs: myblogs,
    });
  } catch (error) {
    console.log("error while getting my blogs", error);
    return res.status(400).json({
      message: "Error in getting my blogs",
      success: false,
    });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid blog id",
        success: false,
      });
    }
    const updatedBlog = await Blog.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedBlog) {
      return res.status(404).json({
        message: "Blog not found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Blog updated successfully",
      success: true,
      blog: updatedBlog,
    });
  } catch (error) {
    console.log("error while updating blog", error);
    return res.status(400).json({
      message: "Error in updating blog",
      success: false,
    });
  }
};
