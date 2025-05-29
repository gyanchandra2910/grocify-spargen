import React from "react";
import assets, { features } from "../assets/assets";

const BottomBanner = () => {
  return (
     <div  className="relative mt-2">
        <img src={assets.bottom_banner} alt="bottom_banner" className="w-full hidden md:block" />
        <img src={assets.bottom_banner_image_sm} alt="bottom_banner" className="w-full md:hidden" />
        <div className= "absolute inset-0 flex flex-col items-center md:items-end md:justify-center pt-16 md:pt-0 md:pr-24">
            <h1 className="text-white text-3xl md:text-5xl font-medium">Why Choose Us</h1>
            {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                    <img src={feature.icon} alt={feature.title} className="flex items-center gap-4 mt-2" />
                    <div>
                        <h3 className="text-lg md:text-xl font-semibold">{feature.description}</h3>
                        <p className="text-gray-500/70 text-xs md:text-sm">{feature.description}</p>
                    </div>
                </div>
            ))}

        </div>
     </div>   
  );
};

export default BottomBanner;

