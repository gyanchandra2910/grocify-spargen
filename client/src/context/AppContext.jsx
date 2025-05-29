import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
export const AppContext = createContext();
import { dummyProducts } from "../assets/assets";
import { toast } from "react-hot-toast";

export const AppContextProvider = ({ children }) => {
  const currency = import.meta.VITE_CURRENCY || "$";
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isSeller, setIsSeller] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [searchQuery, setSearchQuery] = useState({});

//Fetch all products

  const fetchProducts = async () => {
    setProducts(dummyProducts);
  };

//Add Product to Cart

  const addToCart = (itemId) => {
    let cartData = structuredClone(cartItems);
    if(cartData[itemId]) {
      cartData[itemId] += 1;
    } else {
      cartData[itemId] = 1;
    }
    setCartItems(cartData);
    toast.success("Product added to cart");
  };

//Update Cart Item Quantity

  const updateCartItem = (itemId) => {
    let cartData = structuredClone(cartItems);
    if(cartData[itemId]) {
      cartData[itemId] += 1;
    }
    setCartItems(cartData);
    toast.success("Cart item quantity updated");
  };

//Remove Product from Cart

  const removeFromCart = (itemId) => {
    let cartData = structuredClone(cartItems);
    if(cartData[itemId]) {
      cartData[itemId] -= 1;
    }
    if(cartData[itemId] === 0) {
      delete cartData[itemId];
    }
    setCartItems(cartData);
    toast.success("Product removed from cart");
  };


  useEffect(() => {
    fetchProducts();
  }, []);

  const value = {
    navigate,
    user,
    setUser,
    setIsSeller,
    isSeller,
    showUserLogin,
    setShowUserLogin,
    products,
    currency,
    addToCart,
    updateCartItem,
    removeFromCart,
    cartItems,
    searchQuery,
    setSearchQuery,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};
