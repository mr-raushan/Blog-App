import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { API_URL } from "../utils";
export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [blogs, setBlogs] = useState([]);
  const [profile, setProfile] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        let token = localStorage.getItem("jwt");
        console.log(token);
        // if (token) {}
        const res = await axios.get(`${API_URL}/api/users/my-profile`, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        // console.log(res);
        setProfile(res.data);
        setIsAuthenticated(true);
      } catch (error) {
        console.log("error in fetching profile", error);
      }
    };

    const fetchBlogs = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/blogs/all-blogs`, {
          withCredentials: true,
        });
        console.log("fetch blogs ka data", res.data.blogs);
        setBlogs(res.data?.blogs);
      } catch (error) {
        console.log("error fetching blog from auth provider file ", error);
      }
    };
    fetchBlogs();
    fetchProfile();
  }, []);

  // useEffect(() => {
  //   console.log("updated blogs from useAuth => ", blogs);
  // }, [blogs]);

  return (
    <AuthContext.Provider
      value={{
        blogs,
        profile,
        isAuthenticated,
        setIsAuthenticated,
        setProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
