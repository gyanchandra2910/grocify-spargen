import React from "react";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div className="min-h-screen bg-primary-50">
      <Navbar />
      <div className="p-4 text-center">
        <h1 className="text-3xl font-bold text-primary-700 mt-8">
          Welcome to Grocify
        </h1>
        <p className="mt-4 text-gray-600">
          Your one-stop solution for online grocery shopping
        </p>
      </div>
    </div>
  );
};

export default App;
