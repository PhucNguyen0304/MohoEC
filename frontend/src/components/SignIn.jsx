
/**import React, { useContext, useState } from "react";
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
                placeholder="Nhập Email"
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
                placeholder="Nhập email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Mật Khẩu</label>
              <input
                type="password"
                placeholder="Nhập mật khẩu"
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

export default SignIn; */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { backendUrl } from "../App";
import { FiMail, FiLock, FiSend } from "react-icons/fi";

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
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
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
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-400 to-purple-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 animate-fade-in">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          {isForgotPassword ? "🔐 Quên Mật Khẩu" : "👋 Đăng Nhập"}
        </h2>

        <form onSubmit={isForgotPassword ? sendRequestPass : onSubmitHandler} className="space-y-4">
          <div className="relative">
            <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Email của bạn"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {!isForgotPassword && (
            <div className="relative">
              <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Mật khẩu"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-purple-600 text-white py-2 rounded-lg font-semibold hover:bg-purple-700 transition"
          >
            {isForgotPassword ? (
              <>
                <FiSend /> Gửi Email Đặt Lại Mật Khẩu
              </>
            ) : (
              "Đăng Nhập"
            )}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={() => setIsForgotPassword(!isForgotPassword)}
            className="text-blue-500 hover:underline text-sm"
          >
            {isForgotPassword ? "← Quay lại đăng nhập" : "Quên mật khẩu?"}
          </button>
        </div>

        <div className="mt-6 text-center">
          <span className="text-sm text-gray-700">Chưa có tài khoản? </span>
          <Link to="/signup" className="text-blue-600 hover:underline font-medium text-sm">
            Đăng ký
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
