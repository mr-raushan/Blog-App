import React, { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { CiMenuBurger } from "react-icons/ci";
import { BiSolidLeftArrowAlt } from "react-icons/bi";

export default function Sidebar({ setComponent }) {
  const { profile, isAuthenticated, setIsAuthenticated } = useAuth();
  console.log("profile section from sidebar ", profile);
  console.log("isAuthenticated", isAuthenticated);

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleComponents = (value) => {
    setComponent(value);
  };

  const gotoHome = () => {
    navigate("/");
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get("http://localhost:4001/api/users/logout", {
        withCredentials: true,
      });
      if (res.data.success) {
        setIsAuthenticated(false);
        navigate("/login");
        toast.success("logout successful");
      }
    } catch (error) {
      console.log("error in sidebar logout function", error);
      toast.error("logout failed");
    }
  };

  return (
    <>
      <div
        className="sm:hidden  top-4 fixed cursor-pointer left-4 z-50"
        onClick={() => setOpen(!open)}
      >
        <CiMenuBurger className="text-2xl" />
      </div>
      <div
        className={`w-64 h-full shadow-lg fixed top-0 left-0 py-10 bg-gray-50 transition-transform duration-300 transform sm:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full mr-5"
        }`}
      >
        <div
          className="sm:hidden absolute top-4 right-4 text-xl cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          <BiSolidLeftArrowAlt className="text-2xl" />
        </div>
        <div className="text-center">
          <img
            className="w-24 h-24 rounded-full cursor-pointer mx-auto mb-2"
            src={profile?.user?.photo?.url}
            alt=""
          />
          <p className="text-lg font-semibold mb-4 hover:underline cursor-pointer">
            {profile?.user?.name}
          </p>
        </div>
        <ul className="space-y-6 mx-4">
          <button
            onClick={() => handleComponents("My Blogs")}
            className="w-full px-4 py-2 bg-green-500 rounded-lg hover:bg-green-700 transition duration-300"
          >
            MY BLOGS
          </button>
          <button
            onClick={() => handleComponents("Create Blog")}
            className="w-full px-4 py-2 bg-blue-400 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            CREATE BLOG
          </button>
          <button
            onClick={() => handleComponents("My Profile")}
            className="w-full px-4 py-2 bg-pink-500 rounded-lg hover:bg-pink-700 transition duration-300"
          >
            MY PROFILE
          </button>
          <button
            onClick={gotoHome}
            className="w-full px-4 py-2 bg-red-500 rounded-lg hover:bg-red-700 transition duration-300"
          >
            HOME
          </button>
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 bg-yellow-500 rounded-lg hover:bg-yellow-700 transition duration-300"
          >
            LOGOUT
          </button>
        </ul>
      </div>
    </>
  );
}
