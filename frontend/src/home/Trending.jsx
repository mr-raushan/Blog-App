import React from "react";
import { useAuth } from "../context/AuthProvider";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Link } from "react-router-dom";

export default function Trending() {
  const { blogs } = useAuth();
  // console.log("trending blogs ", blogs);

  return (
    <div className="container mx-auto px-4 mb-10 md:px-32 rounded-md">
      {blogs && blogs.length > 0 ? (
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={20}
          slidesPerView={1} // Default for mobile
          breakpoints={{
            640: { slidesPerView: 2 }, // Tablets
            1024: { slidesPerView: 3 }, // Laptops
            1280: { slidesPerView: 4 }, // Large screens
          }}
          navigation
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          className="pb-10"
        >
          {blogs.map((element) => (
            <SwiperSlide key={element._id}>
              <Link
                to={`/blog/${element._id}`}
                className="bg-white rounded-lg hover:shadow-lg overflow-hidden transform transition-transform 
                duration-300 hover:scale-105"
              >
                <div className="group relative">
                  <img
                    src={
                      element?.blogImage?.url ||
                      "https://via.placeholder.com/800x400"
                    }
                    alt="Blog"
                    className="w-full h-56 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <h1 className="absolute bottom-4 left-4 text-white text-xl font-bold group-hover:text-yellow-500 transition-colors duration-300">
                    {element?.title || "Untitled Blog"}
                  </h1>
                </div>
                <div className="p-6 flex items-center">
                  <img
                    src={element.adminPhoto}
                    alt=""
                    className="w-12 h-12 rounded-full border-2 border-yellow-400"
                  />
                  <div className="ml-4">
                    <p className="text-lg font-semibold text-gray-800">
                      {element.adminName}
                    </p>
                    <p className="text-xs text-gray-400">New</p>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className="flex h-40 items-center justify-center text-xl font-semibold">
          Loading...
        </div>
      )}
    </div>
  );
}
