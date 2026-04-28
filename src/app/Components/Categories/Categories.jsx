import React from "react";

const Categories = ({ categories = [] }) => {


  return (
    <aside>
      <h2 className="text-lg font-semibold mb-3">All Category</h2>
      <ul className="space-y-3">
        {categories.map((category, idx) => (
          <li
            key={category?.category_id ?? idx}
            className="text-center text-gray-400"
          >
            {category?.category_name ?? category?.name ?? "Untitled"}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Categories;
