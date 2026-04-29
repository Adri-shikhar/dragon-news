import React from "react";
import {
  FaGoogle,
  FaGithub,
  FaFacebook,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { NewsDetails } from "../../../../utils/api";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const news = await NewsDetails(id);
  if (!news) {
    return {
      title: "News Not Found",
      description: "No news details available for this ID.",
    };
  }
  return {
    title: news.title || "News Details",
    description:
      news.details?.slice(0, 150) || "News details page on Dragon News.",
  };
}

const NewsDetailsPage = async ({ params }) => {
  const { id } = await params;
  const news = await NewsDetails(id);

  if (!news) {
    return (
      <div className="container mx-auto py-20 text-center text-gray-500">
        <h2 className="text-2xl font-bold mb-4">News Not Found</h2>
        <p>No news details available for this ID.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <h2 className="font-bold text-xl mb-4">Dragon News</h2>
      <div className="grid grid-cols-12 gap-10">
        <div className="col-span-9">
          <div className="bg-white rounded-lg shadow p-6">
            {news.image_url && (
              <Image
                src={news.image_url}
                alt={news.title}
                className="w-full  object-cover rounded-md mb-6"
                width={500}
                height={500}
                priority
              />
            )}
            <h1 className="text-2xl font-bold mb-2">{news.title}</h1>
            <p className="text-gray-500 text-sm mb-4">
              {news.author?.published_date} | {news.author?.name}
            </p>
            <p className="text-gray-700 mb-6">{news.details}</p>
            <a
              href={`/category/${news.category_id}`}
              className="inline-block px-6 py-2 bg-rose-600 text-white rounded font-semibold hover:bg-rose-700 transition"
            >
              &larr; All news in this category
            </a>
          </div>
        </div>
        <div className="col-span-3">
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
      </div>
    </div>
  );
};

export default NewsDetailsPage;
