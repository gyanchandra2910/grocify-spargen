import React, { useState, useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, products, currency, removeFromCart, updateCartItem } = useAppContext();
  const [cartArray, setCartArray] = useState([]);
  const [showAddress, setShowAddress] = useState(false);
  const [paymentOption, setPaymentOption] = useState("COD");

  const getCart = () => {
    let tempArray = [];
    for(const key in cartItems) {
      const product = products.find(product => product._id === key);
      if (product) {
        product.quantity = cartItems[key];
        tempArray.push(product);
      }
    }
    setCartArray(tempArray);
  };

  useEffect(() => {
    if(products.length > 0) {
      getCart();
    }
  }, [cartItems, products]);

  const getCartCount = () => {
    return Object.values(cartItems).reduce((total, quantity) => total + quantity, 0);
  };

  // Calculate total
  const subtotal = cartArray.reduce((total, product) => {
    return total + (product.offerPrice * product.quantity);
  }, 0);
  
  const shipping = 0; // Free shipping
  const tax = subtotal * 0.02; // 2% tax
  const total = subtotal + shipping + tax;

  if (cartArray.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Your Cart</h1>
        <div className="text-center py-10">
          <p className="text-gray-500 mb-4">Your cart is empty</p>
          <Link 
            to="/products" 
            className="inline-block px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row py-16 max-w-6xl w-full px-6 mx-auto">
      <div className='flex-1 max-w-4xl'>
        <h1 className="text-3xl font-medium mb-6">
          Shopping Cart <span className="text-sm text-green-600">{getCartCount()} Items</span>
        </h1>

        <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-base font-medium pb-3">
          <p className="text-left">Product Details</p>
          <p className="text-center">Subtotal</p>
          <p className="text-center">Action</p>
        </div>

        {cartArray.map((product) => (
          <div key={product._id} className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 items-center text-sm md:text-base font-medium pt-3 border-t border-gray-200 py-4">
            <div className="flex items-center md:gap-6 gap-3">
              <div 
                onClick={() => {
                  navigate(`/product/${product.category.toLowerCase()}/${product._id}`);
                  window.scrollTo(0, 0);
                }} 
                className="cursor-pointer w-24 h-24 flex items-center justify-center border border-gray-300 rounded"
              >
                <img className="max-w-full h-full object-contain" src={product.image[0]} alt={product.name} />
              </div>
              <div>
                <p className="font-semibold">{product.name}</p>
                <div className="font-normal text-gray-500/70">
                  <p>Category: <span>{product.category}</span></p>
                  <div className='flex items-center gap-2'>
                    <p>Qty:</p>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => removeFromCart(product._id)} 
                        className="text-green-600 w-6 h-6 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200"
                      >
                        -
                      </button>
                      <span>{product.quantity}</span>
                      <button 
                        onClick={() => updateCartItem(product._id)} 
                        className="text-green-600 w-6 h-6 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-center font-medium">{currency}{(product.offerPrice * product.quantity).toFixed(2)}</p>
            <button 
              onClick={() => {
                for (let i = 0; i < product.quantity; i++) {
                  removeFromCart(product._id);
                }
              }} 
              className="cursor-pointer mx-auto"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="m12.5 7.5-5 5m0-5 5 5m5.833-2.5a8.333 8.333 0 1 1-16.667 0 8.333 8.333 0 0 1 16.667 0" stroke="#FF532E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        ))}

        <Link 
          to="/products" 
          className="group cursor-pointer flex items-center mt-8 gap-2 text-green-600 font-medium"
        >
          <svg width="15" height="11" viewBox="0 0 15 11" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.09 5.5H1M6.143 10 1 5.5 6.143 1" stroke="#22C55E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Continue Shopping
        </Link>
      </div>

      <div className="max-w-[360px] w-full bg-gray-100/40 p-5 max-md:mt-16 border border-gray-300/70">
        <h2 className="text-xl md:text-xl font-medium">Order Summary</h2>
        <hr className="border-gray-300 my-5" />

        <div className="mb-6">
          <p className="text-sm font-medium uppercase">Delivery Address</p>
          <div className="relative flex justify-between items-start mt-2">
            <p className="text-gray-500">No address found</p>
            <button onClick={() => setShowAddress(!showAddress)} className="text-green-600 hover:underline cursor-pointer">
              Change
            </button>
            {showAddress && (
              <div className="absolute top-12 py-1 bg-white border border-gray-300 text-sm w-full z-10">
                <p onClick={() => setShowAddress(false)} className="text-gray-500 p-2 hover:bg-gray-100">
                  New York, USA
                </p>
                <p onClick={() => setShowAddress(false)} className="text-green-600 text-center cursor-pointer p-2 hover:bg-green-500/10">
                  Add address
                </p>
              </div>
            )}
          </div>

          <p className="text-sm font-medium uppercase mt-6">Payment Method</p>
          <select 
            value={paymentOption}
            onChange={(e) => setPaymentOption(e.target.value)}
            className="w-full border border-gray-300 bg-white px-3 py-2 mt-2 outline-none rounded"
          >
            <option value="COD">Cash On Delivery</option>
            <option value="Online">Online Payment</option>
          </select>
        </div>

        <hr className="border-gray-300" />

        <div className="text-gray-500 mt-4 space-y-2">
          <p className="flex justify-between">
            <span>Price</span><span>{currency}{subtotal.toFixed(2)}</span>
          </p>
          <p className="flex justify-between">
            <span>Shipping Fee</span><span className="text-green-600">Free</span>
          </p>
          <p className="flex justify-between">
            <span>Tax (2%)</span><span>{currency}{tax.toFixed(2)}</span>
          </p>
          <p className="flex justify-between text-lg font-medium mt-3">
            <span>Total Amount:</span><span>{currency}{total.toFixed(2)}</span>
          </p>
        </div>

        <button className="w-full py-3 mt-6 cursor-pointer bg-green-600 text-white font-medium hover:bg-green-700 transition rounded">
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Cart;