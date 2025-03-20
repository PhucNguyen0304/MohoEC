import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { toast } from "react-toastify";
import { backendUrl } from "../App";
import { ShopContext } from "../context/ShopContextProvider";

const SignIn = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(backendUrl + "/api/user/login", { email, password });
      if (response.data.success) {
        toast.success("Đã đăng nhập tài khoản thành công");
        setUser(response.data.user);
        navigate('/');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const sendRequestPass = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(backendUrl + "/api/user/forget-password", { email });
      if (response.data.success) {
        toast.success("Mật Khẩu Đã Được Gửi Đến Email Của Bạn");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="absolute top-0 right-0 bottom-[-120px] left-0 z-10 flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500 overflow-hidden">
      <div className="w-[90vw] lg:w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">{isForgotPassword ? "Quên Mật Khẩu" : "Đăng Nhập"}</h2>

        {isForgotPassword ? (
          <form className="space-y-4" onSubmit={sendRequestPass}>
            <div>
              <label className="block text-gray-700 font-medium">Email</label>
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition"
            >
              Gửi Email Đặt Lại Mật Khẩu
            </button>
            <div className="mt-4 text-center">
              <button
                type="button"
                onClick={() => setIsForgotPassword(false)}
                className="text-blue-500 hover:underline"
              >
                Quay Lại Đăng Nhập
              </button>
            </div>
          </form>
        ) : (
          <form className="space-y-4" onSubmit={onSubmitHandler}>
            <div>
              <label className="block text-gray-700 font-medium">Email</label>
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Mật Khẩu</label>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition"
            >
              Đăng Nhập
            </button>
          </form>
        )}

        {!isForgotPassword && (
          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => setIsForgotPassword(true)}
              className="text-blue-500 hover:underline"
            >
              Quên Mật Khẩu?
            </button>
          </div>
        )}

        <div className="mt-4 text-center">
          <span className="text-gray-700">Chưa Có Tài Khoản </span>
          <Link to="/signup" className="text-blue-500 hover:underline">
            Đăng Kí
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;