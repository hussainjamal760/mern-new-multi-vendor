import React, { useState } from "react";
import { Link } from "react-router-dom";
import { navItems } from "../static/data";
import styles from "../styles/styles";
import { BiMenuAltLeft } from "react-icons/bi";
import { IoIosClose } from "react-icons/io";

const Navbar = ({ active }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Desktop Navbar */}
      <div className={`items-center hidden md:flex ${styles.noramlFlex}`}>
        {navItems &&
          navItems.map((i, index) => (
            <Link
              key={index}
              to={i.url}
              className={`${
                active === index + 1
                  ? "text-[#17dd1f]"
                  : "text-white md:text-[#fff]"
              } font-[500] px-6 cursor-pointer`}
            >
              {i.title}
            </Link>
          ))}
      </div>

      {/* Mobile Hamburger */}
      <div className="md:hidden flex items-center">
        <BiMenuAltLeft
          size={30}
          className="cursor-pointer text-white"
          onClick={() => setOpen(true)}
        />
      </div>

      {/* Mobile Drawer Menu */}
      {open && (
        <div className="fixed inset-0 z-20 bg-black bg-opacity-50 md:hidden">
          <div className="absolute left-0 top-0 h-full w-[70%] bg-white shadow-md p-6">
            {/* Close button */}
            <div className="flex justify-end">
              <IoIosClose
                size={35}
                className="cursor-pointer"
                onClick={() => setOpen(false)}
              />
            </div>

            {/* Nav Links */}
            <div className="flex flex-col mt-6 space-y-6">
              {navItems &&
                navItems.map((i, index) => (
                  <Link
                    key={index}
                    to={i.url}
                    className={`${
                      active === index + 1 ? "text-[#17dd1f]" : "text-gray-800"
                    } font-[500] text-lg`}
                    onClick={() => setOpen(false)} // close menu on click
                  >
                    {i.title}
                  </Link>
                ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
