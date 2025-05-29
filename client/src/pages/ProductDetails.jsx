import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { assets } from "../assets/assets";

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { products, addToCart, cartItems, updateCartItem, removeFromCart, currency } = useAppContext();
    const [currentProduct, setCurrentProduct] = useState(null);
    const [selectedImage, setSelectedImage] = useState(0);

    useEffect(() => {
        if (products.length > 0) {
            const product = products.find(p => p._id === id);
            if (product) {
                setCurrentProduct(product);
                setSelectedImage(0);
            } else {
                navigate("/products");
            }
        }
    }, [id, products, navigate]);

    if (!currentProduct) {
        return (
            <div className="container mx-auto px-4 py-8 text-center">
                <p>Loading product details...</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <div className="bg-white rounded-lg p-4 mb-4">
                        <img
                            src={currentProduct.image[selectedImage]}
                            alt={currentProduct.name}
                            className="w-full h-80 object-contain"
                        />
                    </div>
                    <div className="flex gap-2 overflow-x-auto">
                        {currentProduct.image.map((img, index) => (
                            <div
                                key={index}
                                className={`border-2 rounded-md cursor-pointer p-2 w-20 h-20 flex-shrink-0 ${
                                    selectedImage === index ? "border-green-500" : "border-gray-200"
                                }`}
                                onClick={() => setSelectedImage(index)}
                            >
                                <img src={img} alt={`${currentProduct.name} view ${index + 1}`} className="w-full h-full object-contain" />
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <h1 className="text-2xl md:text-3xl font-bold mb-2">{currentProduct.name}</h1>
                    <p className="text-gray-600 mb-4">{currentProduct.category}</p>
                    
                    <div className="flex items-center gap-1 mb-4">
                        {Array(5).fill('').map((_, i) => (
                            <img 
                                key={i} 
                                className="w-4 h-4" 
                                src={i < (currentProduct.rating || 4) ? assets.star_icon : assets.star_dull_icon} 
                                alt="star" 
                            />
                        ))}
                        <span className="text-gray-500 text-sm">({currentProduct.rating || 4} ratings)</span>
                    </div>
                    
                    <div className="mb-6">
                        <p className="text-2xl font-bold text-green-600">
                            {currency}{currentProduct.offerPrice}
                            <span className="text-gray-400 text-base line-through ml-2">
                                {currency}{currentProduct.price}
                            </span>
                            <span className="text-green-600 text-base ml-2">
                                {Math.round(((currentProduct.price - currentProduct.offerPrice) / currentProduct.price) * 100)}% off
                            </span>
                        </p>
                    </div>
                    
                    <div className="mb-6">
                        <h3 className="font-semibold mb-2">Product Description</h3>
                        <ul className="list-disc list-inside space-y-1 text-gray-600">
                            {currentProduct.description.map((desc, index) => (
                                <li key={index}>{desc}</li>
                            ))}
                        </ul>
                    </div>
                    
                    <div className="mt-8">
                        {!cartItems[currentProduct._id] ? (
                            <button 
                                onClick={() => addToCart(currentProduct._id)}
                                className="w-full md:w-auto px-8 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition font-medium"
                            >
                                Add to Cart
                            </button>
                        ) : (
                            <div className="flex items-center gap-4">
                                <div className="flex items-center justify-center gap-3 bg-gray-100 rounded-md px-3 py-2">
                                    <button 
                                        onClick={() => removeFromCart(currentProduct._id)} 
                                        className="text-green-600 font-bold text-xl w-8 h-8 flex items-center justify-center hover:bg-gray-200 rounded-full"
                                    >
                                        -
                                    </button>
                                    <span className="text-center w-6">{cartItems[currentProduct._id]}</span>
                                    <button 
                                        onClick={() => updateCartItem(currentProduct._id)} 
                                        className="text-green-600 font-bold text-xl w-8 h-8 flex items-center justify-center hover:bg-gray-200 rounded-full"
                                    >
                                        +
                                    </button>
                                </div>
                                <button 
                                    onClick={() => navigate("/cart")}
                                    className="px-8 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition font-medium"
                                >
                                    Go to Cart
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;