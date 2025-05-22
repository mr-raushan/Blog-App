import express from "express";
import userRoute from "./routes/user.js";
import blogRoute from "./routes/blog.js";
import fileUpload from "express-fileupload";
const app = express();
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config({});
import { v2 as cloudinary } from "cloudinary";
import cookieParser from "cookie-parser";
import cors from "cors";

const PORT = process.env.PORT || 4040;
const MONGO_URL = process.env.MONGO_URI;

//middleware
app.use(express.json());
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const allowedOrigins = [
  "http://localhost:5173", //local react
  "https://blog-app-brown-psi.vercel.app", //deployed frontend
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(fileUpload({ useTempFiles: true }));

// app.use(
//   fileUpload({
//     useTempFiles: true,
//     tempFileDir: "/tmp/",
//   })
// );

// DB Code
try {
  mongoose.connect(MONGO_URL);
  console.log("DB connection established");
} catch (error) {
  console.log("Error while connecting to db");
  console.log(error);
  process.exit(1);
}

//api calling
app.use("/api/users", userRoute);
app.use("/api/blogs", blogRoute);

// cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

app.listen(PORT, () => {
  console.log(`app listening on ${PORT}`);
});
