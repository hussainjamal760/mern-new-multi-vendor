// CreateProduct.jsx - FIXED VERSION
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { categoriesData } from "../static/data";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useEffect } from "react";
import {toast} from "react-toastify"
import { createProduct, clearErrors } from "../redux/actions/product";

const CreateProduct = () => {
  const { seller } = useSelector((state) => state.seller);
  const {success , error} = useSelector((state)=>state.product)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [originalPrice, setOriginalPrice] = useState(""); // ✅ Fixed: Use empty string instead of undefined
  const [discountPrice, setDiscountPrice] = useState(""); // ✅ Fixed: Use empty string instead of undefined  
  const [stock, setStock] = useState(""); // ✅ Fixed: Use empty string instead of undefined

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (success) {
      toast.success("Product created successfully!");
      // Reset form
      setName("");
      setDescription("");
      setCategory("");
      setTags("");
      setOriginalPrice("");
      setDiscountPrice("");
      setStock("");
      setImages([]);
      
      // ✅ FIXED: Clear success state and navigate properly
      setTimeout(() => {
        dispatch(clearErrors()); // This should also clear success state
        navigate("/dashboard");
      }, 2000);
    }
  }, [dispatch, error, success, navigate]);

  // ✅ FIXED: Handle image selection properly
  const handleImageChange = (e) => {
    e.preventDefault();
    const files = Array.from(e.target.files);
    
    // Add new files to existing images array
    setImages((prevImages) => [...prevImages, ...files]);
  };

  // ✅ FIXED: Handle form submission with proper FormData
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("🔍 Seller from Redux:", seller);
    console.log("🔍 Seller type:", typeof seller);

    // Basic validation
    if (!name || !description || !category || !discountPrice || !stock) {
      toast.error("Please fill in all required fields!");
      return;
    }

    if (images.length === 0) {
      toast.error("Please upload at least one product image!");
      return;
    }

    // ✅ Handle seller ID properly
    let sellerId;
    if (typeof seller === 'string') {
      sellerId = seller;
    } else if (seller && seller._id) {
      sellerId = seller._id;
    } else {
      toast.error("Seller information not found. Please login again.");
      return;
    }

    console.log("🏪 Using seller ID:", sellerId);

    const newForm = new FormData();

    // ✅ FIXED: Append all images with the same key name
    images.forEach((image) => {
      newForm.append("images", image);
    });
    
    newForm.append("name", name);
    newForm.append("description", description);
    newForm.append("category", category);
    newForm.append("tags", tags);
    newForm.append("originalPrice", originalPrice || "0");
    newForm.append("discountPrice", discountPrice);
    newForm.append("stock", stock);
    newForm.append("shopId", sellerId);
    
    // ✅ Debug: Log FormData contents
    for (let pair of newForm.entries()) {
      console.log("📋 FormData:", pair[0], pair[1]);
    }
    
    console.log("📤 Submitting product with images:", images.length);
    dispatch(createProduct(newForm));
  };

  // ✅ FIXED: Remove image function
  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <div className="w-full max-w-5xl bg-white shadow-lg rounded-2xl p-6">
      <h5 className="text-2xl font-semibold text-gray-800 text-center mb-6">
        Create Product
      </h5>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Product Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Product Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your product name..."
            className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:ring focus:ring-blue-200 outline-none"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            rows="5"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter your product description..."
            className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:ring focus:ring-blue-200 outline-none"
            required
          ></textarea>
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:ring focus:ring-blue-200 outline-none"
            required
          >
            <option value="">Choose a category</option>
            {categoriesData &&
              categoriesData.map((i) => (
                <option value={i.title} key={i.title}>
                  {i.title}
                </option>
              ))}
          </select>
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Tags
          </label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Enter product tags..."
            className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:ring focus:ring-blue-200 outline-none"
          />
        </div>

        {/* Price, Discount, Stock in Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Original Price
            </label>
            <input
              type="number"
              value={originalPrice}
              onChange={(e) => setOriginalPrice(e.target.value)}
              placeholder="Enter price..."
              className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:ring focus:ring-blue-200 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Discount Price <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={discountPrice}
              onChange={(e) => setDiscountPrice(e.target.value)}
              placeholder="Enter discounted price..."
              className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:ring focus:ring-blue-200 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Stock <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              placeholder="Enter stock..."
              className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:ring focus:ring-blue-200 outline-none"
              required
            />
          </div>
        </div>

        {/* Upload Images */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Upload Images <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            id="upload"
            className="hidden"
            multiple
            accept="image/*"
            onChange={handleImageChange}
          />
          <div className="flex flex-wrap items-center gap-3 mt-3">
            <label
              htmlFor="upload"
              className="cursor-pointer flex items-center justify-center w-24 h-24 rounded-lg border-2 border-dashed border-gray-300 hover:border-blue-500 transition-colors"
            >
              <AiOutlinePlusCircle size={30} className="text-gray-500" />
            </label>
            
            {/* ✅ FIXED: Proper image preview */}
            {images &&
              images.map((image, idx) => (
                <div
                  key={idx}
                  className="relative w-24 h-24 rounded-lg overflow-hidden shadow-md group"
                >
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`preview-${idx}`}
                    className="w-full h-full object-cover"
                  />
                  {/* Remove button */}
                  <button
                    type="button"
                    onClick={() => removeImage(idx)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    ×
                  </button>
                </div>
              ))}
          </div>
          {images.length > 0 && (
            <p className="text-sm text-gray-500 mt-2">
              {images.length} image(s) selected
            </p>
          )}
        </div>

        {/* Submit */}
        <div>
          <button
            type="submit"
            className="w-full py-2 mt-4 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Create Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;