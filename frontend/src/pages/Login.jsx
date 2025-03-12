/*eslint-disable*/
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

export default function Login() {
  const { isAuthenticated, setIsAuthenticated, setProfile } = useAuth();
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const navigate = useNavigate();

  const handleChangeInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(input);
    const formData = new FormData();
    formData.append("email", input.email);
    formData.append("password", input.password);
    formData.append("role", input.role);

    try {
      const res = await axios.post(
        "http://localhost:4001/api/users/login",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      //   console.log(res);
      toast.success(res.data.message);
      setProfile(res.data);
      setIsAuthenticated(true);
      navigate("/");
      setInput({
        email: "",
        password: "",
        role: "",
      });
    } catch (error) {
      console.log("error occured while signup", error);
      toast.error("cannot sign up");
    }
  };

  return (
    <div
      className="flex items-center justify-center py-8 border bg-white max-w-xl rounded-md 
    mx-auto mt-20 border-gray-300 flex-col"
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

          <p className="text-center mt-4 font-medium">
            New User ?{" "}
            <Link to={"/signup"} className="text-blue-600 font-medium">
              Signup
            </Link>{" "}
          </p>
          <button className="bg-blue-600 w-full py-2 rounded-md mt-6 text-white transition-all duration-200 ease-in-out hover:bg-blue-800 font-medium hover:scale-105">
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
