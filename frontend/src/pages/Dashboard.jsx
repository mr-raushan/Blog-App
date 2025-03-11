import React, { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import Sidebar from "../dashboard/Sidebar";
import UpdateBlog from "../dashboard/UpdateBlog";
import MyProfile from "../dashboard/MyProfile";
import CreateBlog from "../dashboard/CreateBlog";
import MyBlog from "../dashboard/MyBlog";
import { Navigate } from "react-router-dom";

export default function Dashboard() {
  const { profile, isAuthenticated } = useAuth();
  console.log("profile: ", profile);
  console.log("isAuthenticated: ", isAuthenticated);
  const [component, setComponent] = useState("My Blog");

  if (!isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <div>
      <div>
        <Sidebar component={component} setComponent={setComponent} />
        {component === "My Profile" ? (
          <MyProfile />
        ) : component === "Create Blog" ? (
          <CreateBlog />
        ) : component === "Update Blog" ? (
          <UpdateBlog />
        ) : (
          <MyBlog />
        )}
      </div>
    </div>
  );
}
