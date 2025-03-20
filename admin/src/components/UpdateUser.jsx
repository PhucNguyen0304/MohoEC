import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const UpdateUser = ({ token }) => {
  const { userId } = useParams();
  const { users, setUsers } = useContext(ShopContext);
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = () => {
      const user = users.find((user) => user._id === userId);
      if (user) {
        setUser(user);
        setName(user.name);
        setEmail(user.email);
      }
    };
    fetchUser();
  }, [userId, users]);

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
        const formData = new FormData()
      formData.append('id',userId);
      formData.append('name',name);
      formData.append('email',email);

      // Log the contents of formData
      for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }
      const id = userId
      const response = await axios.post(backendUrl + '/api/user/update',{id,name,email}  , { headers: {token } });
      console.log(response.data);
      if (response.data.success) {
        console.log("update thành công");
        toast.success("Cập nhật thông tin thành công!!!");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Cập nhật thông tin thất bại!!!");
    }
  };

  return (
    <div>
      <div className='text-4xl font-bold pt-4'>Cập Nhật Thông Tin Người Dùng</div>
      <form onSubmit={onSubmitHandler} className='flex flex-col mt-6 gap-y-2 w-full md:w-3/4 lg:w-1/2'>
        <label className='text-lg'>Tên</label>
        <input
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
          className='p-2 border border-gray-300 rounded outline-none'
        />
        <label className='text-lg'>Email</label>
        <input
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='p-2 border border-gray-300 rounded outline-none'
        />
        
        <button type='submit' className='mt-4 p-2 bg-slate-600 hover:bg-slate-400 transition duration-150 text-white rounded'>Cập Nhật</button>
      </form>
    </div>
  );
};

export default UpdateUser;