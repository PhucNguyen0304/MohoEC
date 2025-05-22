import React, { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from 'axios';
import { toast } from "react-toastify";
import { backendUrl } from "../App";
import { FiLock, FiRefreshCw } from "react-icons/fi";

const ResetPass = ({ setToken }) => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (password !== passwordConfirm) {
        toast.error("Nhập lại mật khẩu không chính xác");
        return;
      }
      const response = await axios.post(backendUrl + `/api/user/reset-password/${token}`, { password });
      if (response.data.success) {
        toast.success("Đặt lại mật khẩu thành công");
        navigate("/signin");
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
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6 flex items-center justify-center gap-2">
          <FiRefreshCw className="inline-block" /> Đặt Lại Mật Khẩu
        </h2>
        <form className="space-y-4" onSubmit={onSubmitHandler}>
          <div className="relative">
            <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="password"
              placeholder="Mật khẩu mới"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          <div className="relative">
            <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="password"
              placeholder="Nhập lại mật khẩu"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-purple-600 text-white py-2 rounded-lg font-semibold hover:bg-purple-700 transition"
          >
            <FiRefreshCw /> Đặt Lại Mật Khẩu
          </button>
        </form>
        <div className="mt-6 text-center">
          <span className="text-sm text-gray-700">Đã có tài khoản? </span>
          <Link to="/signin" className="text-blue-600 hover:underline font-medium text-sm">
            Đăng nhập
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPass;