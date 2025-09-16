import React, { useState } from "react";
import { Link } from "react-router-dom";
import { navItems } from "../static/data";
import styles from "../styles/styles";
import { BiMenuAltLeft } from "react-icons/bi";
import { IoIosClose } from "react-icons/io";
import { AiOutlineSearch, AiOutlineHeart } from "react-icons/ai";

const Navbar = ({
  active,
  searchTerm,
  setSearchTerm,
  handleSearchChange,
  isSeller,
  setOpenWishlist,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Desktop Navbar (hidden below 976px) */}
      <div className={`items-center hidden min-[976px]:flex ${styles.noramlFlex}`}>
        {navItems &&
          navItems.map((i, index) => (
            <Link
              key={index}
              to={i.url}
              className={`${
                active === index + 1
                  ? "text-[#17dd1f]"
                  : "text-white min-[976px]:text-[#fff]"
              } font-[500] px-6 cursor-pointer`}
            >
              {i.title}
            </Link>
          ))}
      </div>

      {/* Mobile Hamburger (visible below 976px) */}
      <div className="min-[976px]:hidden flex items-center">
        <BiMenuAltLeft
          size={30}
          className="cursor-pointer text-white"
          onClick={() => setOpen(true)}
        />
      </div>

      {/* Mobile Drawer Menu */}
      {open && (
        <div className="fixed inset-0 z-20 bg-black bg-opacity-50 min-[976px]:hidden">
          <div className="absolute left-0 top-0 h-full w-[75%] bg-white shadow-md p-6 overflow-y-auto">
            {/* Close button */}
            <div className="flex justify-end mb-4">
              <IoIosClose
                size={35}
                className="cursor-pointer text-gray-600 hover:text-gray-800"
                onClick={() => setOpen(false)}
              />
            </div>

            {/* Search box (only in hamburger) */}
            <div className="relative mb-6">
              <input
                type="text"
                placeholder="Search Product..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="h-[40px] w-full px-3 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#17dd1f] focus:border-transparent"
              />
              <AiOutlineSearch
                size={22}
                className="absolute right-3 top-2.5 cursor-pointer text-gray-600"
                onClick={() => {
                  // Optional: trigger search on icon click
                  console.log("Search triggered:", searchTerm);
                }}
              />
            </div>

            {/* Wishlist Button */}
            <button
              className="flex items-center space-x-3 w-full p-3 text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200 mb-3"
              onClick={() => {
                setOpen(false);
                setOpenWishlist(true);
              }}
            >
              <AiOutlineHeart size={24} />
              <span className="font-medium">Wishlist</span>
            </button>

            {/* Become Seller Button */}
            <Link
              to={`${isSeller ? "/dashboard" : "/shop-create"}`}
              onClick={() => setOpen(false)}
              className="flex items-center justify-center w-full bg-black text-white px-4 py-3 rounded-md hover:bg-gray-800 transition-colors duration-200 mb-6"
            >
              {isSeller ? "Go Dashboard" : "Become Seller"}
            </Link>

            {/* Divider */}
            <hr className="my-4 border-gray-200" />

            {/* Nav Links */}
            <div className="flex flex-col space-y-2">
              {navItems &&
                navItems.map((i, index) => (
                  <Link
                    key={index}
                    to={i.url}
                    className={`${
                      active === index + 1 
                        ? "text-[#17dd1f] bg-green-50" 
                        : "text-gray-800 hover:bg-gray-100"
                    } font-[500] text-lg px-3 py-3 rounded-md transition-colors duration-200`}
                    onClick={() => setOpen(false)}
                  >
                    {i.title}
                  </Link>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* Backdrop overlay for mobile menu */}
      {open && (
        <div
          className="fixed inset-0 z-10 bg-black bg-opacity-50 min-[976px]:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;