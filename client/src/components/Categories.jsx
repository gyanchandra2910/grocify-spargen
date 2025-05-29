import React from "react";
import { assets, categories } from "../assets/assets";

const Categories = () => {
  return (
    <div className="mt-16">
      <p className="text-2x1 md:text-3x1 font-medium">Categories</p>

      {categories.map((category, index) => (
        <div
          key={index}
          className="group cursor-pointer py-5 px-3 gap-2 rounded-lg flex flex-col justify-center items-center mt-6"
        style={{ backgroundColor: category.bgColor }}
        >
          <img src={category.image} alt={category.text} />
          <p className="text-sm font-medium text-gray-700 group-hover:text-green-600 transition">
            {category.text}
          </p>
        </div>
      ))}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-col-6 xl:grid-cols-7 mt-6 gap-6">
        <div className="group cursor-pointer py-5 px-3 gap-2 rrounded-lg flex flex-col justify-center items-center  ">
          <img src={assets.box_icon} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Categories;
