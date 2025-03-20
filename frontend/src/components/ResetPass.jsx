import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import { toast } from "react-toastify";
import { backendUrl } from "../App";
import { useParams } from "react-router-dom";
const ResetPass = ({setToken}) => {
    const { token } = useParams()
  const navigate = useNavigate()
  const [password,setPassword] = useState('')
  const [passwordConfirm,setPasswordConfirm] = useState('')
  const onSubmitHandler = async(e)=> {
    e.preventDefault()
    try {   
        if(password !== passwordConfirm) {
            toast.error("Nhập lại mật khẩu không chính xác")
            return
        }
        const response = await axios.post(backendUrl + `/api/user/reset-password/${token}`,{password})
        if(response.data.success) {
            toast.success("Đặt lại mật khẩu thành công")
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
        <h2 className="text-2xl font-bold text-center mb-6">Đặt Lại Mật Khẩu</h2>

        <form className="space-y-4" action="" onSubmit={onSubmitHandler}>
          
          
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
          <div>
            <label className="block text-gray-700 font-medium">Nhập Lại Mật Khẩu</label>
            <input
              type="password"
              placeholder="Comfirm"
              value={passwordConfirm}
              onChange={(e)=>setPasswordConfirm(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition"
          >
            Đặt Lại Mật Khẩu
          </button>
        </form>
        
      </div>
    </div>
  );
};

export default ResetPass;
