import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { loginSeller } from "../redux/actions/user";

const ShopLoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  
  const { isSeller, seller, isLoading, error } = useSelector((state) => state.seller);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!email || !password) {
      toast.error("Please fill in all fields!");
      return;
    }

    try {
      console.log("🚀 Attempting seller login...");
      const data = await dispatch(loginSeller(email, password));
      
      console.log("✅ Login successful:", data);
      toast.success("Login successful! Welcome back! 🎉");
      
      // Get seller ID and navigate
      const sellerId = data.user._id;
      console.log("🧭 Navigating to:", `/dashboard`);
      
      // Use window.location for guaranteed redirect
      
    } catch (err) {
      console.error("❌ Login error:", err);
      // Error is already handled by Redux, just show toast
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  // Handle Redux errors
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  // Redirect if already logged in
  useEffect(() => {
    if (isSeller && seller && seller._id) {
      console.log("🏠 Already logged in, redirecting...");
      navigate(`/dashboard`, { replace: true });
    }
  }, [isSeller, seller, navigate]);

  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen space-y-8 bg-gray-100">
        <h1 className="text-4xl font-bold text-center">
          Login to Your Shop
        </h1>

        <div className="bg-gray-50 shadow-lg rounded-2xl p-8 w-96">
          <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <label htmlFor="email" className="mb-1 font-medium">
                Shop Email
              </label>
              <input
                type="email"
                id="email"
                autoComplete="current-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
                className="border rounded-lg px-3 py-2 focus:outline-none disabled:bg-gray-100"
              />
            </div>

            <div className="flex flex-col relative">
              <label htmlFor="password" className="mb-1 font-medium">
                Password
              </label>
              <input
                type={visible ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
                disabled={isLoading}
                className="border rounded-lg px-3 py-2 focus:outline-none pr-10 disabled:bg-gray-100"
              />
              {visible ? (
                <IoIosEye
                  className={`absolute right-3 top-9 text-gray-700 ${isLoading ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                  onClick={() => !isLoading && setVisible(false)}
                />
              ) : (
                <IoIosEyeOff
                  className={`absolute right-3 top-9 text-gray-700 ${isLoading ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                  onClick={() => !isLoading && setVisible(true)}
                />
              )}
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="remember-me"
                  disabled={isLoading}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded disabled:cursor-not-allowed"
                />
                <label
                  htmlFor="remember-me"
                  className={`font-medium text-gray-700 ${isLoading ? 'cursor-not-allowed' : ''}`}
                >
                  Remember me
                </label>
              </div>
              <Link
                to="/forgot-password"
                className={`text-blue-600 hover:underline ${isLoading ? 'pointer-events-none opacity-50' : ''}`}
              >
                Forgot your password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`mt-4 py-2 rounded-lg transition duration-200 ${
                isLoading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700'
              } text-white`}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>

            <div className="text-center text-sm text-gray-600">
              Don't have a Shop?{" "}
              <Link
                to="/shop-create"
                className={`text-blue-600 font-medium hover:underline ${isLoading ? 'pointer-events-none opacity-50' : ''}`}
              >
                Create Shop
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ShopLoginPage;