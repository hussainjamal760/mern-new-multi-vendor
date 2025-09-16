import React, { useState } from 'react'
import { backend_url } from '../server'
import { useSelector } from 'react-redux'
import { AiOutlineArrowRight, AiOutlineCamera, AiOutlineDelete , AiOutlinePlus} from "react-icons/ai"
import { MdOutlineTrackChanges } from "react-icons/md"
import {Link } from "react-router-dom"
import styles from '../styles/styles'

const ProfileContent = ({ active, setActive }) => {
  const { user } = useSelector((state) => state.user)


  const [fullname, setFullname] = useState(user?.name || "Loading...")
  const [email, setEmail] = useState(user?.email || "Loading...")
  const [zipcode, setZipcode] = useState("")
  const [phone, setPhone] = useState("")
  const [address1, setAddress1] = useState("")
  const [address2, setAddress2] = useState("")


  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <>
      <div className="w-full">
        {/* Profile Section */}
        {active === 1 && (
          <div className="flex flex-col items-center w-full gap-6">
            <div className="relative">
              <img
                src={
                  user?.avatar?.url
                    ? `${backend_url}${user.avatar.url}`
                    : "avatar"
                }
                alt="profile"
                className="w-[150px] h-[150px] rounded-full object-cover border-[3px] border-gray-500"
              />

              <div className="w-[35px] h-[35px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px]">
                <AiOutlineCamera size={20} />
              </div>
            </div>

            {/* Update Form */}
            <form 
              className="w-full max-w-2xl flex flex-col gap-4"
              onSubmit={handleSubmit}
            >
              {/* Row 1: Fullname + Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input 
                  type="text" 
                  placeholder="Full Name"
                  value={fullname}
                  onChange={(e)=>setFullname(e.target.value)}
                  className="border border-gray-400 p-2 rounded w-full"
                />
                <input 
                  type="email" 
                  placeholder="Email"
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                  className="border border-gray-400 p-2 rounded w-full"
                />
              </div>

              {/* Row 2: Phone + Zipcode */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input 
                  type="text" 
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(e)=>setPhone(e.target.value)}
                  className="border border-gray-400 p-2 rounded w-full"
                />
                <input 
                  type="text" 
                  placeholder="Zip Code"
                  value={zipcode}
                  onChange={(e)=>setZipcode(e.target.value)}
                  className="border border-gray-400 p-2 rounded w-full"
                />
              </div>

              {/* Address */}
              <input 
                type="text" 
                placeholder="Address Line 1"
                value={address1}
                onChange={(e)=>setAddress1(e.target.value)}
                className="border border-gray-400 p-2 rounded w-full"
              />
              <input 
                type="text" 
                placeholder="Address Line 2"
                value={address2}
                onChange={(e)=>setAddress2(e.target.value)}
                className="border border-gray-400 p-2 rounded w-full"
              />

              {/* Submit Button */}
              <button 
                type="submit"
                className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition w-full"
              >
                Update
              </button>
            </form>
          </div>
        )}

        {active === 2 && (
          <div>
            <AllOrders />
          </div>
        )}

        {active === 3 && (
          <div>
            <AllRefunds />
          </div>
        )}

        
        {active === 5 && (
          <div>
            <TrackOrders />
          </div>
        )}

        {active === 6 && (
          <div>
            <PaymentMethod />
          </div>
        )}

         {active === 7 && (
          <div>
            <Address />
          </div>
        )}
      </div>
    </>
  )
}

