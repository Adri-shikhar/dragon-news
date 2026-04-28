import React from "react";
import Link from "next/link";
import Mylink from "../Navbar/Mylink";
import CategoryLink from "./CategoryLink";  

const Categories = ({ categories = [] }) => {
  return (
    <aside>
      <h2 className="text-base font-bold text-gray-800 mb-4 flex items-center gap-2">
        <span className="w-1 h-5 bg-orange-500 rounded-full inline-block"></span>
        All Category
      </h2>
      <ul className="space-y-1.5">
        {categories.map((category, idx) => (
          <li key={category?.category_id ?? idx}>
            <CategoryLink
              href={`/category/${category.category_id}`}
              className="flex items-center justify-between w-full px-3 py-2 rounded-xl text-sm font-medium text-gray-600 hover:bg-orange-50 hover:text-orange-600 transition-all duration-200 group"
            >
              <span>{category?.category_name ?? category?.name ?? "Untitled"}</span>
           
            </CategoryLink>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Categories;
