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
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
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
  const [openCart , setOpenCart] = useState(false)
  const [openWishlist , setOpenWishlist] = useState(false)

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filteredProducts =
      productData &&
      productData.filter((product) =>
        product.name.toLowerCase().includes(term.toLowerCase())
      );
    setSearchData(filteredProducts);
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
      {/* 🔹 Top Header */}
      <div className="w-full bg-[#f8f8f8] border-b">
        <div className={`${styles.section} h-[70px] flex items-center justify-between`}>
          
          {/* Logo */}
          <div>
            <Link to="/">
              <img
                src="https://shopo.quomodothemes.website/assets/images/logo.svg"
                alt="logo"
                className="w-[150px]"
              />
            </Link>
          </div>

          {/* Search box */}
          <div className="w-[50%] relative">
            <input
              type="text"
              placeholder="Search Product..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="h-[40px] w-full px-3 border border-gray-300 rounded-md"
            />
            <AiOutlineSearch
              size={22}
              className="absolute right-3 top-2.5 cursor-pointer text-gray-600"
            />

            {searchData && searchData.length !== 0 && (
              <div className="absolute min-h-[30vh] bg-slate-50 shadow-md rounded-md z-[9] p-4 w-full">
                {searchData.map((i) => (
                  <Link key={i.id} to={`/product/${i.id}`}>
                    <div className="w-full flex items-center py-2 hover:bg-gray-100 rounded-md px-2">
                      <img
                        src={i.image_Url[0]?.url}
                        alt={i.name}
                        className="w-[40px] h-[40px] mr-[10px] rounded"
                      />
                      <h1 className="text-sm">{i.name}</h1>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Seller Button */}
          <div>
            <Link
              to={`${isSeller ? "/dashboard" : "/shop-create"}`}
              className="bg-black text-white px-4 py-2 rounded-md"
            >
              {isSeller ? "Go Dashboard" : "Become Seller"}
            </Link>
          </div>
        </div>
      </div>

      {/* 🔹 Navigation bar */}
      <div
        className={`${
          active ? "shadow-sm fixed top-0 left-0 z-10" : ""
        } transition w-full bg-[#3321c8] h-[60px]`}
      >
        <div className={`${styles.section} flex items-center justify-between h-full`}>
          
          {/* Categories Dropdown */}
          <div onClick={() => setDropDown(!dropDown)} className="relative h-full">
            <BiMenuAltLeft size={25} className="absolute top-4 left-2" />
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

          {/* NavItems */}
          <div className="flex">
            <Navbar active={activeHeading} />
          </div>

          {/* 🔹 Right Icons */}
          <div className="flex items-center space-x-6">
            <AiOutlineHeart onClick={()=>setOpenWishlist(true)} size={26} color="white" className="cursor-pointer" />
            <AiOutlineShoppingCart  size={26} color="white" 
            onClick={()=>setOpenCart(true)}
            className="cursor-pointer" />
            
            <div className={`${styles.noramlFlex}`}>
              <div className="relative cursor-pointer mr-[15px]">
                {isAuthenticated && user ? (
                  <div>
                    <Link to="/profile">
                      <img
                        src={user.avatar?.url ? `${backend_url}${user.avatar.url}` : "/default-avatar.png"}
                        alt="User Avatar"
                        className="w-[35px] h-[35px] rounded-full border-[2px] border-[#0eae88] object-cover"
                        onError={(e) => {
                          console.log("❌ Avatar image failed to load:", e.target.src);
                          e.target.src = "/default-avatar.png"; // Fallback image
                        }}
                        onLoad={() => {
                          console.log("✅ Avatar image loaded successfully");
                        }}
                      />
                    </Link>
                  </div>
                ) : (
                  <Link to="/login">
                    <CgProfile size={26} color="white" className="cursor-pointer" />
                  </Link>
                )}
              </div>
            </div>

                <div>
                    {
                      openCart ? (
                        <Cart setOpenCart={setOpenCart}/>
                       ) : null
                    }
                </div>

                 <div>
                    {
                      openWishlist ? (
                        <Wishlist setOpenWishlist={setOpenWishlist}/>
                       ) : null
                    }
                </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;