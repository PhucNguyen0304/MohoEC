import React, { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { backendUrl } from '../App';
import { ShopContext } from '../context/ShopContextProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faUser,faXmark } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
const InforUser = ({ user, setUser,onClose }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [userInfo,setUserInfo] = useState(user)
  const [name,setName] = useState(user.name)
  const [email,setEmail] = useState(user.email)
  const {visibleInfor,setVisibleInfor} = useContext(ShopContext)
  const handleSave = async() => {
        try {
            console.log(name,email)
            const id = user._id
            const response = await axios.post(backendUrl + "/api/user/update",{id,name,email})
            if(response.data.success) {
                toast.success("Đã lưu thành công")
                setUser(response.data.message)
            }
        }catch(error) {
            console.log(error)
            
        }
};


  return  (
        <div className={` fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-20 transition-all duration-1000 ${visibleInfor? 'w-full':'w-0 opacity-0'}`}>
          <div className='bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative'>
            <button
              onClick={onClose}
              className='absolute top-2 right-2 text-gray-600 hover:text-gray-800 transition-all duration-300'
            >
               <FontAwesomeIcon onClick={()=> setVisibleInfor(false)} icon={faXmark} className='text-4xl'/>
            </button>
            <h2 className='text-2xl font-bold mb-6 text-center'>Thông Tin Tài Khoản</h2>
            <form className='space-y-4'>
              <div className='flex flex-col'>
                <label className='text-md font-semibold mb-1'>Tên:</label>
                <input
                  className={`${isEdit?'':'bg-slate-300'} outline-none px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500`}
                  value={name}
                  onChange={ (e)=> setName(e.target.value)}
                  type='text'
                  name='name'
                  id='name'
    
                  readOnly={!isEdit}
                  
                />
              </div>
              <div className='flex flex-col'>
                <label className='text-md font-semibold mb-1'>Email:</label>
                <input
                  className={`${isEdit?'':'bg-slate-300'} outline-none px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500`}
                  value={email}
                  onChange={(e)=> setEmail(e.target.value)}
    
                  type='email'
                  name='email'
                  id='email'
                  readOnly={!isEdit}
                  
                />
              </div>
              <div className='flex flex-col'>
                <label className='text-md font-semibold mb-1'>Ngày Tạo:</label>
                <input
                  className={`bg-slate-300 outline-none px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500`}
                  value={new Date(userInfo.createdAt).toLocaleString('vi-VN')}
                  type='text'
                  name='createdAt'
                  id='createdAt'
                  readOnly={true}
                  
                />
              </div>
              <div className='flex flex-col'>
                <label className='text-md font-semibold mb-1'>Thời Gian Cập Nhật:</label>
                <input
                  className={`bg-slate-300 outline-none px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500`}
                  value={new Date(userInfo.updatedAt).toLocaleString('vi-VN')}
                  type='text'
                  name='updatedAt'
                  id='updatedAt'
                  readOnly={true}
                  
                />
              </div>
              <div className='flex justify-end gap-4'>
              <button
                  type='button'
                  className='px-6 py-2 bg-gray-600 hover:bg-gray-500 transition-all duration-300 text-white rounded-lg'
                  onClick={handleSave}
                >
                  Lưu
                </button>
                <button
                  type='button'
                  className='px-6 py-2 bg-gray-600 hover:bg-gray-500 transition-all duration-300 text-white rounded-lg'
                  onClick={setIsEdit}
                >
                  Sửa
                </button>
              </div>
            </form>
          </div>
        </div>
      )
  
};

export default InforUser;