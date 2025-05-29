import React from "react";
import { assets, categories } from "../assets/assets";
import { useNavigate } from "react-router-dom";
const Categories = () => {
  const navigate = useNavigate();
  return (
    <div className="mt-16 container mx-auto px-4">
      <p className="text-2xl md:text-3xl font-medium mb-6">Categories</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-6">
        {categories.map((category, index) => (
          <div
            key={index}
            className="group cursor-pointer py-5 px-3 rounded-lg flex flex-col justify-center items-center"
            style={{ backgroundColor: category.bgColor }}
            onClick={() => {
              navigate(`/products/${category.path.toLowerCase()}`);
              window.scrollTo(0, 0);
            }}
          >
            <img src={category.image} alt={category.text} className="h-20 w-20 object-contain" />
            <p className="text-sm font-medium text-gray-700 group-hover:text-green-600 transition mt-2">
              {category.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
