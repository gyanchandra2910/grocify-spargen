import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

const MainBanner = () => {
  return (
    <div className="relative">
      <div className="relative">
        <img
          src={assets.main_banner_bg}
          alt="main banner"
          className="w-full hidden md:block"
        />
        <img
          src={assets.main_banner_bg_sm}
          alt="main banner"
          className="w-full block md:hidden"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="max-w-7xl mx-auto text-center px-4">
            <h1 className="text-2xl md:text-4xl font-bold text-center mb-6 text-white drop-shadow-lg">
              Freshness You Can Trust, Saving You Will Love!
            </h1>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6 font-medium">
              <Link
                to="/products"
                className="group flex items-center gap-2 px-7 md:px-9 py-3 bg-green-600 hover:bg-green-700 transition rounded-full text-white cursor-pointer"
              >
                Shop Now
                <img
                  className="w-4 group-hover:translate-x-1 transition-all"
                  src={assets.white_arrow_icon}
                  alt="arrow right"
                />
              </Link>
              <Link
                to="/products"
                className="group flex items-center gap-2 px-7 md:px-9 py-3 bg-white hover:bg-gray-100 transition rounded-full text-green-700 cursor-pointer"
              >
                Explore Deals
                <img
                  className="w-4 group-hover:translate-x-1 transition-all"
                  src={assets.black_arrow_icon}
                  alt="arrow right"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainBanner;
