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
  const [minAmount, setMinAmout] = useState(null);
  const [maxAmount, setMaxAmount] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [value, setValue] = useState(null);
  const { seller } = useSelector((state) => state.seller);
  const { products } = useSelector((state) => state.product);

  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${server}/coupon/get-coupon/${seller._id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setIsLoading(false);
        setCoupouns(res.data.couponCodes);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, [dispatch, seller._id]);

  const handleDelete = async (id) => {
    axios
      .delete(`${server}/coupon/delete-coupon/${id}`, { withCredentials: true })
      .then(() => {
        toast.success("Coupon code deleted succesfully!");
        window.location.reload();
      })
      .catch(() => {
        toast.error("Error deleting coupon!");
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post(
        `${server}/coupon/create-coupon-code`,
        {
          name,
          minAmount,
          maxAmount,
          selectedProducts,
          value,
          shopId: seller._id,
        },
        { withCredentials: true }
      )
      .then(() => {
        toast.success("Coupon code created successfully!");
        setOpen(false);
        window.location.reload();
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
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

        {/* Static Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border text-left">Id</th>
                <th className="px-4 py-2 border text-left">Coupon Code</th>
                <th className="px-4 py-2 border text-left">Value</th>
                <th className="px-4 py-2 border text-center">Delete</th>
              </tr>
            </thead>
            <tbody>
              {coupouns &&
                coupouns.map((item) => (
                  <tr key={item._id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border">{item._id}</td>
                    <td className="px-4 py-2 border">{item.name}</td>
                    <td className="px-4 py-2 border">{item.value} %</td>
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
                Create Coupon code
              </h5>

              <form onSubmit={handleSubmit} aria-required={true}>
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
                    type="text"
                    name="value"
                    value={value}
                    required
                    className="mt-2 block w-full px-3 h-[35px] border border-gray-300 rounded-[3px]"
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="Enter your coupon code value..."
                  />
                </div>
                <br />
                <div>
                  <label className="pb-2">Min Amount</label>
                  <input
                    type="number"
                    value={minAmount}
                    className="mt-2 block w-full px-3 h-[35px] border border-gray-300 rounded-[3px]"
                    onChange={(e) => setMinAmout(e.target.value)}
                    placeholder="Enter min amount..."
                  />
                </div>
                <br />
                <div>
                  <label className="pb-2">Max Amount</label>
                  <input
                    type="number"
                    value={maxAmount}
                    className="mt-2 block w-full px-3 h-[35px] border border-gray-300 rounded-[3px]"
                    onChange={(e) => setMaxAmount(e.target.value)}
                    placeholder="Enter max amount..."
                  />
                </div>
                <br />
                <div>
                  <label className="pb-2">Selected Product</label>
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
                  <input
                    type="submit"
                    value="Create"
                    className="mt-2 block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] bg-blue-500 text-white cursor-pointer"
                  />
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
