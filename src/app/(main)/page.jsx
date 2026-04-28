import React from "react";
import Categories from "../Components/Categories/Categories";


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
      <div className="col-span-3 bg-white p-4">
        <h1 className="text-lg font-medium">Editors Pick</h1>
      </div>
    </div>
  );
};

export default Homepage;
