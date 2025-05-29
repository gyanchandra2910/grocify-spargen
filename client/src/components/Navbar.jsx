import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

const Navbar = () => {
  const [open, setOpen] = React.useState(false);
  const [profileOpen, setProfileOpen] = React.useState(false);
  const { user, setUser, setShowUserLogin, navigate, searchQuery, setSearchQuery, getCartCount, getCartAmount} =
    useAppContext();
  // For debugging
  React.useEffect(() => {
    console.log("Current user state:", user);
  }, [user]);

  // Handle outside click to close profile dropdown
  React.useEffect(() => {
    function handleClickOutside(event) {
      if (profileOpen && !event.target.closest(".profile-menu-container")) {
        setProfileOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileOpen]);

  const logout = async () => {
    setUser(null);
    navigate("/");
  };

useEffect(() => {
 if(searchQuery.length > 0) {
  navigate(`/products?search=${searchQuery}`);
 } else {
  navigate("/products");
 }
  }, [searchQuery]);
  
  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-green-100 relative transition-all">
      <NavLink to="/">
        <img className="h-9" src={assets.logo} alt="logo" />
      </NavLink>

      {/* Desktop Menu */}
      <div className="hidden sm:flex items-center gap-8">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/products">All Products</NavLink>
        <NavLink to="/contact">Contact</NavLink>
        <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
          <input onChange={(e) => setSearchQuery(e.target.value)}
            className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
            type="text"
            placeholder="Search products"
          />
          <img src={assets.search_icon} alt="search" className="w-4 h-4" />
        </div>
        <div
          onClick={() => navigate("/cart")}
          className="relative cursor-pointer"
        >
          <img
            src={assets.nav_cart_icon}
            alt="cart"
            className="w-6 opacity-80"
          />{" "}
          <button className="absolute -top-2 -right-3 text-xs text-white bg-green-600 w-[18px] h-[18px] rounded-full">
            {getCartCount()}
          </button>
        </div>{" "}
        {!user ? (
          <button
            onClick={() => setShowUserLogin(true)}
            className="cursor-pointer px-8 py-2 bg-green-600 hover:bg-green-700 transition text-white rounded-full"
          >
            Login
          </button>
        ) : (
          <div className="relative profile-menu-container">
            <div
              onClick={() => setProfileOpen(!profileOpen)}
              className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white cursor-pointer border-2 border-white shadow-md hover:bg-green-700 transition"
            >
              {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
            </div>
            {profileOpen && (
              <ul className="absolute top-12 right-0 bg-white shadow-lg rounded-md p-2 border border-gray-200 z-50 w-36">
                <li
                  onClick={() => {
                    navigate("/my-orders");
                    setProfileOpen(false);
                  }}
                  className="cursor-pointer hover:bg-green-100 transition px-3 py-2 rounded-md text-sm"
                >
                  My Orders
                </li>
                <li
                  onClick={() => {
                    logout();
                    setProfileOpen(false);
                  }}
                  className="cursor-pointer hover:bg-green-100 transition px-3 py-2 rounded-md text-sm"
                >
                  Logout
                </li>
              </ul>
            )}
          </div>
        )}
      </div>
      <div onClick={() => navigate("/cart")} className="relative cursor-pointer">
        <img src={assets.nav_cart_icon} alt="cart" className="w-6 opacity-80" />
        <button className="absolute -top-2 -right-3 text-xs text-white bg-green-600 w-[18px] h-[18px] rounded-full">
          {getCartCount()}
        </button>
      </div>
      <button
        onClick={() => setOpen(!open)}
        aria-label="Menu"
        className="sm:hidden"
      >
        {/* Menu Icon SVG */}
        <img src={assets.menu_icon} alt="menu" />
      </button>


      
      {open && (
        <div
          className={`${
            open ? "flex" : "hidden"
          } absolute top-[60px] left-0 w-full bg-green-100 shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden z-50`}
        >
          <NavLink to="/" onClick={() => setOpen(false)}>
            Home{" "}
          </NavLink>
          <NavLink to="/products" onClick={() => setOpen(false)}>
            All Products{" "}
          </NavLink>
          {user && (
            <NavLink to="/my-orders" onClick={() => setOpen(false)}>
              My Orders{" "}
            </NavLink>
          )}
          <NavLink to="/contact" onClick={() => setOpen(false)}>
            Contact{" "}
          </NavLink>
          {!user ? (
            <button
              onClick={() => {
                setOpen(false);
                setShowUserLogin(true);
              }}
              className="cursor-pointer px-6 py-2 mt-2 bg-green-600 hover:bg-green-700 transition text-white rounded-full text-sm"
            >
              Login
            </button>
          ) : (
            <button
              onClick={logout}
              className="cursor-pointer px-6 py-2 mt-2 bg-green-600 hover:bg-green-700 transition text-white rounded-full text-sm"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
