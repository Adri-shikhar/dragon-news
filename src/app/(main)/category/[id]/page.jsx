import React from "react";
import Categories from "../../../Components/Categories/Categories";
import Image from "next/image";
import { FaGoogle, FaGithub, FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa6";

const api = "https://openapi.programming-hero.com/api/news/categories";
const fetchData = async () => {
  const response = await fetch(api);
  const data = await response.json();
  const categories = data.data.news_category;
  return categories;
};

const Category = async ({ params }) => {
  const { id } = await params;
  const categories = await fetchData();

  const apiCategory = `https://openapi.programming-hero.com/api/news/category/${id}`;
  const response = await fetch(apiCategory);
  const data = await response.json();
  const categoryNews = data.data;

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
            <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
            {Array.isArray(categoryNews) ? categoryNews.length : 0} Articles Found
          </span>
        </div>

        <div className="space-y-5">
          {Array.isArray(categoryNews) && categoryNews.length > 0 ? (
            categoryNews.map((news, idx) => {
              const title =
                news.title || news.title_long || news._title || "Untitled";
              const image =
                news.image_url || news.thumbnail_url || news.thumbnail || "/";

              // Normalize author
              let author = "Unknown";
              if (news.author) {
                if (typeof news.author === "string") {
                  author = news.author;
                } else if (typeof news.author === "object") {
                  if (news.author.name && typeof news.author.name === "string") {
                    author = news.author.name;
                  } else if (news.author.name && typeof news.author.name === "object") {
                    author = [news.author.name.first, news.author.name.last]
                      .filter(Boolean)
                      .join(" ");
                    if (!author) author = JSON.stringify(news.author.name);
                  } else {
                    author = JSON.stringify(news.author);
                  }
                } else {
                  author = String(news.author);
                }
              }

              // Normalize details
              let details = "";
              if (news.details) {
                details = typeof news.details === "string" ? news.details : JSON.stringify(news.details);
              } else if (news.description) {
                details = typeof news.description === "string" ? news.description : JSON.stringify(news.description);
              }

              const views = news.total_view ?? news.views ?? 0;
              const ratingNum = parseFloat(news.rating?.number ?? news.rating ?? 0) || 0;

              const authorImg =
                news?.author?.img || news?.author?.img_url || news?.author?.image || null;
              const authorName =
                typeof news?.author === "string"
                  ? news.author
                  : news?.author?.name || author || "Unknown";
              const published = news?.author?.published_date || news?.published_date || "";

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
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-sm font-bold text-white shrink-0">
                            {String(authorName)?.[0]?.toUpperCase() ?? "A"}
                          </div>
                        )}
                        <div>
                          <p className="text-sm font-semibold text-gray-800 leading-tight">
                            {authorName}
                          </p>
                          <p className="text-xs text-gray-400 mt-0.5">{published}</p>
                        </div>
                      </div>

                      {/* Action icons */}
                      <div className="flex items-center gap-2 text-gray-300">
                        <button
                          aria-label="Bookmark article"
                          className="p-1.5 rounded-full hover:bg-orange-50 hover:text-orange-500 transition-colors"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                          </svg>
                        </button>
                        <button
                          aria-label="Share article"
                          className="p-1.5 rounded-full hover:bg-orange-50 hover:text-orange-500 transition-colors"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                          </svg>
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
                      <a
                        href="#"
                        className="text-sm font-semibold text-orange-500 hover:text-orange-600 transition-colors flex items-center gap-1 group/link"
                      >
                        Read More
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 translate-x-0 group-hover/link:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </a>

                      <div className="flex items-center gap-4">
                        {/* Star rating */}
                        <div className="flex items-center gap-1.5">
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <svg
                                key={star}
                                xmlns="http://www.w3.org/2000/svg"
                                className={`w-3.5 h-3.5 ${
                                  star <= Math.round(ratingNum)
                                    ? "text-orange-400"
                                    : "text-gray-200"
                                }`}
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                          <span className="text-xs text-gray-400 font-medium">
                            {ratingNum > 0 ? ratingNum.toFixed(1) : "N/A"}
                          </span>
                        </div>

                        {/* Views */}
                        <div className="flex items-center gap-1 text-gray-400 text-xs font-medium">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
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
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-gray-500 font-medium">No news found for this category.</p>
              <p className="text-gray-400 text-sm mt-1">Try selecting a different category.</p>
            </div>
          )}
        </div>
      </div>

      {/* Right sidebar */}
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

export default Category;
