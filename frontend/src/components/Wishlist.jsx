import React, { useState } from 'react'
import { RxCross1 } from 'react-icons/rx'
import { BsCartPlus } from 'react-icons/bs'
import { IoHeartOutline } from 'react-icons/io5'
import styles from '../styles/styles'
import { Link } from 'react-router-dom'

const Wishlist = ({ setOpenWishlist }) => {
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
            onClick={() => setOpenWishlist(false)}
          />
        </div>

        {/* Header */}
        <div className={`${styles.noramlFlex} px-5 py-4 border-b`}>
          <IoHeartOutline size={25} />
          <h5 className="pl-2 text-[20px] font-[600] text-gray-800">
            3 Items
          </h5>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto">
          {cartData &&
            cartData.map((i, index) => <CartSingle key={index} data={i} />)}
        </div>

        
      </div>
    </div>
  )
}

const CartSingle = ({ data }) => {
  const [value, setValue] = useState(1)
  const totalPrice = data.price * value

  return (
  <div className="flex items-center gap-4 p-4 border-b bg-white rounded-xl shadow-sm hover:shadow-md transition relative">
    {/* Remove button */}
    <button className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition">
      <RxCross1 size={18} />
    </button>

    {/* Product Image */}
    <img
      className="w-[90px] h-[90px] object-cover rounded-lg border"
      src="https://m.media-amazon.com/images/I/31Vle5fVdaL.jpg"
      alt={data.name}
    />

    {/* Product Info */}
    <div className="flex flex-col gap-2 flex-1">
      <h1 className="font-semibold text-[15px] text-gray-800 leading-snug line-clamp-2">
        {data.name}
      </h1>
      <h4 className="font-bold text-[16px] text-red-500">
        US ${totalPrice}
      </h4>
    </div>
    <BsCartPlus className='cursor-pointer'/>
  </div>
)

}

export default Wishlist
