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
import RightSide from "@/app/Components/Rightsidebar/page";

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
          <RightSide params={params} />
        </div>
      </div>
    </div>
  );
};

export default NewsDetailsPage;
