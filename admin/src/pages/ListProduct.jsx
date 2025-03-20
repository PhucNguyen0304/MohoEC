import React, { useContext, useEffect, useState } from 'react';
import { assets } from '../assets/assets.js';
import { backendUrl } from '../App.jsx';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext.jsx';

const List = ({ token }) => {
  const { products, setProducts,fetchProducts } = useContext(ShopContext);
  const navigate = useNavigate()
  
  const removeProduct = async (id) => {
    try {
      const response = await axios.post(backendUrl + '/api/product/delete', { id }, { headers: { token } });
      if (response.data.success) {
        toast.success('Product Removed');
        fetchProducts();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const colors = [
    { name: "orange", className: "bg-orange-500" },
    { name: "purple", className: "bg-purple-500" },
    { name: "lime", className: "bg-lime-500" },
    { name: "red", className: "bg-red-500" },
    { name: "blue", className: "bg-blue-500" },
    { name: "green", className: "bg-green-500" },
    { name: "yellow", className: "bg-yellow-500" },
    { name: "pink", className: "bg-pink-500" },
    { name: "indigo", className: "bg-indigo-500" },
    { name: "black", className: "bg-black" },
  ];

  return (
    <div className='overflow-x-auto w-full'>

      <p className='text-4xl font-bold my-6'>List Products</p>
      <table className='table-auto border-collapse border border-gray-300 w-full'>
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2 min-w-[150px]">Ảnh</th>
            <th className="border border-gray-300 px-4 py-2 min-w-[150px]">Tên</th>
            <th className="border border-gray-300 px-4 py-2 min-w-[150px]">Màu</th>
            <th className="border border-gray-300 px-4 py-2 min-w-[150px]">Danh Mục</th>
            <th className="border border-gray-300 px-4 py-2 min-w-[150px]">Chi Tiết Danh Mục</th>
            <th className="border border-gray-300 px-4 py-2 min-w-[150px]">Mới</th>
            <th className="border border-gray-300 px-4 py-2 min-w-[150px]">Bán Chạy</th>
            <th className="border border-gray-300 px-4 py-2 min-w-[150px]">Giá</th>
            <th className="border border-gray-300 px-4 py-2 min-w-[150px]">Xóa</th>
          </tr>
        </thead>
        <tbody>
          {
            products.map((product, index) => (
              <tr key={index} className="hover:bg-slate-200 transition-all duration-75 cursor-pointer" onClick={()=> navigate(`/edit/${product._id}`)}>
               
                <td className="border border-gray-300 px-4 py-2"><img className='w-12' src={product.image[0]} alt="" /></td>
                <td className="border border-gray-300 px-4 py-2"><p className='w-[1/2]'>{product.name}</p></td>
                <td className="border border-gray-300 px-4 py-2">
                  <div className='flex gap-3 items-center'>
                    {
                      product.color.map((color) => {
                        const bgColor = colors.find((item) => item.name === color);
                        return (
                          <div key={color} className={`w-[25px] h-[25px] rounded-full ${bgColor.className}`}>
                          </div>
                        );
                      })
                    }
                  </div>
                </td>
                <td className="border border-gray-300 px-4 py-2"><p>{product.category}</p></td>
                <td className="border border-gray-300 px-4 py-2"><p>{product.subCategory}</p></td>
                <td className="border border-gray-300 px-4 py-2"><p>{product.new === true ? 'True' : "False"}</p></td>
                <td className="border border-gray-300 px-4 py-2"><p>{product.bestSeller === true ? 'True' : "False"}</p></td>
                <td className="border border-gray-300 px-4 py-2"><p>{product.price.toLocaleString('en-US')}</p></td>
                <td className="border border-gray-300 px-4 py-2">
                  <img onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    removeProduct(product._id);
                  }} className='cursor-pointer w-6' src={assets.bin_icon} alt="" />
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
};

export default List;