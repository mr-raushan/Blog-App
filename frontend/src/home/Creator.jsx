import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Creator() {
  const [admin, setAdmin] = useState([]);

  useEffect(() => {
    const fetchAdmin = async () => {
      const res = await axios.get("http://localhost:4001/api/users/admins", {
        withCredentials: true,
      });
      // console.log(res.data.admins);
      setAdmin(res.data.admins);
    };
    fetchAdmin();
  }, []);

  return (
    <div className="container mx-auto  md:px-32 ">
      <h1 className="text-2xl font-bold mb-6 px-5 md:px-0">Popular Creators</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:ml-[-60px] my-5 place-items-center">
        {admin && admin.length > 0 ? (
          admin.slice(0, 4).map((user) => {
            return (
              <div key={user._id} className="">
                <img
                  src={user?.photo?.url}
                  alt="user-img"
                  className="w-56 h-56 rounded-full cursor-pointer object-cover"
                />
                <div className="my-2 cursor-pointer ml-[40px] md:ml-0">
                  <p className="text-lg font-semibold">{user.name}</p>
                  <p className="text-sm ml-6  font-medium text-gray-600">
                    {user.role}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex h-screen items-center justify-center font-bold">
            loading...
          </div>
        )}
      </div>
    </div>
  );
}
