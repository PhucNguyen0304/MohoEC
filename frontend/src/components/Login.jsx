import React, { useState } from 'react';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the login logic here, e.g., make an API call
    console.log('Logging in with', email, password);
  };

  return (
    <div className="flex justify-center items-center w-[360px] bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">ĐĂNG NHẬP TÀI KHOẢN</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
              Nhập email hoặc số điện thoại
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nhập email hoặc số điện thoại"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
              Mật khẩu
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            ĐĂNG NHẬP
          </button>

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Khách hàng mới?{' '}
              <a href="#" className="text-blue-600 hover:underline">
                Tạo tài khoản
              </a>
            </p>
            <p className="text-sm text-gray-600">
              Quên mật khẩu?{' '}
              <a href="#" className="text-blue-600 hover:underline">
                Khôi phục mật khẩu
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
