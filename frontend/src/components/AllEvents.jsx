import React, { useEffect } from "react";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllProductsShop, deleteProduct } from "../redux/actions/product";
import { toast } from "react-toastify";
import { getAllEventsShop } from "../redux/actions/event";

const AllEvents = () => {
  const { events, isLoading, error } = useSelector((state) => state.event);
  const { seller } = useSelector((state) => state.seller);

  const dispatch = useDispatch();

  useEffect(() => {
    if (seller?._id) {
      dispatch(getAllEventsShop(seller._id));
    }
  }, [dispatch, seller]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      dispatch(deleteProdut(id));
      // Refresh the products list after deletion
      setTimeout(() => {
        dispatch(getAllEventsShop(seller._id));
      }, 1000);
    }
  };

  // Helper function to format product name for URL
  const formatProductName = (name) => {
    return name.replace(/\s+/g, "-");
  };

  if (isLoading) {
    return (
      <div className="w-full mx-8 pt-1 mt-10 bg-white p-4 rounded-lg shadow-md">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full mx-8 pt-1 mt-10 bg-white p-4 rounded-lg shadow-md">
      <h1 className="text-xl font-bold mb-4">All Events</h1>
      


      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border">Product Id</th>
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Price</th>
              <th className="p-3 border">Stock</th>
              <th className="p-3 border">Sold Out</th>
              {/* <th className="p-3 border">Preview</th> */}
              <th className="p-3 border">Delete</th>
            </tr>
          </thead>
          <tbody>
            {events && events.length > 0 ? (
              events.map((item) => (
                <tr
                  key={item._id}
                  className="hover:bg-gray-50 transition duration-200"
                >
                  <td className="p-3 border">{item._id}</td>
                  <td className="p-3 border">{item.name}</td>
                  <td className="p-3 border">
                    US$ {item.discountPrice || item.discount_price}
                  </td>
                  <td className="p-3 border">{item.stock}</td>
                  <td className="p-3 border">{item?.sold_out || 0}</td>
                    {/*
                  <td className="p-3 border text-center">
                     <Link
                      to={`/product/${formatProductName(item.name)}`}
                      className="inline-flex items-center justify-center p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                      title={`View ${item.name}`}
                    >
                      <AiOutlineEye size={18} />
                    </Link> 
                  </td>
                    */}
                  <td className="p-3 border text-center">
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="inline-flex items-center justify-center p-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                      title={`Delete ${item.name}`}
                    >
                      <AiOutlineDelete size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="p-3 border text-center text-gray-500"
                >
                  {isLoading ? "Loading events..." : "No products available"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllEvents;