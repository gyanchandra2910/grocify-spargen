import React from "react";
import { useAppContext } from "../context/AppContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cartItems, products, currency, removeFromCart, updateCartItem } = useAppContext();
  
  // Get cart products
  const cartProducts = products.filter(product => cartItems[product._id]);
  
  // Calculate total
  const subtotal = cartProducts.reduce((total, product) => {
    return total + (product.offerPrice * cartItems[product._id]);
  }, 0);
  
  const shipping = subtotal > 0 ? 5 : 0;
  const total = subtotal + shipping;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Your Cart</h1>
      
      {cartProducts.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500 mb-4">Your cart is empty</p>
          <Link 
            to="/products" 
            className="inline-block px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-4">
              {cartProducts.map((product) => (
                <div key={product._id} className="flex items-center py-4 border-b border-gray-200 last:border-0">
                  <div className="w-20 h-20 flex-shrink-0">
                    <img 
                      src={product.image[0]} 
                      alt={product.name} 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="ml-4 flex-grow">
                    <h3 className="font-medium">{product.name}</h3>
                    <p className="text-gray-500 text-sm">{product.category}</p>
                    <p className="font-medium text-green-600 mt-1">
                      {currency}{product.offerPrice}
                      <span className="text-gray-400 text-sm line-through ml-2">
                        {currency}{product.price}
                      </span>
                    </p>
                  </div>
                  <div className="flex items-center justify-center gap-2 min-w-24 bg-gray-100 rounded-md px-2 py-1">
                    <button 
                      onClick={() => removeFromCart(product._id)} 
                      className="text-green-600 font-bold text-lg w-8 h-8 flex items-center justify-center hover:bg-gray-200 rounded-full"
                    >
                      -
                    </button>
                    <span className="text-center w-6">{cartItems[product._id]}</span>
                    <button 
                      onClick={() => updateCartItem(product._id)} 
                      className="text-green-600 font-bold text-lg w-8 h-8 flex items-center justify-center hover:bg-gray-200 rounded-full"
                    >
                      +
                    </button>
                  </div>
                  <div className="ml-4 text-right">
                    <p className="font-medium">
                      {currency}{(product.offerPrice * cartItems[product._id]).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">{currency}{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">{currency}{shipping.toFixed(2)}</span>
                </div>
                <div className="border-t pt-3 mt-3">
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>{currency}{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              <button 
                className="w-full py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition font-medium"
              >
                Proceed to Checkout
              </button>
              
              <Link 
                to="/products" 
                className="block text-center mt-4 text-green-600 hover:underline"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart; 