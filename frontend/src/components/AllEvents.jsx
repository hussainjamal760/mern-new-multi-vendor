import React, { useEffect } from "react";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllEventsShop, deleteEvent } from "../redux/actions/event";
import { toast } from "react-toastify";

const AllEvents = () => {
  const { events, isLoading, error } = useSelector((state) => state.event);
  const { seller } = useSelector((state) => state.seller);

  const dispatch = useDispatch();

  useEffect(() => {
    if (seller?._id) {
      console.log("🔍 Fetching events for shop:", seller._id);
      dispatch(getAllEventsShop(seller._id));
    }
  }, [dispatch, seller?._id]); // Fixed dependency

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await dispatch(deleteEvent(id));
        
        // Refresh the events list after successful deletion
        setTimeout(() => {
          if (seller?._id) {
            dispatch(getAllEventsShop(seller._id));
          }
        }, 1000);
        
        toast.success("Event deleted successfully!");
      } catch (error) {
        toast.error("Failed to delete event. Please try again.");
      }
    }
  };

  // Helper function to format event name for URL
  const formatEventName = (name) => {
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
       <div className="mb-4 p-2 bg-gray-100 rounded text-sm">
        <p><strong>Seller ID:</strong> {seller?._id || 'Not found'}</p>
        <p><strong>Events Count:</strong> {events?.length || 0}</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border">Event Id</th>
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Price</th>
              <th className="p-3 border">Stock</th>
              <th className="p-3 border">Sold Out</th>
              <th className="p-3 border">Status</th>
              <th className="p-3 border">Start Date</th>
              <th className="p-3 border">End Date</th>
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
                  <td className="p-3 border text-xs">{item._id}</td>
                  <td className="p-3 border">{item.name}</td>
                  <td className="p-3 border">
                    US$ {item.discountPrice || item.discount_price}
                  </td>
                  <td className="p-3 border">{item.stock}</td>
                  <td className="p-3 border">{item?.sold_out || 0}</td>
                  <td className="p-3 border">
                    <span className={`px-2 py-1 rounded text-xs ${
                      item.status === 'Running' ? 'bg-green-100 text-green-800' : 
                      'bg-red-100 text-red-800'
                    }`}>
                      {item.status || 'Running'}
                    </span>
                  </td>
                  <td className="p-3 border text-sm">
                    {new Date(item.start_Date).toLocaleDateString()}
                  </td>
                  <td className="p-3 border text-sm">
                    {new Date(item.Finish_Date).toLocaleDateString()}
                  </td>
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
                  colSpan="9"
                  className="p-3 border text-center text-gray-500"
                >
                  {isLoading ? "Loading events..." : "No events available"}
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