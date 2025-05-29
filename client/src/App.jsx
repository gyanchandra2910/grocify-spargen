import React from "react";
import Navbar from "./components/Navbar";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import LoginModal from "./components/LoginModal";

const App = () => {
  const isSellerPath = useLocation().pathname.includes("seller");
  return (
    <div>
      {isSellerPath ? null : <Navbar />}
      <div className={`${isSellerPath ? "bg-green-100" : "bg-primary-50"}`}>
        <div className="max-w-7xl mx-auto">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </div>
      <LoginModal />
    </div>
  );
};

export default App;
