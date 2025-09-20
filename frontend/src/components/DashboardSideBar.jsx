import React from "react";
import {
  AiOutlineFolderAdd,
  AiOutlineGift
} from "react-icons/ai";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { MdOutlineLocalOffer } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { VscNewFile } from "react-icons/vsc";
import { CiMoneyBill, CiSettings } from "react-icons/ci";
import { Link } from "react-router-dom";
import { BiMessageSquareDetail } from "react-icons/bi";
import { HiOutlineReceiptRefund } from "react-icons/hi";

const menuItems = [
  { id: 1, name: "Dashboard", icon: <RxDashboard size={22} />, link: "/dashboard" },
  { id: 2, name: "All Orders", icon: <FiShoppingBag size={22} />, link: "/dashboard-orders" },
  { id: 3, name: "All Products", icon: <FiPackage size={22} />, link: "/dashboard-products" },
  { id: 4, name: "Create Product", icon: <AiOutlineFolderAdd size={22} />, link: "/dashboard-create-product" },
  { id: 5, name: "All Events", icon: <MdOutlineLocalOffer size={22} />, link: "/dashboard-events" },
  { id: 6, name: "Create Event", icon: <VscNewFile size={22} />, link: "/dashboard-create-event" },
  { id: 7, name: "Withdraw Money", icon: <CiMoneyBill size={22} />, link: "/dashboard-withdraw-money" },
  { id: 8, name: "Shop Inbox", icon: <BiMessageSquareDetail size={22} />, link: "/dashboard-messages" },
  { id: 9, name: "Discount Codes", icon: <AiOutlineGift size={22} />, link: "/dashboard-coupouns" },
  { id: 10, name: "Refunds", icon: <HiOutlineReceiptRefund size={22} />, link: "/dashboard-refunds" },
  { id: 11, name: "Settings", icon: <CiSettings size={22} />, link: "/settings" },
];

const DashboardSideBar = ({ active }) => {
  return (
      <div className="flex flex-col py-4">
        {menuItems.map((item) => (
          <Link
            key={item.id}
            to={item.link}
            className={`flex items-center gap-3 px-6 py-3 my-1 rounded-xl transition-all duration-200 
              ${active === item.id
                ? "bg-crimson text-black shadow-md"
                : "text-gray-600 hover:bg-gray-100 hover:text-crimson"
              }`}
          >
            <span className={`${active === item.id ? "text-red-600" : "text-gray-600"}`}>
              {item.icon}
            </span>
            <h5 className="hidden md:block font-medium text-[16px]">{item.name}</h5>
          </Link>
        ))}
      </div>
  );
};

export default DashboardSideBar;
