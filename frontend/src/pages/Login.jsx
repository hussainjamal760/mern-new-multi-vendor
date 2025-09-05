import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import axios from "axios";
import { server } from "../server";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post(
        `${server}/user/login-user`,
        {
          email,
          password,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success("Login Success!");
        navigate("/");
        window.location.reload(true); 
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

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
                className="border rounded-lg px-3 py-2 focus:outline-none "
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
                className="border rounded-lg px-3 py-2 focus:outline-none pr-10"
              />
              {visible ? (
                <IoIosEye
                  className="absolute right-3 top-9 cursor-pointer text-gray-700"
                  onClick={() => setVisible(false)}
                />
              ) : (
                <IoIosEyeOff
                  className="absolute right-3 top-9 cursor-pointer text-gray-700"
                  onClick={() => setVisible(true)}
                />
              )}
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="remember-me"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="font-medium text-gray-700"
                >
                  Remember me
                </label>
              </div>
              <Link
                to="/forgot-password"
                className="text-blue-600 hover:underline"
              >
                Forgot your password?
              </Link>
            </div>

            <button
              type="submit"
              className="mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
            >
              Login
            </button>

            <div className="text-center text-sm text-gray-600">
              Don’t have an account?{" "}
              <Link
                to="/sign-up"
                className="text-blue-600 font-medium hover:underline"
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