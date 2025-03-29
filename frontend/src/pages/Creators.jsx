import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_URL } from "../utils";

export default function Creators() {
  const [creators, setCreators] = useState([]);

  useEffect(() => {
    const fetchCreators = async () => {
      const res = await axios.get(`${API_URL}/api/users/admins`, {
        withCredentials: true,
      });
      // console.log(res.data.admins);
      setCreators(res.data.admins);
    };
    fetchCreators();
  }, []);

  return (
    <div className="flex flex-wrap container mx-auto md:px-32 justify-center items-center py-10 bg-gray-100">
      {creators.map((creator) => {
        return (
          <div
            key={creator._id}
            className="bg-white cursor-pointer hover:scale-105 duration-100 transition-all  shadow-lg rounded-lg overflow-hidden max-w-xs w-full m-2"
          >
            <div className="relative">
              <img
                src={creator.photo?.url}
                alt="adminImg"
                className="w-full h-32 object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 transform translate-y-1/2">
                <img
                  src={creator?.photo?.url}
                  alt="adminImg"
                  className="w-16 h-16 rounded-full mx-auto border-4 border-gray-700"
                />
              </div>
            </div>
            <div className="px-4 py-6 mt-4">
              <h2 className="font-bold text-center text-xl text-gray-800">
                {creator?.name}
              </h2>
              <p className="text-center text-gray-600 mt-2">{creator?.email}</p>
              <p className="text-center text-gray-600 mt-2">{creator?.phone}</p>
              <p className="text-center text-gray-600 mt-2">{creator?.role}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