// Orders Component without MUI
const AllOrders = () => {
  const orders = [
    {
      _id:"1234567890",
      orderItems:[{ name:"Iphone 14 pro max" }],
      totalPrice:120,
      orderStatus:"Processing"
    }
  ]

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">My Orders</h2>
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Order ID</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Items Qty</th>
              <th className="p-2 border">Total</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((item) => (
              <tr key={item._id} className="hover:bg-gray-50">
                <td className="p-2 border">{item._id}</td>
                <td className={`p-2 border ${item.orderStatus === "Delivered" ? "text-green-600" : "text-red-600"}`}>
                  {item.orderStatus}
                </td>
                <td className="p-2 border">{item.orderItems.length}</td>
                <td className="p-2 border">US$ {item.totalPrice}</td>
                <td className="p-2 border text-center">
                  <Link to={`/order/${item._id}`}>
                    <button className="flex items-center gap-1 text-blue-500 hover:text-blue-700">
                      <AiOutlineArrowRight size={18} /> View
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

const AllRefunds = () => {
  const orders = [
    {
      _id:"1234567890",
      orderItems:[{ name:"Iphone 14 pro max" }],
      totalPrice:120,
      orderStatus:"Processing"
    }
  ]

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">All Refunds</h2>
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Order ID</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Items Qty</th>
              <th className="p-2 border">Total</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((item) => (
              <tr key={item._id} className="hover:bg-gray-50">
                <td className="p-2 border">{item._id}</td>
                <td className={`p-2 border ${item.orderStatus === "Delivered" ? "text-green-600" : "text-red-600"}`}>
                  {item.orderStatus}
                </td>
                <td className="p-2 border">{item.orderItems.length}</td>
                <td className="p-2 border">US$ {item.totalPrice}</td>
                <td className="p-2 border text-center">
                  <Link to={`/order/${item._id}`}>
                    <button className="flex items-center gap-1 text-blue-500 hover:text-blue-700">
                      <AiOutlineArrowRight size={18} /> View
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

const TrackOrders = () => {
  const orders = [
    {
      _id:"1234567890",
      orderItems:[{ name:"Iphone 14 pro max" }],
      totalPrice:120,
      orderStatus:"Processing"
    }
  ]

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Orders Tracking</h2>
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Order ID</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Items Qty</th>
              <th className="p-2 border">Total</th>
              <th className="p-2 border">Tracking</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((item) => (
              <tr key={item._id} className="hover:bg-gray-50">
                <td className="p-2 border">{item._id}</td>
                <td className={`p-2 border ${item.orderStatus === "Delivered" ? "text-green-600" : "text-red-600"}`}>
                  {item.orderStatus}
                </td>
                <td className="p-2 border">{item.orderItems.length}</td>
                <td className="p-2 border">US$ {item.totalPrice}</td>
                <td className="p-2 border text-center">
                  <Link to={`/order/${item._id}`}>
                    <button className="flex items-center gap-1 text-blue-500 hover:text-blue-700">
                      <MdOutlineTrackChanges size={18} /> Track
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

const PaymentMethod = () => {
  return (
    <div className="w-full px-5 py-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-800">
          Payment Methods
        </h1>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition">
          <AiOutlinePlus size={18} />
          Add New
        </button>
      </div>

      {/* Saved Card */}
      <div className="mt-6 w-full bg-white rounded-xl shadow-md p-5 flex flex-col gap-3">
        {/* Top Row: Card logo + Name */}
        <div className="flex items-center gap-4">
          <img
            src="visa.png"
            alt="visa"
            className="w-12 h-8 object-contain"
          />
          <h5 className="text-lg font-medium text-gray-700">
            Hussain Jamal
          </h5>
        </div>

        {/* Middle Row: Card number + expiry */}
        <div className="flex items-center justify-between text-gray-600 text-sm pl-1">
          <span className="tracking-widest">4242 **** **** ****</span>
          <span className="font-medium">08/2025</span>
        </div>

        {/* Bottom Row: Delete button */}
        <div className="flex justify-end">
          <button className="text-red-500 hover:text-red-600 transition">
            <AiOutlineDelete size={22} />
          </button>
        </div>
      </div>
    </div>
  );
};

const Address = () => {
  return (
    <div className="w-full px-5 py-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-800">
          My Addresses
        </h1>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition">
          <AiOutlinePlus size={18} />
          Add New
        </button>
      </div>

      {/* Saved Card */}
      <div className="mt-6 w-full bg-white rounded-xl shadow-md p-5 flex flex-col gap-3">
        {/* Top Row: Card logo + Name */}
        <div className="flex items-center gap-4">
          
          <h5 className="text-lg font-medium text-gray-700">
            Default
          </h5>
        </div>

        {/* Middle Row: Card number + expiry */}
        <div className="flex items-center justify-between text-gray-600 text-sm pl-1">
          <span className="tracking-widest">House 25 ,Palm Villas , USA</span>
          <span className="font-medium">0300-8889703</span>
        </div>

        {/* Bottom Row: Delete button */}
        <div className="flex justify-end">
          <button className="text-red-500 hover:text-red-600 transition">
            <AiOutlineDelete size={22} />
          </button>
        </div>
      </div>
    </div>
  );
};
export default ProfileContent


