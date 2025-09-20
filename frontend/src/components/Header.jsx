import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/styles";
import { categoriesData, productData } from "../static/data";
import {
  AiOutlineHeart,
  AiOutlineSearch,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { useSelector } from "react-redux";
import { IoIosArrowDown } from "react-icons/io";
import { BiMenuAltLeft } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import DropDown from "./DropDown";
import Navbar from "./Navbar";
import { backend_url } from "../server";
import Cart from "./Cart";
import Wishlist from "./Wishlist";

const Header = ({ activeHeading }) => {
  const [isSeller] = useState(false);
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term.trim() === "") {
      setSearchData(null);
      return;
    }

    const filteredProducts =
      productData &&
      productData.filter((product) =>
        product.name.toLowerCase().includes(term.toLowerCase())
      );
    setSearchData(filteredProducts);
  };

  
  const clearSearch = () => {
    setSearchTerm("");
    setSearchData(null);
  };

  window.addEventListener("scroll", () => {
    if (window.scrollY > 70) {
      setActive(true);
    } else {
      setActive(false);
    }
  });

  return (
    <>
      {/* 🔹 Top Header - Desktop */}
      <div className="w-full bg-[#f8f8f8] border-b hidden lg:block">
        <div className={`${styles.section} h-[70px] flex items-center justify-between`}>
          
          {/* Logo */}
          <div>
            <Link to="/">
              <img
                src="https://shopo.quomodothemes.website/assets/images/logo.svg"
                alt="logo"
                className="w-[120px] sm:w-[150px]"
              />
            </Link>
          </div>

          {/* Search box - Desktop */}
          <div className="w-[50%] relative">
            <input
              type="text"
              placeholder="Search Product..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="h-[40px] w-full px-3 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <AiOutlineSearch
              size={22}
              className="absolute right-3 top-2.5 cursor-pointer text-gray-600"
            />

            {searchData && searchData.length !== 0 && (
              <div className="absolute min-h-[30vh] bg-white shadow-lg rounded-md z-[999] p-4 w-full border">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-medium">Search Results</h3>
                  <button 
                    onClick={clearSearch}
                    className="text-gray-500 hover:text-red-500"
                  >
                    ×
                  </button>
                </div>
                <div className="max-h-[300px] overflow-y-auto">
                  {searchData.map((i) => (
                    <Link key={i.id} to={`/product/${i.id}`} onClick={clearSearch}>
                      <div className="w-full flex items-center py-2 hover:bg-gray-100 rounded-md px-2">
                        <img
                          src={i.image_Url[0]?.url}
                          alt={i.name}
                          className="w-[40px] h-[40px] mr-[10px] rounded object-cover"
                        />
                        <h1 className="text-sm">{i.name}</h1>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Seller Button */}
          <div>
            <Link
              to={`${isSeller ? "/dashboard" : "/shop-create"}`}
              className="bg-black text-white px-3 py-2 rounded-md text-sm hover:bg-gray-800 transition"
            >
              {isSeller ? "Dashboard" : "Become Seller"}
            </Link>
          </div>
        </div>
      </div>

      {/* 🔹 Mobile Header - Mobile Only */}
      <div className="w-full bg-[#f8f8f8] border-b lg:hidden">
        <div className={`${styles.section} h-[60px] flex items-center justify-between px-4`}>
          {/* Logo */}
          <Link to="/">
            <img
              src="https://shopo.quomodothemes.website/assets/images/logo.svg"
              alt="logo"
              className="w-[100px] sm:w-[120px]"
            />
          </Link>

          {/* Right Icons - Mobile */}
          <div className="flex items-center space-x-3">
            <AiOutlineHeart 
              onClick={() => setOpenWishlist(true)} 
              size={24} 
              className="cursor-pointer text-gray-700" 
            />
            <AiOutlineShoppingCart 
              size={24} 
              className="cursor-pointer text-gray-700"
              onClick={() => setOpenCart(true)}
            />
            
            <div className="relative cursor-pointer">
              {isAuthenticated && user ? (
                <Link to="/profile">
                  <img
                    src={user.avatar?.url ? `${backend_url}${user.avatar.url}` : "/default-avatar.png"}
                    alt="User Avatar"
                    className="w-[30px] h-[30px] rounded-full border-[2px] border-[#0eae88] object-cover"
                    onError={(e) => {
                      e.target.src = "/default-avatar.png";
                    }}
                  />
                </Link>
              ) : (
                <Link to="/login">
                  <CgProfile size={24} className="cursor-pointer text-gray-700" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 🔹 Navigation bar */}
      <div
        className={`${
          active ? "shadow-sm fixed top-0 left-0 z-10" : ""
        } transition w-full bg-[#3321c8] h-[60px]`}
      >
        <div className={`${styles.section} flex items-center justify-between h-full px-4`}>
          
          {/* Categories Dropdown - Desktop */}
          <div onClick={() => setDropDown(!dropDown)} className="relative h-full hidden lg:block">
            <BiMenuAltLeft size={25} className="absolute top-4 left-2 z-10" />
            <button className="h-full w-[250px] flex justify-between items-center pl-10 bg-white text-[16px] font-[500] select-none rounded-t-md">
              All Categories
            </button>
            <IoIosArrowDown
              size={18}
              className="absolute right-2 top-5 cursor-pointer"
              onClick={() => setDropDown(!dropDown)}
            />
            {dropDown && (
              <DropDown
                categoriesData={categoriesData}
                setDropDown={setDropDown}
              />
            )}
          </div>

          {/* Navbar */}
          <div className="flex w-full lg:w-auto justify-center lg:justify-start">
            <Navbar 
              active={activeHeading} 
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              handleSearchChange={handleSearchChange}
              isSeller={isSeller}
              setOpenWishlist={setOpenWishlist}
            />
          </div>

          {/* 🔹 Right Icons - Desktop */}
          <div className="items-center space-x-6 hidden lg:flex">
            <AiOutlineHeart 
              onClick={() => setOpenWishlist(true)} 
              size={26} 
              color="white" 
              className="cursor-pointer hover:text-gray-300 transition" 
            />
            <AiOutlineShoppingCart  
              size={26} 
              color="white" 
              onClick={() => setOpenCart(true)}
              className="cursor-pointer hover:text-gray-300 transition" 
            />
            
            <div className="relative cursor-pointer">
              {isAuthenticated && user ? (
                <Link to="/profile">
                  <img
                    src={user.avatar?.url ? `${backend_url}${user.avatar.url}` : "/default-avatar.png"}
                    alt="User Avatar"
                    className="w-[35px] h-[35px] rounded-full border-[2px] border-[#0eae88] object-cover"
                    onError={(e) => {
                      e.target.src = "/default-avatar.png";
                    }}
                  />
                </Link>
              ) : (
                <Link to="/login">
                  <CgProfile size={26} color="white" className="cursor-pointer" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Cart Modal */}
      {openCart && <Cart setOpenCart={setOpenCart} />}

      {/* Wishlist Modal */}
      {openWishlist && <Wishlist setOpenWishlist={setOpenWishlist} />}
    </>
  );
};

export default Header;