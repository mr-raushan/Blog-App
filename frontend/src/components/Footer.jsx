import React from "react";
import { FaGithub } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();
  return (
    <>
      <footer className="">
        <div className="container mx-auto border-t py-10 md:px-32 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className=" text-center md:text-start">
            <h2 className="text-lg font-semibold mb-4">Products</h2>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-gray-700">
                  Flutter
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-gray-700">
                  React
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-gray-700">
                  Android
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-gray-700">
                  iOS
                </a>
              </li>
            </ul>
          </div>
          <div className=" text-center md:text-start">
            <h2 className="text-lg font-semibold mb-4">Design to code</h2>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-gray-700">
                  Figma plugin
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-gray-700">
                  Templates
                </a>
              </li>
            </ul>
          </div>

          <div className=" text-center md:text-start">
            <h2 className="text-lg font-semibold mb-4">Comparison</h2>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-gray-700">
                  DhiWise vs Anima
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-gray-700">
                  DhiWise vs Appsmith
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-gray-700">
                  DhiWise vs FlutterFlow
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-gray-700">
                  DhiWise vs Monday Hero
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-gray-700">
                  DhiWise vs Retool
                </a>
              </li>

              <li>
                <a href="#" className="text-gray-400 hover:text-gray-700">
                  DhiWise vs Bubble
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-gray-700">
                  DhiWise vs Figma Dev Mode
                </a>
              </li>
            </ul>
          </div>
          <div className=" text-center md:text-start">
            <h2 className="text-lg font-semibold mb-4">Company</h2>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-gray-700">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-gray-700">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-gray-700">
                  Career
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-gray-700">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-gray-700">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
      <div className=" container mx-auto md:px-32 border-t py-5 flex flex-col md:flex-row justify-between items-center">
        <div
          className="text-xl font-semibold hidden md:flex cursor-pointer"
          onClick={() => navigate("/")}
        >
          Cilli<span className="text-blue-500 font-bold">Blog</span>
        </div>
        <div className="text-gray-400 text-sm hidden md:flex">
          <p>&copy; 2025 DhiWise PVT LTD. All rights reserved</p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-4">
          <a href="https://github.com/" target="blank">
            <FaGithub className="h-6" />
          </a>
          <a href="#">
            <FaYoutube className="h-6" />
          </a>

          <a href="https://www.linkedin.com/" target="blank">
            <FaLinkedin className="h-6" />
          </a>
        </div>
      </div>
    </>
  );
}
