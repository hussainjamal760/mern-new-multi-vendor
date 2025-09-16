import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import axios from "axios";
import { server } from "../server";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { RxAvatar } from "react-icons/rx";

const ShopCreatePage = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [avatar, setAvatar] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const { isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password || !name || !address || !zipCode) {
      toast.error("Please fill in all fields!");
      return;
    }

    try {
      setLoading(true);
      toast.info("Creating your shop...");

      await axios.post(
        `${server}/user/login-user`,
        { email, password },
        { withCredentials: true }
      );

      toast.success("Shop created successfully 🎉");
      setTimeout(() => {
        navigate("/");
        window.location.reload(true);
      }, 1000);
    } catch (err) {
      let errorMessage = "Something went wrong.";
      if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      }
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated === true) {
      navigate("/");
    }
  });

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        {/* Title */}
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Register as a Seller
        </h1>
        <p className="text-center text-gray-500 mb-6 text-sm">
          Create your shop account to start selling with us
        </p>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Shop Name */}
          <div>
            <label htmlFor="name" className="block mb-1 font-medium text-gray-700">
              Shop Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:bg-gray-100"
              placeholder="Enter shop name"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block mb-1 font-medium text-gray-700">
              Shop Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:bg-gray-100"
              placeholder="Enter shop email"
              required
            />
          </div>

<div>
            <label htmlFor="number" className="block mb-1 font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="text"
              id="number"
              value={phoneNumber}
              onChange={(e) => setumber(e.target.value)}
              disabled={loading}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:bg-gray-100"
              placeholder="Enter shop Phone number"
              required
            />
          </div>

          {/* Address */}
          <div>
            <label htmlFor="address" className="block mb-1 font-medium text-gray-700">
              Shop Address
            </label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              disabled={loading}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:bg-gray-100"
              placeholder="Enter address"
              required
            />
          </div>

          {/* Zip Code */}
          <div>
            <label htmlFor="zip" className="block mb-1 font-medium text-gray-700">
              Zip Code
            </label>
            <input
              type="text"
              id="zip"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              disabled={loading}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:bg-gray-100"
              placeholder="Enter zip code"
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label htmlFor="password" className="block mb-1 font-medium text-gray-700">
              Password
            </label>
            <input
              type={visible ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              disabled={loading}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none pr-10 disabled:bg-gray-100"
              placeholder="Enter password"
              required
            />
            {visible ? (
              <IoIosEye
                className={`absolute right-3 top-9 text-gray-600 ${loading ? "cursor-not-allowed" : "cursor-pointer"}`}
                onClick={() => !loading && setVisible(false)}
              />
            ) : (
              <IoIosEyeOff
                className={`absolute right-3 top-9 text-gray-600 ${loading ? "cursor-not-allowed" : "cursor-pointer"}`}
                onClick={() => !loading && setVisible(true)}
              />
            )}
          </div>

          {/* Avatar Upload */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">Shop Logo</label>
            <div className="flex items-center space-x-4">
              <span className="inline-block h-12 w-12 rounded-full">
                {avatar ? (
                  <img
                    src={URL.createObjectURL(avatar)}
                    alt="avatar"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <RxAvatar className="h-12 w-12 text-gray-400" />
                )}
              </span>
              <label
                htmlFor="file-input"
                className={`px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium bg-white hover:bg-gray-50 transition cursor-pointer ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                Upload Logo
                <input
                  type="file"
                  name="avatar"
                  id="file-input"
                  accept=".jpg,.jpeg,.png"
                  onChange={handleFileInputChange}
                  disabled={loading}
                  className="sr-only"
                />
              </label>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-lg transition duration-200 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            } text-white font-medium`}
          >
            {loading ? "Creating shop..." : "Create Shop"}
          </button>

          {/* Footer */}
          <div className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/sign-up"
              className={`text-blue-600 font-medium hover:underline ${
                loading ? "pointer-events-none opacity-50" : ""
              }`}
            >
              Sign In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShopCreatePage;
