import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { API_URL } from "../utils";

export default function BlogDetail() {
  const { id } = useParams();
  const [blogs, setBlogs] = useState({});

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/blogs/single-blog/${id}`, {
          withCredentials: true,
        });
        console.log("blog detail", res.data);
        if (res.data.success) {
          toast.success("blog detail page");
          setBlogs(res.data.blog);
        }
      } catch (error) {
        console.log("error occured in blog detail page", error);
        toast.error("error occured in blog detail page");
      }
    };
    fetchBlog();
  }, []);

  return (
    <div>
      <div className="container mx-auto md:px-32">
        {blogs && (
          <section className=" container mx-auto p-4">
            <div className="text-blue-500 cursor-pointer uppercase text-xs py-10 font-bold mb-4">
              {blogs?.category}
            </div>
            <h1 className="text-4xl font-bold mb-6 cursor-pointer underline">
              {blogs?.title}
            </h1>
            <div className="flex items-center mb-6">
              <img
                src={blogs?.adminPhoto}
                alt="author_img"
                className="w-12 h-12 cursor-pointer rounded-full mr-4"
              />
              <p className="text-lg font-semibold cursor-pointer">
                {blogs?.adminName}
              </p>
            </div>
            <div className="flex flex-col md:flex-row">
              {blogs?.blogImage && (
                <img
                  src={blogs?.blogImage?.url}
                  alt="mainBlogImage"
                  className="md:w-1/2 w-full md:h-[500px] mb-6 rounded-lg cursor-pointer border"
                />
              )}
              <div className="md:w-1/2 w-full md:pl-6">
                <p className="text-lg mb-6">{blogs?.about}</p>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
