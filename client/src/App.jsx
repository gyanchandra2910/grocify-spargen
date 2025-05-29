import React from "react";
import Navbar from "./components/Navbar";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import LoginModal from "./components/LoginModal";
import { Toaster } from "react-hot-toast";
import { useAppContext } from "./context/AppContext";
import AllProducts from "./pages/AllProducts";
const App = () => {
  const isSellerPath = useLocation().pathname.includes("seller");
  const {showUserLogin} = useAppContext();
  return (
    <div>
      {isSellerPath ? null : <Navbar />}
      {showUserLogin && <Login />}

      <Toaster />
      <div className={`${isSellerPath ? "bg-green-100" : "bg-primary-50"}`}>
        <div className="max-w-7xl mx-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<AllProducts />} />
          </Routes>
        </div>
      </div>
      {!isSellerPath && <Footer />}
    </div>
  );
};

export default App;
