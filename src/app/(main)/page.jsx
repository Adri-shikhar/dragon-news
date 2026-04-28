import React from "react";
import Categories from "../Components/Categories/Categories";
import { FaGoogle, FaGithub, FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa6";


const api = "https://openapi.programming-hero.com/api/news/categories";
const fetchData = async () => {
  const response = await fetch(api);
  const data = await response.json();
  const categories = data.data.news_category;
  return categories;
};

const Homepage = async () => {
  const categories = await fetchData();
  console.log(categories);

  return (
    <div className="grid grid-cols-12 container mx-auto gap-4">
      <div className="col-span-3 bg-white p-4 ">
        <Categories categories={categories} />
      </div>
      <div className="col-span-6 bg-white p-8">
        <h1 className="text-2xl font-bold">Dragon News Home Page</h1>
      </div>
      <div className="col-span-3 space-y-4">
     
             {/* Login Card */}
             <div className="bg-white border border-gray-200 rounded-lg p-4">
              
               <p className="font-bold text-gray-800 mb-3">Login With</p>
               <div className="space-y-2">
                 <button
                   id="login-google-btn"
                   className="flex items-center gap-2 w-full px-3 py-2 border border-blue-500 rounded-md text-sm text-blue-600"
                 >
                   <FaGoogle className="text-blue-500" />
                   Login with Google
                 </button>
                 <button
                   id="login-github-btn"
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

export default Homepage;
