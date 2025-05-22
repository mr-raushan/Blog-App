/*eslint-disable*/
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { API_URL } from "../utils";

export default function Signup() {
  const { isAuthenticated, setIsAuthenticated, setProfile } = useAuth();
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    photo: "",
    education: "",
    phone: "",
    photoPreview: "",
  });

  const navigate = useNavigate();

  const handleChangeInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(input);
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("email", input.email);
    formData.append("password", input.password);
    formData.append("role", input.role);
    formData.append("education", input.education);
    formData.append("phone", input.phone);

    if (input.photo) {
      formData.append("photo", input.photo);
    }

    try {
      const res = await axios.post(`${API_URL}/api/users/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      console.log(res);
      toast.success("User created successfully");
      setIsAuthenticated(true);
      setProfile(res.data);
      navigate("/");
      setInput({
        name: "",
        email: "",
        password: "",
        role: "",
        photo: "",
        education: "",
        phone: "",
        photoPreview: "",
      });
    } catch (error) {
      console.log("error occured while signup", error);
      toast.error("cannot sign up");
    }
  };

  const changePhotoHandler = (e) => {
    console.log(e);

    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setInput({ ...input, photoPreview: reader.result, photo: file });
    };
  };

  return (
    <div
      className="flex items-center justify-center py-8 border bg-white max-w-xl rounded-md 
    mx-auto mt-10 border-gray-300 flex-col"
    >
      <form onSubmit={submitHandler} className="mt-10">
        <div className="font-semibold text-xl text-center mb-5 underline italic">
          Cilli<span className="text-blue-500">Blog</span>
        </div>
        <div className="flex flex-col">
          <select
            name="role"
            value={input.role}
            onChange={handleChangeInput}
            className="border cursor-pointer outline-none border-gray-200 rounded-md p-2"
          >
            <option>Select Your Role</option>
            <option value="user">user</option>
            <option value="admin">admin</option>
          </select>

          <div className="my-1">
            <input
              type="text"
              name="name"
              value={input.name}
              onChange={handleChangeInput}
              placeholder="Your Name"
              className="border w-full p-2 rounded-md mt-2 focus:outline-none"
            />
          </div>
          <div className="my-1">
            <input
              type="text"
              name="email"
              value={input.email}
              onChange={handleChangeInput}
              placeholder="Your Email Address"
              className="border w-full p-2 rounded-md mt-2 focus:outline-none"
            />
          </div>
          <div className="my-1">
            <input
              type="password"
              name="password"
              value={input.password}
              onChange={handleChangeInput}
              placeholder="Your Password"
              className="border w-full p-2 rounded-md mt-2 focus:outline-none"
            />
          </div>
          <div className="my-1">
            <input
              type="text"
              name="phone"
              value={input.phone}
              onChange={handleChangeInput}
              placeholder="Your Phone Number"
              className="border w-full p-2 rounded-md mt-2 focus:outline-none"
            />
          </div>
          <div className="my-2 flex flex-col">
            <select
              name="education"
              value={input.education}
              onChange={handleChangeInput}
              className="border cursor-pointer outline-none border-gray-200 rounded-md p-2"
            >
              <option>Select Your Education</option>
              <option value="bca">BCA</option>
              <option value="mca">MCA</option>
              <option value="bba">BA</option>
              <option value="mba">MBA</option>
              <option value="btech">B.Tech</option>
              <option value="ba">BA</option>
              <option value="ma">MA</option>
            </select>
          </div>

          <div className="flex items-center gap-2 my-2">
            <div className="photo w-20 h-16 mr-4">
              <img
                src={input.photoPreview}
                alt="User Avatar"
                className="object-cover w-full h-full rounded-full"
              />
            </div>
            <input
              type="file"
              name="photoPreview"
              onChange={changePhotoHandler}
              className="border w-full p-2 rounded-md mt-2 focus:outline-none"
            />
          </div>
          <p className="text-center mt-4 font-medium">
            Already register?{" "}
            <Link to={"/login"} className="text-blue-600 font-medium">
              Login Now
            </Link>{" "}
          </p>
          <button className="bg-blue-600 w-full py-2 rounded-md mt-6 text-white transition-all duration-200 ease-in-out hover:bg-blue-800 font-medium hover:scale-105">
            Register
          </button>
        </div>
      </form>
    </div>
  );
}
