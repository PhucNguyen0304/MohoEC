import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import { toast } from "react-toastify";
import { backendUrl } from "../App";
const SignUp = ({setToken}) => {
  const navigate = useNavigate()
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const onSubmitHandler = async(e)=> {
    e.preventDefault()
    try {
        const response = await axios.post(backendUrl + "/api/user/register",{name,email,password})
        if(response.data.success) {
            toast.success("Đã đăng kí tài khoản thành công")
        }
    else {
         toast.error(response.data.message)
    }
    } catch(error) {
      console.log(error)
      toast.error(error.message)
    }
  }
  return (
    <div className="absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center min-h-screen z-10 bg-gradient-to-r from-blue-500 to-purple-500">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Đăng Kí Tài Khoản</h2>

        <form className="space-y-4" action="" onSubmit={onSubmitHandler}>
            <div>
                    <label className="block text-gray-700 font-medium">Tên</label>
                    <input
                    type="text"
                    placeholder="Tên"
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none"
                    />
            </div>
          <div>
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Mật Khẩu</label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition"
          >
            Đăng Kí
          </button>
        </form>
                <div className="mt-4 text-center">
               
                </div>
                <div className="mt-4 text-center">
                <span className="text-gray-700">Đã Có Tài Khoản </span>
                <Link to="/signin" className="text-blue-500 hover:underline">
                    Đăng Nhập
                </Link>
         </div>
        
      </div>
    </div>
  );
};

export default SignUp;
