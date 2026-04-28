import React from "react";
import Categories from "../../../Components/Categories/Categories";
import Image from "next/image";

const api = "https://openapi.programming-hero.com/api/news/categories";
const fetchData = async () => {
  const response = await fetch(api);
  const data = await response.json();
  const categories = data.data.news_category;
  return categories;
};

const Category = async ({ params }) => {
  //console.log("Category page params:", params);
  const { id } = await params;
  console.log("Category ID:", id);
  const categories = await fetchData();

  const apiCategory = `https://openapi.programming-hero.com/api/news/category/${id}`;
  const response = await fetch(apiCategory);
  // console.log("API response for category news:", response);
  const data = await response.json();
  const categoryNews = data.data;
  console.log("Category news data:", categoryNews);

  return (
    <div className="grid grid-cols-12 container mx-auto gap-4">
      <div className="col-span-3 bg-white p-4 ">
        <Categories categories={categories} />
      </div>
      <div className="col-span-6 bg-white p-8">
        <p className="mt-2 text-sm text-gray-600">Category ID: {id}</p>

        <div className="mt-6 space-y-6">
          {Array.isArray(categoryNews) && categoryNews.length > 0 ? (
            categoryNews.map((news, idx) => {
              const title =
                news.title || news.title_long || news._title || "Untitled";
              const image =
                news.image_url || news.thumbnail_url || news.thumbnail || "/";
              // normalize author to a string to avoid rendering objects
              let author = "Unknown";
              if (news.author) {
                if (typeof news.author === "string") {
                  author = news.author;
                } else if (typeof news.author === "object") {
                  if (
                    news.author.name &&
                    typeof news.author.name === "string"
                  ) {
                    author = news.author.name;
                  } else if (
                    news.author.name &&
                    typeof news.author.name === "object"
                  ) {
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

              // ensure details is a string
              let details = "";
              if (news.details) {
                details =
                  typeof news.details === "string"
                    ? news.details
                    : JSON.stringify(news.details);
              } else if (news.description) {
                details =
                  typeof news.description === "string"
                    ? news.description
                    : JSON.stringify(news.description);
              }

              const views = news.total_view ?? news.views ?? 0;
              const rating = news.rating?.number ?? news.rating ?? null;

              // extract author details if available
              const authorImg =
                news?.author?.img ||
                news?.author?.img_url ||
                news?.author?.image ||
                null;
              const authorName =
                typeof news?.author === "string"
                  ? news.author
                  : news?.author?.name || author || "Unknown";
              const published =
                news?.author?.published_date || news?.published_date || "";

              return (
                <article
                  key={news._id ?? idx}
                  className="border rounded-lg p-4 bg-white shadow-sm"
                >
                  {/* header: author row */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      {authorImg ? (
                        <Image
                          src={authorImg}
                          alt={authorName}
                          width={40}
                          height={40}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-sm text-gray-600">
                          A
                        </div>
                      )}
                      <div>
                        <div className="text-sm font-medium">{authorName}</div>
                        <div className="text-xs text-gray-400">{published}</div>
                      </div>
                    </div>
                    <div className="text-gray-400 text-sm">🔖 ⋯</div>
                  </div>

                  {/* title */}
                  <h2 className="text-xl font-bold mb-3">{title}</h2>

                  {/* image */}
                  <div className="mb-4">
                    <Image
                      src={image}
                      alt={title}
                      width={800}
                      height={420}
                      className="w-full h-52 object-cover rounded"
                    />
                  </div>

                  {/* excerpt */}
                  <p className="text-gray-700 text-sm mb-4">
                    {details.slice(0, 250)}
                    {details.length > 250 ? "..." : ""}
                  </p>

                  <div className="flex items-center justify-between">
                    <a href="#" className="text-orange-500 font-medium">
                      Read More
                    </a>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <div className="flex items-center text-orange-400">
                          <span>★</span>
                          <span>★</span>
                          <span>★</span>
                          <span>★</span>
                          <span>★</span>
                        </div>
                        <div className="text-sm text-gray-600 ml-2">
                          {rating ?? "N/A"}
                        </div>
                      </div>
                      <div className="text-gray-500">👁 {views}</div>
                    </div>
                  </div>
                </article>
              );
            })
          ) : (
            <div className="text-gray-500">
              No news found for this category.
            </div>
          )}
        </div>
      </div>
      <div className="col-span-3 bg-white p-4">
        <h1 className="text-lg font-medium">Editors Pick</h1>
      </div>
    </div>
  );
};

export default Category;
