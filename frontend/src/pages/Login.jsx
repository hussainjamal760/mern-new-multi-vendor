
// frontend/src/pages/Login.jsx - Fixed with Redux
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux"
import { loginUser } from "../redux/actions/user";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  
  const { isAuthenticated, loading, error } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!email || !password) {
      toast.error("Please fill in all fields!");
      return;
    }

    dispatch(loginUser(email, password));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (isAuthenticated) {
      toast.success("Login successful! Welcome back! 🎉");
      navigate("/");
    }
  }, [error, isAuthenticated, navigate])

  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen space-y-8 bg-gray-100">
        <h1 className="text-4xl font-bold text-center">
          Login to Your Account
        </h1>

        <div className="bg-gray-50 shadow-lg rounded-2xl p-8 w-96">
          <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <label htmlFor="email" className="mb-1 font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                autoComplete="current-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
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
                disabled={loading}
                className="border rounded-lg px-3 py-2 focus:outline-none pr-10 disabled:bg-gray-100"
              />
              {visible ? (
                <IoIosEye
                  className={`absolute right-3 top-9 text-gray-700 ${loading ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                  onClick={() => !loading && setVisible(false)}
                />
              ) : (
                <IoIosEyeOff
                  className={`absolute right-3 top-9 text-gray-700 ${loading ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                  onClick={() => !loading && setVisible(true)}
                />
              )}
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="remember-me"
                  disabled={loading}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded disabled:cursor-not-allowed"
                />
                <label
                  htmlFor="remember-me"
                  className={`font-medium text-gray-700 ${loading ? 'cursor-not-allowed' : ''}`}
                >
                  Remember me
                </label>
              </div>
              <Link
                to="/forgot-password"
                className={`text-blue-600 hover:underline ${loading ? 'pointer-events-none opacity-50' : ''}`}
              >
                Forgot your password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`mt-4 py-2 rounded-lg transition duration-200 ${
                loading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700'
              } text-white`}
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            <div className="text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/sign-up"
                className={`text-blue-600 font-medium hover:underline ${loading ? 'pointer-events-none opacity-50' : ''}`}
              >
                Sign Up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;