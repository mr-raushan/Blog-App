import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { API_URL } from "../utils";

export default function MyBlog() {
  const [myBlog, setMyBlog] = useState([]);

  useEffect(() => {
    const fetchMyBlog = async () => {
      try {
        const res = await axios(`${API_URL}/api/blogs/my-blog`, {
          withCredentials: true,
        });
        if (res.data.success) {
          setMyBlog(res.data.blogs);
          console.log("respone in my-blog", res);
          toast.success("blog fetched successfully");
        }
      } catch (error) {
        console.log("error occured while fetching my-blog", error);
        toast.error("could not fetch my-blog");
      }
    };
    fetchMyBlog();
  }, []);

  const handleDelete = async (id) => {
    await axios
      .delete(`${API_URL}/api/blogs/delete/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message || "Blog deleted successfully");
        setMyBlog((value) => value.filter((blog) => blog._id !== id));
      })
      .catch((error) => {
        toast.error(error.response.message || "Failed to delete blog");
      });
  };
  return (
    <div>
      <div className="container mx-auto py-20 md:py-5 p-4 md:px-32 md:ml-20">
        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 md:ml-20">
          {myBlog && myBlog.length > 0 ? (
            myBlog.map((element) => (
              <Link
                to={`/blog/${element._id}`}
                className="bg-white shadow-lg rounded-lg overflow-hidden"
                key={element._id}
              >
                {element?.blogImage && (
                  <img
                    src={element?.blogImage.url}
                    alt="blogImg"
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4">
                  <span className="text-sm text-gray-600">
                    {element.category}
                  </span>
                  <h4 className="text-xl font-semibold my-2">
                    {element.title}
                  </h4>
                  <div className="flex justify-between mt-4">
                    <Link
                      to={`/blog/update/${element._id}`}
                      className="text-blue-500 bg-white rounded-md shadow-lg px-3 py-1 border border-gray-400 hover:underline"
                    >
                      UPDATE
                    </Link>
                    <button
                      onClick={() => handleDelete(element._id)}
                      className="text-red-500 bg-white rounded-md shadow-lg px-3 py-1 border border-gray-400 hover:underline"
                    >
                      DELETE
                    </button>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-center text-gray-500">
              You have not posted any blog to see!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
