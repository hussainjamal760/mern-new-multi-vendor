import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import styles from '../styles/styles'

const ProductDetails = ({ data }) => {
  const [count, setCount] = useState(1)
  const [select, setSelect] = useState(0)
  const [liked, setLiked] = useState(false) // heart state
  const navigate = useNavigate()

  
const { name } = useParams();
console.log("🆔 Product ID from URL:", name);

  return (
    <div className="bg-white">
      {data ? (
        <div className={`w-[70%] 800px:w-[70%] py-10 mx-auto`}>
          <div className="w-full flex flex-col 800px:flex-row gap-12">
            
            {/* LEFT: Product Images */}
            <div className="w-full 800px:w-[45%] flex flex-col items-start">
              <div className="w-full border rounded-lg shadow-md p-3 bg-gray-50">
                <img
                  src={data.image_Url[select].url}
                  alt="Product"
                  className="w-full max-h-[450px] object-contain rounded-md"
                />
              </div>

              <div className="flex gap-3 mt-4 flex-wrap">
                {data.image_Url.map((img, index) => (
                  <div
                    key={index}
                    className={`cursor-pointer p-1 rounded-md ${
                      select === index ? "border-2 border-blue-500" : "border"
                    }`}
                    onClick={() => setSelect(index)}
                  >
                    <img
                      src={img.url}
                      alt={`thumb-${index}`}
                      className="h-[80px] w-[80px] object-cover rounded-md"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT: Product Info */}
            <div className="w-full 800px:w-[55%] flex flex-col gap-5 relative">
              {/* top row: title + heart */}
              <div className="flex items-start justify-between gap-4">
                <h1 className="text-3xl font-bold">{data.name}</h1>

                {/* Heart toggle */}
                <button
                  onClick={() => setLiked(prev => !prev)}
                  aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
                  className="ml-2 p-2 rounded-full hover:bg-gray-100 transition-transform transform active:scale-95"
                >
                  {liked ? (
                    <AiFillHeart className="text-red-500 text-2xl" />
                  ) : (
                    <AiOutlineHeart className="text-gray-600 text-2xl" />
                  )}
                </button>
              </div>

              <p className="text-gray-700 leading-relaxed">{data.description}</p>

              <div className="flex items-center gap-3">
                <span className="text-3xl font-semibold text-red-600">
                  ${data.discount_price}
                </span>
                <span className="text-lg  text-gray-500">
                  {data.price ? data.price : null}
                </span>
              </div>

              {/* Shop Info + Send Message */}
              <div className="flex items-center gap-3 border-t pt-4">
                <img
                  src={data.shop.shop_avatar.url}
                  alt="shop avatar"
                  className="w-12 h-12 rounded-full object-cover border"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3
                      className="font-medium cursor-pointer hover:underline"
                      onClick={() => navigate(`/shop/${data.shop._id}`)}
                    >
                      {data.shop.name}
                    </h3>

                    {/* Send Message button */}
                    <button
                      type="button"
                      onClick={() => {
                        console.log('Send message clicked')
                      }}
                      className="ml-2 text-sm px-3 py-1.5 border rounded-md bg-black text-white hover:bg-gray-700"
                    >
                      Send Message
                    </button>
                  </div>

                  <span className="text-sm text-gray-500">
                    ({data.shop.ratings} ratings)
                  </span>
                </div>
              </div>

              {/* Quantity Counter */}
              <div className="flex items-center gap-3 mt-3">
                <button
                  onClick={() => setCount(count > 1 ? count - 1 : 1)}
                  className="px-3 py-1 bg-gray-200 rounded-md"
                >
                  -
                </button>
                <span className="text-lg font-medium">{count}</span>
                <button
                  onClick={() => setCount(count + 1)}
                  className="px-3 py-1 bg-gray-200 rounded-md"
                >
                  +
                </button>
              </div>

              <button className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-lg mt-4 w-fit">
                Add to Cart
              </button>
              
            </div>
          </div>
        </div>
      ) : (
        <div>No product data found.</div>
      )}

        <div>
          <ProductDetailsInfo data={data}/>
          <br />
          <br />
        </div>

    </div>
  )
}




const ProductDetailsInfo = ({ data }) => {
  const [active, setActive] = useState(1)

  return (
    <div>
      <div className="bg-[#f5f6fb] w-[70%] 800px:w-[70%] py-10 mx-auto">
        {/* Tabs */}
        <div className="w-full flex justify-between border-b pt-10 pb-2">
          <div className="relative">
            <h5
              className="text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
              onClick={() => setActive(1)}
            >
              Product Details
            </h5>
            {active === 1 && <div className={`${styles.active_indicator}`} />}
          </div>

          <div className="relative">
            <h5
              className="text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
              onClick={() => setActive(2)}
            >
              Product Reviews
            </h5>
            {active === 2 && <div className={`${styles.active_indicator}`} />}
          </div>

          <div className="relative">
            <h5
              className="text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
              onClick={() => setActive(3)}
            >
              Seller Information
            </h5>
            {active === 3 && <div className={`${styles.active_indicator}`} />}
          </div>
        </div>

        {/* Product Details */}
        {active === 1 && (
          <>
          <p className="py-2 text-[18px] leading-8 pb-10 whitespace-pre-line">
             Product details are a crucial part of any eCommerce website or online marketplace. These details help the potential customers to make an informed decision about the product they are interested in buying. A well-written product description can also be a powerful marketing tool that can help to increase sales. Product details typically include information about the product's features, specifications, dimensions, weight, materials, and other relevant information that can help language, and be honest and transparent about the product's features and limitations.
          </p>
          
           <p className="py-2 text-[18px] leading-8 pb-10 whitespace-pre-line">
             Product details are a crucial part of any eCommerce website or online marketplace. These details help the potential customers to make an informed decision about the product they are interested in buying. A well-written product description can also be a powerful marketing tool that can help to increase sales. Product details typically include information about the product's features, specifications, dimensions, weight, materials, and other relevant information that can help language, and be honest and transparent about the product's features and limitations.
          </p>

           <p className="py-2 text-[18px] leading-8 pb-10 whitespace-pre-line">
             Product details are a crucial part of any eCommerce website or online marketplace. These details help the potential customers to make an informed decision about the product they are interested in buying. A well-written product description can also be a powerful marketing tool that can help to increase sales. Product details typically include information about the product's features, specifications, dimensions, weight, materials, and other relevant information that can help language, and be honest and transparent about the product's features and limitations.
          </p>
          </>
        )}

        {/* Product Reviews */}
        {active === 2 && (
          <div className="w-full justify-center min-h-[40vh] flex items-center">
            <p>No Reviews yet!</p>
          </div>
        )}

        {/* Seller Info */}
        {active === 3 && (
          <div className="w-full block 800px:flex p-5">
            {/* Left Side: Avatar + Name + Rating */}
            <div className="w-full 800px:w-[30%] flex flex-col items-center border-r pr-5">
              <img
                src={data.shop.shop_avatar.url}
                className="w-[80px] h-[80px] rounded-full object-cover"
                alt=""
              />
              <h3 className="text-[20px] font-[600] mt-2">{data.shop.name}</h3>
              <p className="text-[16px] mt-1">({data.rating}) Rating</p>
            </div>

            {/* Right Side: Other Info */}
            <div className="w-full 800px:w-[70%] pl-5">
              <p className="text-[16px] text-gray-600">
                {data.shop.description || "This is a trusted seller providing quality products."}
              </p>

              <div className="flex flex-wrap gap-6 mt-4">
                <p className="text-[16px]">120 Products</p>
                <p className="text-[16px]">85 Reviews</p>
                <p className="text-[16px]">Joined: Jan 2022</p>
              </div>

              {/* Buttons */}
              <div className="flex gap-4 mt-5">
                <Link to={"/"}>
                <button className="px-5 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition">
                  Visit Shop
                </button>
                 </Link>
               
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductDetails
