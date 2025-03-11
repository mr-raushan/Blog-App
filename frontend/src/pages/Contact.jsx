import React from "react";
import { FaPhone } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { MdLocationPin } from "react-icons/md";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

export default function Contact() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    const userInfo = {
      access_key: "32342261-da0a-4155-8965-5702ef223708",
      name: data.username,
      email: data.email,
      message: data.message,
    };

    try {
      const res = await axios.post(
        "https://api.web3forms.com/submit",
        userInfo,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      console.log(res);
      toast.success("form submitted successfully");
      reset();
    } catch (error) {
      console.log("Error in contact form", error);
      toast.error("error in contact form");
    }
  };

  console.log(watch("example")); // watch input value by passing the name of it

  return (
    <div>
      <div className="bg-gray-50 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl w-full space-y-8 bg-white p-10 rounded-lg shadow-lg">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Contact Us
            </h2>
          </div>
          <div className="flex flex-col md:flex-row justify-between">
            <div className="w-full md:w-1/2 mb-8 md:mb-0 md:pr-4">
              <h3 className="text-lg font-medium text-gray-700 mb-4">
                Send us a message
              </h3>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <input
                    type="text"
                    name="username"
                    placeholder="Your Name"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    {...register("username", { required: true })}
                  />
                  {errors.username && (
                    <span className="text-sm text-red-500 font-semibold">
                      This field is required
                    </span>
                  )}
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    {...register("email", { required: true })}
                  />
                  {errors.email && (
                    <span className="text-sm text-red-500 font-semibold">
                      This field is required
                    </span>
                  )}
                </div>
                <div>
                  <textarea
                    name="message"
                    placeholder="Your Message"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    {...register("message", { required: true })}
                  />
                  {errors.message && (
                    <span className="text-sm text-red-500 font-semibold">
                      This field is required
                    </span>
                  )}
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full bg-black text-white px-4 py-2 rounded-lg hover:bg-yellow-600 duration-300 "
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
            <div className="w-full md:w-1/2 md:pl-4">
              <h3 className="text-lg font-medium text-gray-700 mb-4">
                Contact Information
              </h3>
              <ul className="space-y-4">
                <li className="flex items-center space-x-2">
                  <FaPhone className="text-red-500" />
                  <span>+91 9876543219</span>
                </li>
                <li className="flex items-center space-x-2">
                  <MdEmail className="text-pink-500" />
                  <span>kraushan9056@gmail.com</span>
                </li>
                <li className="flex items-center space-x-2">
                  <MdLocationPin className="text-green-500" />
                  <span>Delhi, NCR, India</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
