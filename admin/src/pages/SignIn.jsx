import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import { ShopContext } from "../context/ShopContext.jsx";
import {backendUrl} from '../App.jsx'
import { toast } from "react-toastify";
const SignIn = ({setToken}) => {
  const navigate = useNavigate()
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const onSubmitHandler = async(e)=> { 
    try {
      e.preventDefault();
      const response = await axios.post(backendUrl + '/api/user/admin',{email,password})
    if(response.data.success) {
      console.log(response.data.token)
      setToken(response.data.token)
      toast.success("Log in Successfull")
      navigate('/')

    } else {
      toast.error(response.data.message)
    }
    } catch(error) {
      console.log(error)
    }
  }
  return (
    <div className="absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Welcome Back ADMIN</h2>

        <form className="space-y-4" action="" onSubmit={onSubmitHandler}>
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
            <label className="block text-gray-700 font-medium">Password</label>
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
            Sign In
          </button>
        </form>

        
      </div>
    </div>
  );
};

export default SignIn;
