// frontend/src/components/AllCoupons.jsx - FIXED VERSION
import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import styles from "../styles/styles";
import { server } from "../server";
import { toast } from "react-toastify";

const AllCoupons = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [coupouns, setCoupouns] = useState([]);
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");
  const [selectedProducts, setSelectedProducts] = useState("");
  const [value, setValue] = useState("");
  const { seller } = useSelector((state) => state.seller);
  const { products } = useSelector((state) => state.product);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!seller?._id) {
      console.log("❌ No seller ID found");
      return;
    }
    
    console.log("🔍 Fetching coupons for seller:", seller._id);
    setIsLoading(true);
    
    axios
      .get(`${server}/copoun/get-coupon/${seller._id}`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log("✅ Coupons fetched:", res.data);
        setIsLoading(false);
        setCoupouns(res.data.couponCodes || []);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error("❌ Error fetching coupons:", error);
        console.error("❌ Error response:", error.response?.data);
        toast.error(error.response?.data?.message || "Failed to fetch coupons");
      });
  }, [seller?._id]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this coupon?")) return;
    
    console.log("🗑️ Deleting coupon:", id);
    
    axios
      .delete(`${server}/copoun/delete-coupon/${id}`, { withCredentials: true })
      .then(() => {
        console.log("✅ Coupon deleted successfully");
        toast.success("Coupon code deleted successfully!");
        setCoupouns(coupouns.filter(coupon => coupon._id !== id));
      })
      .catch((error) => {
        console.error("❌ Delete error:", error);
        toast.error(error.response?.data?.message || "Error deleting coupon!");
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!name.trim()) {
      toast.error("Please enter coupon name");
      return;
    }
    if (!value || value <= 0) {
      toast.error("Please enter a valid discount percentage");
      return;
    }

    const couponData = {
      name: name.trim(),
      value: Number(value),
      shopId: seller._id.toString(), // Ensure it's a string
      shop: seller,
    };

    // Add optional fields only if they have values
    if (minAmount && Number(minAmount) > 0) {
      couponData.minAmount = Number(minAmount);
    }
    if (maxAmount && Number(maxAmount) > 0) {
      couponData.maxAmount = Number(maxAmount);
    }
    if (selectedProducts) {
      couponData.selectedProduct = selectedProducts;
    }

    console.log("📤 Sending coupon data:", couponData);

    try {
      const response = await axios.post(
        `${server}/copoun/create-coupon-code`,
        couponData,
        { withCredentials: true }
      );

      console.log("✅ Coupon created:", response.data);
      toast.success("Coupon code created successfully!");
      setCoupouns([response.data.coupounCode, ...coupouns]);
      setOpen(false);
      
      // Reset form
      setName("");
      setValue("");
      setMinAmount("");
      setMaxAmount("");
      setSelectedProducts("");
    } catch (error) {
      console.error("❌ Create coupon error:", error);
      console.error("❌ Error response:", error.response?.data);
      toast.error(error.response?.data?.message || "Failed to create coupon");
    }
  };

  return (
    <>
      <div className="w-full mx-8 pt-1 mt-10 bg-white">
        {/* Create Button */}
        <div className="w-full flex justify-end">
          <div
            className={`${styles.button} !w-max !h-[45px] px-3 !rounded-[5px] mr-3 mb-3`}
            onClick={() => setOpen(true)}
          >
            <span className="text-white">Create Coupon Code</span>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="w-full text-center py-4">
            <p>Loading coupons...</p>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && coupouns.length === 0 && (
          <div className="w-full text-center py-8">
            <p className="text-gray-500">No coupons found. Create your first coupon!</p>
          </div>
        )}

        {/* Coupons Table */}
        {!isLoading && coupouns.length > 0 && (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 border text-left">Id</th>
                  <th className="px-4 py-2 border text-left">Coupon Code</th>
                  <th className="px-4 py-2 border text-left">Value</th>
                  <th className="px-4 py-2 border text-left">Min Amount</th>
                  <th className="px-4 py-2 border text-left">Max Amount</th>
                  <th className="px-4 py-2 border text-center">Delete</th>
                </tr>
              </thead>
              <tbody>
                {coupouns.map((item) => (
                  <tr key={item._id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border">{item._id}</td>
                    <td className="px-4 py-2 border font-semibold">{item.name}</td>
                    <td className="px-4 py-2 border">{item.value}%</td>
                    <td className="px-4 py-2 border">${item.minAmount || "N/A"}</td>
                    <td className="px-4 py-2 border">${item.maxAmount || "N/A"}</td>
                    <td className="px-4 py-2 border text-center">
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <AiOutlineDelete size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Create Coupon Modal */}
        {open && (
          <div className="fixed top-0 left-0 w-full h-screen bg-[#00000062] z-[20000] flex items-center justify-center">
            <div className="w-[90%] 800px:w-[40%] h-[80vh] bg-white rounded-md shadow p-4 overflow-y-auto">
              <div className="w-full flex justify-end">
                <RxCross1
                  size={30}
                  className="cursor-pointer"
                  onClick={() => setOpen(false)}
                />
              </div>
              <h5 className="text-[30px] font-Poppins text-center">
                Create Coupon Code
              </h5>

              <form onSubmit={handleSubmit}>
                <br />
                <div>
                  <label className="pb-2">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={name}
                    className="mt-2 block w-full px-3 h-[35px] border border-gray-300 rounded-[3px]"
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your coupon code name..."
                  />
                </div>
                <br />
                <div>
                  <label className="pb-2">
                    Discount Percentage <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="value"
                    value={value}
                    required
                    min="1"
                    max="100"
                    className="mt-2 block w-full px-3 h-[35px] border border-gray-300 rounded-[3px]"
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="Enter discount percentage (1-100)..."
                  />
                </div>
                <br />
                <div>
                  <label className="pb-2">Min Amount (Optional)</label>
                  <input
                    type="number"
                    value={minAmount}
                    min="0"
                    className="mt-2 block w-full px-3 h-[35px] border border-gray-300 rounded-[3px]"
                    onChange={(e) => setMinAmount(e.target.value)}
                    placeholder="Enter min amount..."
                  />
                </div>
                <br />
                <div>
                  <label className="pb-2">Max Amount (Optional)</label>
                  <input
                    type="number"
                    value={maxAmount}
                    min="0"
                    className="mt-2 block w-full px-3 h-[35px] border border-gray-300 rounded-[3px]"
                    onChange={(e) => setMaxAmount(e.target.value)}
                    placeholder="Enter max amount..."
                  />
                </div>
                <br />
                <div>
                  <label className="pb-2">Selected Product (Optional)</label>
                  <select
                    className="w-full mt-2 border h-[35px] rounded-[5px]"
                    value={selectedProducts}
                    onChange={(e) => setSelectedProducts(e.target.value)}
                  >
                    <option value="">Choose a selected product</option>
                    {products &&
                      products.map((i) => (
                        <option value={i.name} key={i._id}>
                          {i.name}
                        </option>
                      ))}
                  </select>
                </div>
                <br />
                <div>
                  <button
                    type="submit"
                    className="mt-2 block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] bg-black text-white cursor-pointer hover:bg-black"
                  >
                    Create Coupon
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AllCoupons;