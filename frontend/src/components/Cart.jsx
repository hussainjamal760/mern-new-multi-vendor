import React, { useState } from 'react'
import { RxCross1 } from 'react-icons/rx'
import { HiOutlineMinus, HiPlus } from 'react-icons/hi'
import { IoBagHandleOutline } from 'react-icons/io5'
import styles from '../styles/styles'
import { Link } from 'react-router-dom'

const Cart = ({ setOpenCart }) => {
  const cartData = [
    {
      name: 'Iphone 14 Pro Max 256 GB SSD and 8GB RAM Silver',
      description: 'test',
      price: 999,
    },
    {
      name: 'Iphone 14 Pro Max 256 GB SSD and 8GB RAM Silver',
      description: 'test',
      price: 999,
    },
    {
      name: 'Iphone 14 Pro Max 256 GB SSD and 8GB RAM Silver',
      description: 'test',
      price: 999,
    },
  ]

  return (
    <div className="fixed top-0 left-0 w-full bg-[#0006] h-screen z-10 flex justify-end">
      <div className="min-h-full w-full sm:w-[400px] bg-white flex flex-col justify-between shadow-xl rounded-l-lg">
        {/* Close Button */}
        <div className="flex w-full justify-end p-4 border-b">
          <RxCross1
            size={25}
            className="cursor-pointer hover:text-red-500 transition"
            onClick={() => setOpenCart(false)}
          />
        </div>

        {/* Header */}
        <div className={`${styles.noramlFlex} px-5 py-4 border-b`}>
          <IoBagHandleOutline size={25} />
          <h5 className="pl-2 text-[20px] font-[600] text-gray-800">
            3 Items
          </h5>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto">
          {cartData &&
            cartData.map((i, index) => <CartSingle key={index} data={i} />)}
        </div>

        {/* Checkout Button */}
        <div className="px-5 py-4 border-t">
          <Link to="/checkout">
            <div className="h-[50px] flex items-center justify-center w-full bg-[#e44343] hover:bg-[#c83232] rounded-lg transition">
              <h1 className="text-white text-[18px] font-[600]">
                Checkout Now (USD $1080)
              </h1>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

const CartSingle = ({ data }) => {
  const [value, setValue] = useState(1)
  const totalPrice = data.price * value

  return (
    <div className="flex items-center gap-4 p-4 border-b hover:bg-gray-50 transition relative">
      {/* Counter */}
      <div className="flex flex-col items-center gap-2">
        <div
          className="bg-[#e44343] border border-[#e4434373] rounded-full w-[28px] h-[28px] flex items-center justify-center cursor-pointer hover:bg-[#d13131] transition"
          onClick={() => setValue(value + 1)}
        >
          <HiPlus size={18} color="#fff" />
        </div>
        <span className="font-semibold text-gray-800">{value}</span>
        <div
          className="bg-[#a7abb14f] rounded-full w-[28px] h-[28px] flex items-center justify-center cursor-pointer hover:bg-gray-300 transition"
          onClick={() => setValue(value === 1 ? 1 : value - 1)}
        >
          <HiOutlineMinus size={16} color="#7d879c" />
        </div>
      </div>

      {/* Product Image */}
      <img
        className="w-[90px] h-[90px] object-cover rounded-lg"
        src="https://m.media-amazon.com/images/I/31Vle5fVdaL.jpg"
        alt={data.name}
      />

      {/* Product Info */}
      <div className="flex flex-col gap-1 flex-1">
        <h1 className="font-[600] text-[15px] text-gray-800 leading-snug">
          {data.name}
        </h1>
        <h4 className="font-[400] text-[14px] text-gray-600">
          ${data.price} × {value}
        </h4>
        <h4 className="font-[700] text-[16px] text-red-500">
          US ${totalPrice}
        </h4>
      </div>

      {/* Remove Item */}
      <RxCross1
        className="cursor-pointer absolute top-0 right-3 text-gray-500 hover:text-red-500 transition"
        size={20}
      />
    </div>
  )
}

export default Cart
