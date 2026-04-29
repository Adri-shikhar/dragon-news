const BASE = "https://openapi.programming-hero.com/api";

export const getCategories = async () => {
  const res = await fetch(`${BASE}/news/categories`);
  const data = await res.json();
  return data.data.news_category;
};

export const getCategoryNews = async (id) => {
  const res = await fetch(`${BASE}/news/category/${id}`);
  const data = await res.json();
  return data.data;
};

export const getNewsDetails = async (id) => {
  const res = await fetch(`${BASE}/news/${id}`);
  const data = await res.json();
  return data.data[0];
};

const newsapi = "https://openapi.programming-hero.com/api/news";

export const NewsDetails  = async (id) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/news/${id}`);
  const data = await res.json();
  return data.data[0];
};


