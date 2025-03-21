import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext.jsx';
import axios from 'axios';
import { backendUrl } from '../App.jsx';
import { assets } from '../assets/assets.js';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const ListUsers = () => {
  const { users, setUsers,fetchUsers } = useContext(ShopContext);
  const [userToDelete, setUserToDelete] = useState(null);
  const [visibleNoti, setVisibleNoti] = useState(false);
  const [nameDelete,setNameDelete] = useState(null)
  const [idDelete,setIdDelete] = useState(null)
  const navigate = useNavigate()

  const deleteUser = async (id) => {
    try {
      // Add your delete user logic here
      setVisibleNoti(false);
      const response = await axios.post(backendUrl + '/api/user/delete',{id})
      if(response.data.success) {
          toast.success("Xóa thành công!!!");
          fetchUsers()
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete user");
    }
  };
  console.log()
 const preventNav = (e) => {
  e.stopPropagation();
 }
  return (
    <div>
      {visibleNoti && (
        <div className='flex absolute top-0 bottom-0 right-0 left-0 bg-black opacity-90 items-center justify-center'>
          <div className='w-full bg-white shadow-2xl bg-opacity-90 rounded-md md:w-[400px]'>
            <div className='flex justify-center items-center py-[100px] px-[50px] gap-x-4'>
              <FontAwesomeIcon icon={faBell} className="text-yellow-500 text-2xl" />
              <p className='text-2xl text-black'>Bạn Có Chắc Chắn Muốn Xóa Người Dùng <b>{nameDelete} </b> Không?</p>
            </div>
            <div className='grid grid-cols-2 border-t-current'>
              <button className='text-center py-4 font-bold text-2xl outline-none border-3 border-slate-300 hover:bg-slate-400 transition duration-300' onClick={() => setVisibleNoti(false)}>Hủy</button>
              <button className='text-center py-4 font-bold text-2xl outline-none border-3 border-slate-300 hover:bg-slate-400 transition duration-300' onClick={()=>deleteUser(idDelete)}>Xóa</button>
            </div>
          </div>
        </div>
      )}
      <div className='text-3xl font-bold my-4'>Danh Sách Người Dùng</div>
      <div className='overflow-x-auto text-lg lg:font-bold lg:text-xl w-full'>
        <table className='table-auto border border-slate-200'>
           <thead className='bg-slate-200'>
              <tr>
                  <td className='border px-2 py-2 border-gray-300  min-w-[150px] text-center'>Thứ Tự</td>
                  <td className='border px-2 py-2 border-gray-300  min-w-[150px] text-center'>Tên</td>
                  <td className='border px-2 py-2 border-gray-300  min-w-[150px] text-center'>Email</td>
                  <td className='border px-2 py-2 border-gray-300  min-w-[150px] text-center'>Thời Gian Tạo</td>
                  <td className='border px-2 py-2 border-gray-300  min-w-[150px] text-center'>Thời Gian Cập Nhật</td>
                  <td className='border px-2 py-2 border-gray-300  min-w-[150px] text-center'>Xóa</td>
              </tr>
           </thead>
           <tbody>
              {
                users.map((user,index)=>(
                  <tr className='cursor-pointer hover:bg-gray-100' onClick={()=> navigate(`/update/${user._id}`)}>
                      <td className='text-center border border-slate-200 py-4 px-3 font-normal'>{index + 1}</td>
                      <td className='text-center border border-slate-200 py-4 px-3 font-normal'>{user.name}</td>
                      <td className='text-center border border-slate-200 py-4 px-3 font-normal'>{user.email}</td>
                      <td className='text-center border border-slate-200 py-4 px-3 font-normal'>{new Date(user.createdAt).toLocaleString('vi-VN')}</td>
                      <td className='text-center border border-slate-200 py-4 px-3 font-normal'>{new Date(user.updatedAt).toLocaleString('vi-VN')}</td>
              <td onClick={(e)=>preventNav(e)} className='flex items-center justify-center'>
              <img
                    onClick={(e) => {
                      
                      setVisibleNoti(true);
                      setUserToDelete(user);
                      setNameDelete(user.name);
                      setIdDelete(user._id);
                    }}
                    className='text-center cursor-pointer'
                    src={assets.bin_icon}
                    alt="Delete"
                  />
              </td>
                  </tr>
                ))
              }            
           </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListUsers;