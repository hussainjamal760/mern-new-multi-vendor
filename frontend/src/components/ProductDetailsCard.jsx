import React, { useState } from "react";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import styles from "../styles/styles";

const ProductDetailsCard = ({ setOpen, data }) => {
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);

  const handleMessageSubmit = () => {};

  const decrementCount = () => {
    if (count > 1) setCount(count - 1);
  };

  const incrementCount = () => {
    setCount(count + 1);
  };

  return (
    <div className="bg-[#fff]">
      {data ? (
        <div className="fixed w-full h-screen top-0 left-0 bg-[#00000030] z-40 flex items-center justify-center">
          <div className="w-[90%] 800px:w-[60%] h-[90vh] overflow-y-scroll 800px:h-[75vh] bg-white rounded-md shadow-sm relative p-4">
            {/* Close */}
            <RxCross1
              size={30}
              className="absolute right-3 top-3 z-50 cursor-pointer"
              onClick={() => setOpen(false)}
            />

            {/* IMAGE + DETAILS */}
            <div className="block w-full 800px:flex gap-6">
              {/* IMAGE */}
              <div className="w-full 800px:w-[40%] flex justify-center items-start">
                <img
                  src={`${data.image_Url[0].url}`}
                  alt=""
                  className="max-h-[400px] object-contain"
                />
              </div>

              {/* PRODUCT DETAILS */}
              <div className="w-full 800px:w-[60%] pt-2">
                {/* Title */}
                <h1 className={`${styles.productTitle} text-[20px]`}>
                  {data.name}
                </h1>

                {/* Description */}
                <p className="text-gray-700 leading-6">{data.description}</p>

                {/* Price */}
                <div className="flex pt-3 items-center gap-3">
                  <h4 className={`${styles.productDiscountPrice}`}>
                    {data.discount_price}$
                  </h4>
                  {data.price && (
                    <h3 className={`${styles.price} line-through`}>
                      {data.price}$
                    </h3>
                  )}
                </div>

                {/* Counter + Heart */}
                <div className="flex items-center mt-6 justify-between pr-3">
                  {/* Counter */}
                  <div>
                    <button
                      className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 hover:opacity-75"
                      onClick={decrementCount}
                    >
                      -
                    </button>
                    <span className="bg-gray-200 text-gray-800 font-medium px-4 py-[11px]">
                      {count}
                    </span>
                    <button
                      className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-r px-4 py-2 hover:opacity-75"
                      onClick={incrementCount}
                    >
                      +
                    </button>
                  </div>

                  {/* Heart */}
                  <div>
                    {click ? (
                      <AiFillHeart
                        size={30}
                        className="cursor-pointer"
                        onClick={() => setClick(!click)}
                        color="red"
                        title="Remove from wishlist"
                      />
                    ) : (
                      <AiOutlineHeart
                        size={30}
                        className="cursor-pointer"
                        onClick={() => setClick(!click)}
                        title="Add to wishlist"
                      />
                    )}
                  </div>
                </div>

                {/* Add to Cart */}
                <div
                  className={`${styles.button} mt-6 rounded-[4px] h-11 flex items-center`}
                >
                  <span className="text-[#fff] flex items-center">
                    Add to cart <AiOutlineShoppingCart className="ml-1" />
                  </span>
                </div>
              </div>
            </div>

            {/* SHOP INFO (Bottom full width) */}
            <div className="mt-8 border-t pt-4 flex items-center">
              <img
                src={`${data.shop.shop_avatar.url}`}
                alt=""
                className="w-[50px] h-[50px] rounded-full mr-3"
              />
              <div>
                <h3 className={`${styles.shop_name}`}>{data.shop.name}</h3>
                <h5 className="text-[15px]">{data.shop.ratings} Ratings</h5>
              </div>

              <div
                className={`${styles.button} bg-[#000] ml-auto rounded-[4px] h-11`}
                onClick={handleMessageSubmit}
              >
                <span className="text-[#fff] flex items-center">
                  Send Message <AiOutlineMessage className="ml-1" />
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ProductDetailsCard;
