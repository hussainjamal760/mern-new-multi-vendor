import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import styles from '../styles/styles'

const ProductDetails = ({ data }) => {
  const [count, setCount] = useState(1)
  const [select, setSelect] = useState(0)
  const [liked, setLiked] = useState(false)
  const navigate = useNavigate()

  const { name } = useParams();
  console.log("🆔 Product ID from URL:", name);

  // Early return if no data
  if (!data) {
    return (
      <div className="bg-white">
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h2>
            <p className="text-gray-600">Loading product details...</p>
          </div>
        </div>
      </div>
    );
  }

  // Log the complete product data structure for debugging
  console.log('🔍 Complete product data:', JSON.stringify(data, null, 2));

  // Helper function to safely get images array
  const getImages = (productData) => {
    console.log('🖼️ Getting images from:', productData);
    
    const defaultImages = [{
      url: 'https://via.placeholder.com/400x400?text=No+Image+Available'
    }];

    if (!productData) {
      console.log('❌ No product data provided');
      return defaultImages;
    }

    let images = [];

    // Check for different possible image properties
    if (productData.images && Array.isArray(productData.images)) {
      console.log('📸 Found images array:', productData.images);
      images = productData.images.map((img, index) => {
        if (typeof img === 'string') {
          return { url: img };
        } else if (img && typeof img === 'object') {
          return { 
            url: img.url || img.secure_url || img.path || `Image ${index + 1}` 
          };
        }
        return { url: 'https://via.placeholder.com/400x400?text=Invalid+Image' };
      });
    } 
    else if (productData.image_Url && Array.isArray(productData.image_Url)) {
      console.log('📸 Found image_Url array:', productData.image_Url);
      images = productData.image_Url;
    }
    else if (productData.imageUrls && Array.isArray(productData.imageUrls)) {
      console.log('📸 Found imageUrls array:', productData.imageUrls);
      images = productData.imageUrls.map(url => ({ url }));
    }
    else {
      console.log('⚠️ No images found, checking for single image properties...');
      
      // Check for single image properties
      const singleImageUrl = productData.image || productData.imageUrl || productData.picture || productData.photo;
      if (singleImageUrl) {
        console.log('📸 Found single image:', singleImageUrl);
        images = [{ url: singleImageUrl }];
      } else {
        console.log('❌ No images found at all');
        images = defaultImages;
      }
    }

    // Ensure we always have at least one image
    if (images.length === 0) {
      images = defaultImages;
    }

    return images;
  };

  // Helper function to get shop data safely
  const getShopData = (productData) => {
    if (!productData) return null;
    
    if (productData.shop) {
      return productData.shop;
    }
    
    if (productData.shopId) {
      return {
        name: productData.shopId.name || 'Unknown Shop',
        shop_avatar: { 
          url: productData.shopId.avatar || 'https://via.placeholder.com/50x50?text=Shop' 
        },
        ratings: productData.shopId.ratings || 0,
        _id: productData.shopId._id || productData.shopId
      };
    }
    
    return {
      name: 'Unknown Shop',
      shop_avatar: { url: 'https://via.placeholder.com/50x50?text=Shop' },
      ratings: 0,
      _id: 'unknown'
    };
  };

  // Helper function to get price safely
  const getPrice = (productData) => {
    if (!productData) return { discount: 0, original: null };
    
    return {
      discount: productData.discountPrice || productData.discount_price || productData.price || 0,
      original: productData.originalPrice || (productData.price !== productData.discountPrice ? productData.price : null)
    };
  };

  const images = getImages(data);
  const shopData = getShopData(data);
  const priceData = getPrice(data);


  return (
    <div className="bg-white">
      <div className={`w-[70%] 800px:w-[70%] py-10 mx-auto`}>
        <div className="w-full flex flex-col 800px:flex-row gap-12">
          
          {/* LEFT: Product Images */}
          <div className="w-full 800px:w-[45%] flex flex-col items-start">
            <div className="w-full border rounded-lg shadow-md p-3 bg-gray-50">
            
              <img
                src={images[select]?.url || 'https://via.placeholder.com/400x400?text=Loading...'}
                alt={data.name || 'Product'}
                className="w-full max-h-[450px] object-contain rounded-md"
                onLoad={() => console.log('✅ Image loaded successfully:', images[select]?.url)}
                onError={(e) => {
                  console.error('❌ Image failed to load:', images[select]?.url);
                  e.target.src = 'https://via.placeholder.com/400x400?text=Image+Not+Found';
                }}
              />
            </div>

            {images.length > 1 && (
              <div className="flex gap-3 mt-4 flex-wrap">
                {images.map((img, index) => (
                  <div
                    key={index}
                    className={`cursor-pointer p-1 rounded-md ${
                      select === index ? "border-2 border-blue-500" : "border"
                    }`}
                    onClick={() => setSelect(index)}
                  >
                    <img
                      src={img?.url || 'https://via.placeholder.com/80x80?text=No+Image'}
                      alt={`Thumbnail ${index + 1}`}
                      className="h-[80px] w-[80px] object-cover rounded-md"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/80x80?text=Error';
                      }}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT: Product Info */}
          <div className="w-full 800px:w-[55%] flex flex-col gap-5 relative">
            {/* top row: title + heart */}
            <div className="flex items-start justify-between gap-4">
              <h1 className="text-3xl font-bold">{data.name || 'Untitled Product'}</h1>

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

            <p className="text-gray-700 leading-relaxed">
              {data.description || 'No description available for this product.'}
            </p>

            <div className="flex items-center gap-3">
              <span className="text-3xl font-semibold text-red-600">
                ${priceData.discount}
              </span>
              {priceData.original && priceData.original !== priceData.discount && (
                <span className="text-lg line-through text-gray-500">
                  ${priceData.original}
                </span>
              )}
            </div>

            {/* Shop Info + Send Message */}
            {shopData && (
              <div className="flex items-center gap-3 border-t pt-4">
                <img
                  src={shopData.shop_avatar?.url || 'https://via.placeholder.com/50x50?text=Shop'}
                  alt="shop avatar"
                  className="w-12 h-12 rounded-full object-cover border"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/50x50?text=Shop';
                  }}
                />
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3
                      className="font-medium cursor-pointer hover:underline"
                      onClick={() => navigate(`/shop/${shopData._id}`)}
                    >
                      {shopData.name}
                    </h3>

                    <button
                      type="button"
                      onClick={() => {
                        console.log('Send message clicked for shop:', shopData._id)
                      }}
                      className="ml-2 text-sm px-3 py-1.5 border rounded-md bg-black text-white hover:bg-gray-700"
                    >
                      Send Message
                    </button>
                  </div>

                  <span className="text-sm text-gray-500">
                    ({shopData.ratings || 0} ratings)
                  </span>
                </div>
              </div>
            )}

            {/* Quantity Counter */}
            <div className="flex items-center gap-3 mt-3">
              <button
                onClick={() => setCount(count > 1 ? count - 1 : 1)}
                className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                -
              </button>
              <span className="text-lg font-medium">{count}</span>
              <button
                onClick={() => setCount(count + 1)}
                className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
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

  if (!data) {
    return <div>Loading product details...</div>;
  }

  const shopData = data.shop || data.shopId || {
    name: 'Unknown Shop',
    shop_avatar: { url: 'https://via.placeholder.com/80x80?text=Shop' },
    ratings: 0
  };

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
              {data.description || 'Product details are a crucial part of any eCommerce website or online marketplace. These details help the potential customers to make an informed decision about the product they are interested in buying. A well-written product description can also be a powerful marketing tool that can help to increase sales.'}
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
                src={shopData.shop_avatar?.url || shopData.avatar || 'https://via.placeholder.com/80x80?text=Shop'}
                className="w-[80px] h-[80px] rounded-full object-cover"
                alt="shop avatar"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/80x80?text=Shop';
                }}
              />
              <h3 className="text-[20px] font-[600] mt-2">{shopData.name || 'Unknown Shop'}</h3>
              <p className="text-[16px] mt-1">({data.rating || shopData.ratings || 0}) Rating</p>
            </div>

            {/* Right Side: Other Info */}
            <div className="w-full 800px:w-[70%] pl-5">
              <p className="text-[16px] text-gray-600">
                {shopData.description || "This is a trusted seller providing quality products."}
              </p>

              <div className="flex flex-wrap gap-6 mt-4">
                <p className="text-[16px]">Products: {data.stock || 'N/A'}</p>
                <p className="text-[16px]">Category: {data.category || 'N/A'}</p>
                <p className="text-[16px]">In Stock: {data.stock || 0}</p>
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