import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
import { IoCloseSharp } from "react-icons/io5";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuth } from "../context/AuthProvider";
import { API_URL } from "../utils";

export default function Navbar() {
  const { profile, isAuthenticated } = useAuth();
  // console.log(profile?.user);

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const logOutHandler = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/users/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/");
      }
    } catch (error) {
      console.log("error", error);
      toast.error(error.data.message);
    }
  };

  return (
    <>
      <nav className="shadow-lg py-3 ">
        <div className="flex items-center justify-between container mx-auto px-10 md:px-32 ">
          <Link to="/" className="cursor-pointer">
            <div className="font-semibold text-xl">
              Cilli<span className="text-blue-500">Blog</span>
            </div>
          </Link>

          <div className="mx-6">
            {/* desktop menu  */}
            <ul className="hidden md:flex  items-center gap-6 font-medium text-[11px]">
              <Link to={"/"} className="hover:text-blue-500">
                HOME
              </Link>
              <Link to={"/blogs"} className="hover:text-blue-700">
                BLOGS
              </Link>
              <Link to={"/creators"} className="hover:text-blue-700">
                CREATORS
              </Link>
              <Link to={"/about"} className="hover:text-blue-700">
                ABOUT
              </Link>
              <Link to={"/contact"} className="hover:text-blue-700">
                CONTACT
              </Link>
            </ul>
            <div
              className="md:hidden cursor-pointer"
              onClick={() => setOpen(!open)}
            >
              {open ? <IoCloseSharp size={24} /> : <AiOutlineMenu size={24} />}
            </div>
          </div>

          <div className="hidden md:flex  items-center gap-4">
            {isAuthenticated && profile?.user?.role === "admin" ? (
              <Link to={"/dashboard"}>
                <button
                  className="bg-blue-500 py-2 px-4 text-white font-medium rounded shadow-md 
              transition-all duration-200 ease-in-out hover:bg-blue-600"
                >
                  DASHBOARD
                </button>
              </Link>
            ) : (
              ""
            )}

            {!isAuthenticated ? (
              <Link
                to={"/login"}
                className="bg-red-600 text-white font-semibold hover:bg-red-800 duration-300 px-4 py-2 rounded"
              >
                LOGIN
              </Link>
            ) : (
              <div>
                <button
                  onClick={logOutHandler}
                  className="bg-red-500 py-2 px-4 rounded-md text-white font-medium shadow 
              transition-all duration-200 ease-in-out hover:bg-red-600"
                >
                  LOGOUT
                </button>
              </div>
            )}
          </div>
        </div>
        {/* mobile menu  */}
        {open && (
          <div className="bg-white mb-5 mt-5">
            <ul className="flex flex-col md:hidden h-screen justify-center items-center gap-6 font-medium text-[11px]">
              <Link
                to={"/"}
                onClick={() => setOpen(!open)}
                smoooth="true"
                duration={500}
                offset={-70}
                activeClass="active"
                className="hover:text-blue-500"
              >
                HOME
              </Link>
              <Link
                to={"/blogs"}
                onClick={() => setOpen(!open)}
                smoooth="true"
                duration={500}
                offset={-70}
                activeClass="active"
                className="hover:text-blue-700"
              >
                BLOGS
              </Link>
              <Link
                to={"/creators"}
                onClick={() => setOpen(!open)}
                smoooth="true"
                duration={500}
                offset={-70}
                activeClass="active"
                className="hover:text-blue-700"
              >
                CREATORS
              </Link>
              <Link
                to={"/about"}
                onClick={() => setOpen(!open)}
                smoooth="true"
                duration={500}
                offset={-70}
                activeClass="active"
                className="hover:text-blue-700"
              >
                ABOUT
              </Link>
              <Link
                to={"/contact"}
                onClick={() => setOpen(!open)}
                smoooth="true"
                duration={500}
                offset={-70}
                activeClass="active"
                className="hover:text-blue-700"
              >
                CONTACT
              </Link>
              <div className=" flex flex-col space-y-4 items-center ">
                {isAuthenticated && profile?.user?.role === "admin" ? (
                  <Link to={"/dashboard"}>
                    <button
                      className="bg-blue-500 py-2 px-4 text-white font-medium rounded shadow-md 
              transition-all duration-200 ease-in-out hover:bg-blue-600"
                    >
                      DASHBOARD
                    </button>
                  </Link>
                ) : (
                  ""
                )}

                {!isAuthenticated ? (
                  <Link
                    to={"/login"}
                    className="bg-red-600 text-white font-semibold hover:bg-red-800 duration-300 px-4 py-2 rounded"
                  >
                    LOGIN
                  </Link>
                ) : (
                  <div>
                    <button
                      onClick={logOutHandler}
                      className="bg-red-500 py-2 px-4 rounded-md text-white font-medium shadow 
              transition-all duration-200 ease-in-out hover:bg-red-600"
                    >
                      LOGOUT
                    </button>
                  </div>
                )}
              </div>
            </ul>
          </div>
        )}
      </nav>
    </>
  );
}
