import React from "react";
import Navbar from "./components/Navbar";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./components/Login";
import { Toaster } from "react-hot-toast";
import { useAppContext } from "./context/AppContext";
import AllProducts from "./pages/AllProducts";
import Footer from "./components/Footer";
import Cart from "./pages/Cart";
import ProductCategory from "./pages/ProductCatrgory";
import ProductDetails from "./pages/ProductDetails";

const App = () => {
  const isSellerPath = useLocation().pathname.includes("seller");
  const { showUserLogin } = useAppContext();
  return (
    <div>
      {isSellerPath ? null : <Navbar />}
      {showUserLogin && <Login />}

      <Toaster position="top-center" />
      <div className={`${isSellerPath ? "bg-green-100" : "bg-gray-50"}`}>
        <div className="max-w-7xl mx-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<AllProducts />} />
            <Route path="/products/:category" element={<ProductCategory />} />
            <Route path="/product/:category/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </div>
      </div>
      {!isSellerPath && <Footer />}
    </div>
  );
};

export default App;
