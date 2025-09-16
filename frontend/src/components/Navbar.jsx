import React, { useState } from "react";
import { Link } from "react-router-dom";
import { navItems } from "../static/data";
import styles from "../styles/styles";
import { BiMenuAltLeft } from "react-icons/bi";
import { IoIosClose } from "react-icons/io";
import { AiOutlineSearch, AiOutlineHeart } from "react-icons/ai";
import { productData } from "../static/data";

const Navbar = ({
  active,
  searchTerm,
  setSearchTerm,
  handleSearchChange,
  isSeller,
  setOpenWishlist,
}) => {
  const [open, setOpen] = useState(false);
  const [mobileSearchTerm, setMobileSearchTerm] = useState("");
  const [mobileSearchData, setMobileSearchData] = useState(null);

  // Mobile search handler
  const handleMobileSearchChange = (e) => {
    const term = e.target.value;
    setMobileSearchTerm(term);

    if (term.trim() === "") {
      setMobileSearchData(null);
      return;
    }

    const filteredProducts =
      productData &&
      productData.filter((product) =>
        product.name.toLowerCase().includes(term.toLowerCase())
      );
    setMobileSearchData(filteredProducts);
  };

  const clearMobileSearch = () => {
    setMobileSearchTerm("");
    setMobileSearchData(null);
  };

  const handleWishlistClick = () => {
    setOpen(false);
    if (setOpenWishlist) {
      setOpenWishlist(true);
    }
  };

  return (
    <>
      {/* Desktop Navbar (hidden below lg) */}
      <div className={`items-center hidden lg:flex ${styles.noramlFlex}`}>
        {navItems &&
          navItems.map((i, index) => (
            <Link
              key={index}
              to={i.url}
              className={`${
                active === index + 1
                  ? "text-[#17dd1f]"
                  : "text-white"
              } font-[500] px-6 cursor-pointer hover:text-[#17dd1f] transition-colors duration-200`}
            >
              {i.title}
            </Link>
          ))}
      </div>

      {/* Mobile Hamburger (visible below lg) */}
      <div className="lg:hidden flex items-center">
        <BiMenuAltLeft
          size={30}
          className="cursor-pointer text-white hover:text-gray-300 transition"
          onClick={() => setOpen(true)}
        />
      </div>

      {/* Mobile Drawer Menu */}
      {open && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-[998] bg-black bg-opacity-50 lg:hidden"
            onClick={() => setOpen(false)}
          />
          
          {/* Drawer */}
          <div className="fixed left-0 top-0 h-full w-[85%] max-w-[320px] bg-white shadow-xl z-[999] lg:hidden overflow-y-auto">
            <div className="p-6">
              {/* Header with Close button */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-gray-800">Menu</h2>
                <IoIosClose
                  size={32}
                  className="cursor-pointer text-gray-600 hover:text-gray-800 transition"
                  onClick={() => setOpen(false)}
                />
              </div>

              {/* Search box */}
              <div className="relative mb-6">
                <input
                  type="text"
                  placeholder="Search Product..."
                  value={mobileSearchTerm}
                  onChange={handleMobileSearchChange}
                  className="h-[45px] w-full px-4 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#17dd1f] focus:border-transparent"
                />
                <AiOutlineSearch
                  size={20}
                  className="absolute right-4 top-3 cursor-pointer text-gray-500"
                />

                {/* Mobile Search Results */}
                {mobileSearchData && mobileSearchData.length > 0 && (
                  <div className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-[1000] mt-1 max-h-[300px] overflow-y-auto">
                    <div className="p-3 border-b flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">Search Results</span>
                      <button 
                        onClick={clearMobileSearch}
                        className="text-gray-500 hover:text-red-500 text-lg"
                      >
                        ×
                      </button>
                    </div>
                    {mobileSearchData.map((item) => (
                      <Link 
                        key={item.id} 
                        to={`/product/${item.id}`}
                        onClick={() => {
                          setOpen(false);
                          clearMobileSearch();
                        }}
                        className="flex items-center p-3 hover:bg-gray-50 transition"
                      >
                        <img
                          src={item.image_Url[0]?.url}
                          alt={item.name}
                          className="w-[40px] h-[40px] mr-3 rounded object-cover"
                        />
                        <span className="text-sm text-gray-800 line-clamp-2">{item.name}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Wishlist Button */}
              <button
                className="flex items-center space-x-3 w-full p-4 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200 mb-4"
                onClick={handleWishlistClick}
              >
                <AiOutlineHeart size={24} />
                <span className="font-medium">Wishlist</span>
              </button>

              {/* Become Seller Button */}
              <Link
                to={`${isSeller ? "/dashboard" : "/shop-create"}`}
                onClick={() => setOpen(false)}
                className="flex items-center justify-center w-full bg-black text-white px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors duration-200 mb-6"
              >
                <span className="font-medium">
                  {isSeller ? "Go Dashboard" : "Become Seller"}
                </span>
              </Link>

              {/* Divider */}
              <hr className="my-4 border-gray-200" />

              {/* Navigation Links */}
              <div className="space-y-1">
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">
                  Navigation
                </h3>
                {navItems &&
                  navItems.map((item, index) => (
                    <Link
                      key={index}
                      to={item.url}
                      className={`${
                        active === index + 1 
                          ? "text-[#17dd1f] bg-green-50 border-r-4 border-[#17dd1f]" 
                          : "text-gray-800 hover:bg-gray-100"
                      } font-medium text-base px-4 py-3 rounded-lg transition-colors duration-200 flex items-center`}
                      onClick={() => setOpen(false)}
                    >
                      {item.title}
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;