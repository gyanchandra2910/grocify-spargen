import React from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

const ProductCard = ({ product }) => {
  const { currency, addToCart, updateCartItem, removeFromCart, cartItems, navigate } = useAppContext();

  return product && (
    <div className="border border-gray-500/20 rounded-md md:px-4 px-3 py-2 bg-white h-full flex flex-col">
      <div 
        className="group cursor-pointer flex items-center justify-center px-2 mb-3"
        onClick={() => navigate(`/product/${product._id}`)}
      >
        <img 
          className="group-hover:scale-105 transition h-40 object-contain" 
          src={product.image[0]} 
          alt={product.name} 
        />
      </div>
      <div className="text-gray-500/60 text-sm flex-grow">
        <p>{product.category}</p>
        <p className="text-gray-700 font-medium text-lg truncate w-full">{product.name}</p>
        <div className="flex items-center gap-0.5">
          {Array(5).fill('').map((_, i) => (
            <img 
              key={i} 
              className="md:w-3.5 w-3" 
              src={i < (product.rating || 4) ? assets.star_icon : assets.star_dull_icon} 
              alt="star" 
            />
          ))}
          <p>({product.rating || 4})</p>
        </div>
        <div className="flex items-end justify-between mt-3">
          <p className="md:text-xl text-base font-medium text-green-600">
            {currency}{product.offerPrice}{" "} 
            <span className="text-gray-500/60 md:text-sm text-xs line-through">${product.price}</span>
          </p>
          <div onClick={(e) => e.stopPropagation()} className="text-green-600">
            {!cartItems[product._id] ? (
              <button 
                className="flex items-center justify-center gap-1 bg-green-100 border border-green-300 md:w-[80px] w-[64px] h-[34px] rounded text-green-600 font-medium cursor-pointer" 
                onClick={() => addToCart(product._id)}
              >
                <img src={assets.cart_icon} alt="cart_icon" />
                Add
              </button>
            ) : (
              <div className="flex items-center justify-center gap-2 md:w-24 w-20 h-[34px] bg-green-100 rounded-md select-none">
                <button 
                  onClick={() => removeFromCart(product._id)} 
                  className="cursor-pointer text-lg px-2 h-full rounded-l-md hover:bg-green-200"
                >
                  -
                </button>
                <span className="w-5 text-center">{cartItems[product._id]}</span>
                <button 
                  onClick={() => updateCartItem(product._id)} 
                  className="cursor-pointer text-lg px-2 h-full rounded-r-md hover:bg-green-200"
                >
                  +
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;