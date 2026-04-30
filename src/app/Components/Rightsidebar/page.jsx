"use client";
import React from "react";
import Image from "next/image";
import {
  FaGoogle,
  FaGithub,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaRegBookmark,
  FaShareAlt,
  FaStar,
  FaEye,
  FaNewspaper,
} from "react-icons/fa";
import { authClient } from "@/lib/auth-client";

const RightSide = () => {
  const handlegoogle = async () => {
    try {
      console.log("Attempting Google sign-in...");
      const data = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
      console.log("Google sign-in result:", data);
    } catch (err) {
      console.error("Google sign-in error:", err);
    }
  };
  const handlegithub = async () => {
    try {
      console.log("Attempting GitHub sign-in...");
      const data = await authClient.signIn.social({
        provider: "github",
        callbackURL: "/",
      });
      console.log("GitHub sign-in result:", data);
    } catch (err) {
      console.error("GitHub sign-in error:", err);
    }
  };


  return (
    <div>
      {/* Right sidebar */}
      <div>
        {/* Login Card */}
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <p className="font-bold text-gray-800 mb-3">Login With</p>
          <div className="space-y-2">
            <button
              onClick={handlegoogle}
              className="flex items-center gap-2 w-full px-3 py-2 border border-blue-500 rounded-md text-sm text-blue-600"
            >
              <FaGoogle className="text-blue-500" />
              Login with Google
            </button>
            <button
              onClick={handlegithub}
              className="flex items-center gap-2 w-full px-3 py-2 border border-gray-400 rounded-md text-sm text-gray-700"
            >
              <FaGithub className="text-gray-700" />
              Login with Github
            </button>
          </div>
        </div>

        {/* Find Us On */}
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <p className="font-bold text-gray-800 mb-3">Find Us On</p>
          <div className="space-y-2">
            <a
              id="social-facebook"
              href="#"
              className="flex items-center gap-3 px-3 py-2 border border-gray-200 rounded-md text-sm text-gray-700"
            >
              <FaFacebook className="text-blue-600 text-lg" />
              Facebook
            </a>
            <a
              id="social-twitter"
              href="#"
              className="flex items-center gap-3 px-3 py-2 border border-gray-200 rounded-md text-sm text-gray-700"
            >
              <FaTwitter className="text-sky-500 text-lg" />
              Twitter
            </a>
            <a
              id="social-instagram"
              href="#"
              className="flex items-center gap-3 px-3 py-2 border border-gray-200 rounded-md text-sm text-gray-700"
            >
              <FaInstagram className="text-pink-500 text-lg" />
              Instagram
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSide;
