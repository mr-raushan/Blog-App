/*eslint-disable*/
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { API_URL } from "../utils";

export default function CreateBlog() {
  const [createBlog, setCreateBlog] = useState([]);
  const [input, setInput] = useState({
    title: "",
    category: "",
    about: "",
    blogImage: "",
    blogImagePreview: "",
  });

  const changePhotoHandler = (e) => {
    console.log(e);
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setInput({ ...input, blogImagePreview: reader.result, blogImage: file });
    };
  };

  const handleCreateBlog = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", input.title);
    formData.append("category", input.category);
    formData.append("about", input.about);
    if (input.blogImage) {
      formData.append("blogImage", input.blogImage);
    }

    try {
      const res = await axios.post(`${API_URL}/api/blogs/create`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success("Blog created successfully");
        setCreateBlog(res.data);
        setInput({
          title: "",
          category: "",
          about: "",
          blogImage: "",
          blogImagePreview: "",
        });
      }
    } catch (error) {
      console.log("error occured while creating blog ", error);
      toast.error(response.data.message);
    }
  };

  const handleChangeInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  // 07:25:00

  return (
    <div>
      <div
        className="flex items-center py-10 mt-20 justify-center border bg-white max-w-3xl min-h-[500px] rounded-md 
        mx-auto  border-gray-300 flex-col"
      >
        <form onSubmit={handleCreateBlog} className="mt-10">
          <div className="font-semibold text-xl text-center mb-5 underline italic">
            Cilli<span className="text-blue-500">Blog</span>
          </div>
          <div className="flex flex-col">
            <label>Category</label>
            <select
              name="category"
              value={input.category}
              onChange={handleChangeInput}
              className="border cursor-pointer mt-2 outline-none border-gray-200 rounded-md p-2"
            >
              <option>Select Category</option>
              <option value="devotion">Devotion</option>
              <option value="sports">Sports</option>
              <option value="coding">Coding</option>
              <option value="entertainment">Entertainment</option>
              <option value="business">Business</option>
            </select>

            <div className="my-2 mb-4">
              <label>Title</label>
              <input
                type="text"
                name="title"
                value={input.title}
                onChange={handleChangeInput}
                placeholder="Enter Your Blog Title"
                className="border w-full p-2 rounded-md mt-2 focus:outline-none"
              />
            </div>

            <label>Blog Image</label>
            <div className="flex items-center gap-2 my-2 mb-4">
              <div className="photo w-20 h-16 mr-4">
                <img
                  src={input.blogImagePreview}
                  alt="User Avatar"
                  className="object-cover w-full h-full rounded-full"
                />
              </div>
              <input
                type="file"
                // name="blogImagePreview"
                onChange={changePhotoHandler}
                className="border w-full p-2 rounded-md mt-2 focus:outline-none"
              />
            </div>

            <lable>About</lable>
            <div className="my-2">
              <textarea
                name="about"
                value={input.about}
                onChange={handleChangeInput}
                placeholder="Write Something About Your Blog"
                rows={5}
                className="w-full px-3 py-2 border border-gray-400 bg-gray-50 rounded-md outline-none"
              />
            </div>

            <button className="bg-blue-600 w-full py-2 rounded-md mt-6 text-white transition-all duration-200 ease-in-out hover:bg-blue-800 font-medium hover:scale-105">
              Post Blog
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
