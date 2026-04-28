import React from "react";
import Link from "next/link";

const Categories = ({ categories = [] }) => {
  console.log("Categories component received:", categories);
 console.log("categories")

  return (
    <aside>
      <h2 className="text-lg font-semibold mb-3">All Category</h2>
      <ul className="space-y-3">
        
        {categories.map((category, idx) => (
          <Link
            key={category?.category_id ?? idx}
            href={`/category/${category.category_id}`}
          >
            <li className="text-center text-gray-400">
              {category?.category_name ?? category?.name ?? "Untitled"}
            </li>
          </Link>
        ))}
      </ul>
    </aside>
  );
};

export default Categories;
