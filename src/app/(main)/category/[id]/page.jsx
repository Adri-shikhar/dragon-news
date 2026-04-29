import React from "react";
import Categories from "../../../Components/Categories/Categories";
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
import { FaChevronRight } from "react-icons/fa6";
import Link from "next/link";

import { getCategories, getCategoryNews } from "../../../../utils/api";
import RightSide from "@/app/Components/Rightsidebar/page";

const Category = async ({ params }) => {
  const { id } = await params;
  const [categories, categoryNews] = await Promise.all([
    getCategories(),
    getCategoryNews(id),
  ]);

  return (
    <div className="grid grid-cols-12 container mx-auto gap-6 py-6">
      {/* Sidebar – Categories */}
      <div className="col-span-3">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sticky top-4">
          <Categories categories={categories} />
        </div>
      </div>

      {/* Main content – News Feed */}
      <div className="col-span-6">
        {/* Results count badge */}
        <div className="mb-4 flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 bg-orange-50 text-orange-600 text-xs font-semibold px-3 py-1.5 rounded-full border border-orange-200">
            <FaNewspaper />
            {Array.isArray(categoryNews) ? categoryNews.length : 0} Articles
            Found
          </span>
        </div>

        <div className="space-y-5">
          {Array.isArray(categoryNews) && categoryNews.length > 0 ? (
            categoryNews.map((news, idx) => {
              const title = news.title || news.title_long || "Untitled";
              const image = news.image_url || news.thumbnail_url || "/";
              const details = (news.details || news.description || "").slice(
                0,
                250,
              );
              const views = news.total_view ?? news.views ?? 0;
              const ratingNum =
                parseFloat(news.rating?.number ?? news.rating ?? 0) || 0;
              const authorImg =
                news.author?.img || news.author?.img_url || null;
              const authorName =
                typeof news.author === "string"
                  ? news.author
                  : news.author?.name || "Unknown";
              const published = news.author?.published_date || "";

              return (
                <article
                  key={news._id ?? idx}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group"
                >
                  <div className="p-5">
                    {/* Author row */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        {authorImg ? (
                          <div className="ring-2 ring-orange-400 ring-offset-2 rounded-full shrink-0">
                            <Image
                              src={authorImg}
                              alt={authorName}
                              width={40}
                              height={40}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-linear-to-br from-orange-400 to-red-500 flex items-center justify-center text-sm font-bold text-white shrink-0">
                            {String(authorName)?.[0]?.toUpperCase() ?? "A"}
                          </div>
                        )}
                        <div>
                          <p className="text-sm font-semibold text-gray-800 leading-tight">
                            {authorName}
                          </p>
                          <p className="text-xs text-gray-400 mt-0.5">
                            {published}
                          </p>
                        </div>
                      </div>

                      {/* Action icons */}
                      <div className="flex items-center gap-2 text-gray-300">
                        <button
                          aria-label="Bookmark article"
                          className="p-1.5 rounded-full hover:bg-orange-50 hover:text-orange-500 transition-colors"
                        >
                          <FaRegBookmark />
                        </button>
                        <button
                          aria-label="Share article"
                          className="p-1.5 rounded-full hover:bg-orange-50 hover:text-orange-500 transition-colors"
                        >
                          <FaShareAlt />
                        </button>
                      </div>
                    </div>

                    {/* Title */}
                    <h2 className="text-base font-bold text-gray-900 mb-3 leading-snug group-hover:text-orange-600 transition-colors cursor-pointer">
                      {title}
                    </h2>
                  </div>

                  {/* Hero image – full bleed */}
                  <div className="overflow-hidden mx-5 rounded-xl mb-4">
                    <Image
                      src={image}
                      alt={title}
                      width={800}
                      height={420}
                      className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="px-5 pb-5">
                    {/* Excerpt */}
                    <p className="text-gray-500 text-sm leading-relaxed mb-4">
                      {details.slice(0, 250)}
                      {details.length > 250 ? "..." : ""}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <Link
                        href={`/News/${news._id}`}
                        className="text-sm font-semibold text-orange-500 hover:text-orange-600 transition-colors flex items-center gap-1"
                      >
                        Read More
                        <FaChevronRight className="text-xs" />
                      </Link>

                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <FaStar
                              key={star}
                              className={`text-xs ${star <= Math.round(ratingNum) ? "text-orange-400" : "text-gray-200"}`}
                            />
                          ))}
                          <span className="text-xs text-gray-400 ml-1">
                            {ratingNum > 0 ? ratingNum.toFixed(1) : "N/A"}
                          </span>
                        </div>

                        <div className="flex items-center gap-1 text-gray-400 text-xs">
                          <FaEye />
                          <span>{Number(views).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8 text-orange-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <p className="text-gray-500 font-medium">
                No news found for this category.
              </p>
              <p className="text-gray-400 text-sm mt-1">
                Try selecting a different category.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Right sidebar */}
      <div className="col-span-3">
      <RightSide params={params} />
      </div>
    </div>
  );
};

export default Category;
