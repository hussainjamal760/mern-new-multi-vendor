import React, { useEffect } from "react";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { useDispatch, useSelector,  } from "react-redux";
import { Link } from "react-router-dom";
import { getAllProductsShop, deleteProduct } from "../redux/actions/product";

const AllProducts = () => {
  const { products } = useSelector((state) => state.product);
  const { seller } = useSelector((state) => state.seller);

  const dispatch = useDispatch();

  useEffect(() => {
    if (seller?._id) {
      dispatch(getAllProductsShop(seller._id));
    }
  }, [dispatch, seller]);

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
    window.location.reload();
  };

  return (
    <>
      
        <div className="w-full mx-8 pt-1 mt-10 bg-white p-4 rounded-lg shadow-md">
          <h1 className="text-xl font-bold mb-4">All Products</h1>

          <div className="overflow-x-auto">
            <table className="w-full border border-gray-300 rounded-lg">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 border">Product Id</th>
                  <th className="p-3 border">Name</th>
                  <th className="p-3 border">Price</th>
                  <th className="p-3 border">Stock</th>
                  <th className="p-3 border">Sold Out</th>
                  <th className="p-3 border">Preview</th>
                  <th className="p-3 border">Delete</th>
                </tr>
              </thead>
              <tbody>
                {products && products.length > 0 ? (
                  products.map((item) => (
                    <tr
                      key={item._id}
                      className="hover:bg-gray-50 transition duration-200"
                    >
                      <td className="p-3 border">{item._id}</td>
                      <td className="p-3 border">{item.name}</td>
                      <td className="p-3 border">US$ {item.discountPrice}</td>
                      <td className="p-3 border">{item.stock}</td>
                      <td className="p-3 border">{item?.sold_out}</td>
                      <td className="p-3 border text-center">
                        <Link
                          to={`/product/${item._id}`}
                          className="inline-flex items-center justify-center p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                        >
                          <AiOutlineEye size={18} />
                        </Link>
                      </td>
                      <td className="p-3 border text-center">
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="inline-flex items-center justify-center p-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
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
                      No products available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
    </>
  );
};

export default AllProducts;
