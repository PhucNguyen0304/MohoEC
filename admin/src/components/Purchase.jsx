import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { backendUrl } from '../App';
import { ShopContext } from '../context/ShopContext';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import io from 'socket.io-client';
import { toast } from 'react-toastify';
const socket = io('https://mohoec.onrender.com', {
  transports: ['websocket'],
  withCredentials: true,
});

const Purchase = () => { 
  const { users, setUsers, products } = useContext(ShopContext);
  const [stateOrder, setStateOrder] = useState('');
  const [searchName, setSearchName] = useState('');
  const [sortOrder, setSortOrder] = useState('none');
  const [statusFilter, setStatusFilter] = useState('all');

  const sendMessage = async(name,email,text) => {
    try {   
        const isUserSend = "false"
        const userEmail = email
       const userName = name
       const image = null
       if(!userName) {
        toast.error("Vui lòng chọn người dùng để nhắn")
        return
       }
       
       const response = await axios.post(backendUrl + '/api/message/send',{isUserSend,userEmail,userName,text,image})
       if(response.data.success) {
            console.log(response.data)
            console.log("saved msg ")
            socket.emit("updateStatusOrder",({email}))
    }
    }catch(error) {
        console.log(error)
    }
  }

  useEffect(() => {
    console.log(users);
  }, [users]);

  useEffect(() => {
    console.log(stateOrder);
  }, [stateOrder]);

  useEffect(() => {
    console.log(products);
  }, [products]);

  const handleTrack = async (name,email, idPay, track) => {
    console.log(email + idPay + track);
    try {
      const text = `Thông báo: Mã Đơn hàng ${idPay} của bạn ${track}`
      const response = await axios.post(backendUrl + '/api/purchase/sendtrack', {name, email, idPay, track });
      console.log(response.data);
      if(response.data.success) {
         sendMessage(name,email,text)
      }

      // Update the users state to reflect the changes in the UI
      setUsers(prevUsers => {
        return prevUsers.map(user => {
          if (user.email === email) {
            return {
              ...user,
              purchase: user.purchase.map(purchase => {
                if (purchase.idPay === idPay) {
                  return { ...purchase, track };
                }
                return purchase;
              })
            };
          }
          return user;
        });
      });

      // Update the stateOrder to trigger re-render
      setStateOrder(track);
    } catch (error) {
      console.log(error);
    }
  };

  const getSortedAndFilteredPurchases = () => {
    const allPurchases = users.flatMap(user => 
      user.purchase.map(purchase => ({
        ...purchase,
        userName: user.name,
        userEmail: user.email
      }))
    );

    const filteredPurchases = allPurchases.filter(purchase => {
      const nameMatch = purchase.userName.toLowerCase().includes(searchName.toLowerCase());
      const statusMatch = statusFilter === 'all' ? true : purchase.track === statusFilter;
      return nameMatch && statusMatch;
    });

    const sortedPurchases = [...filteredPurchases].sort((a, b) => {
      if (sortOrder === 'none') return 0;
      if (sortOrder === 'asc') return a.totalAmount - b.totalAmount;
      return b.totalAmount - a.totalAmount;
    });

    return sortedPurchases;
  };

  const getOrderStats = () => {
    const allPurchases = users.flatMap(user => user.purchase);
    return {
      total: allPurchases.length,
      preparing: allPurchases.filter(p => p.track === 'Đang chuẩn bị hàng').length,
      shipping: allPurchases.filter(p => p.track === 'Đang vận chuyển').length,
      completed: allPurchases.filter(p => p.track === 'Đã hoàn thành').length,
    };
  };

  return (
    <div className='mx-auto'>
      <h3 className='text-lg md:text-2xl py-4 font-bold text-center'>Danh Sách Đơn Hàng</h3>
      <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 px-4 md:px-8'>
        {Object.entries(getOrderStats()).map(([key, value]) => (
          <div key={key} className='bg-white p-4 rounded-lg shadow-md'>
            <h4 className='text-gray-600 capitalize'>{key === 'total' ? 'Tổng đơn hàng' : 
              key === 'preparing' ? 'Đang chuẩn bị' :
              key === 'shipping' ? 'Đang vận chuyển' : 'Hoàn thành'}</h4>
            <p className='text-2xl font-bold text-blue-600'>{value}</p>
          </div>
        ))}
      </div>
      <div className='flex flex-col md:flex-row gap-4 mb-6 px-4 md:px-8'>
        <div className='flex-1'>
          <input
            type="text"
            placeholder="Tìm kiếm theo tên..."
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            className='w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
        </div>
        <div className='flex items-center gap-2'>
          <label className='whitespace-nowrap'>Trạng thái:</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className='p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
          >
            <option value="all">Tất cả</option>
            <option value="Đang chuẩn bị hàng">Đang chuẩn bị hàng</option>
            <option value="Đang vận chuyển">Đang vận chuyển</option>
            <option value="Đã hoàn thành">Đã hoàn thành</option>
          </select>
        </div>
        <div className='flex items-center gap-2'>
          <label className='whitespace-nowrap'>Sắp xếp theo giá:</label>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className='p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
          >
            <option value="none">Mặc định</option>
            <option value="asc">Giá tăng dần</option>
            <option value="desc">Giá giảm dần</option>
          </select>
        </div>
      </div>
      {getSortedAndFilteredPurchases().length === 0 && (
        <div className='text-center py-8 text-gray-500'>
          Không tìm thấy đơn hàng nào
        </div>
      )}
      <div className='flex flex-col items-center gap-y-6'>
        {getSortedAndFilteredPurchases().map((item) => (
          <div key={item._id} className='shadow-lg border p-4 rounded-lg w-full md:w-[95%] lg:w-3/4 flex flex-col gap-y-5 text-lg'>
            <div className='flex flex-col md:flex-row justify-between items-start md:items-center px-4'>
              <h3 className='flex-1 text-md md:text-xl mb-2 w-auto'><b>Mã thanh toán:</b> {item.idPay}</h3>
              <p className='flex-1 md:ml-6 text-md md:text-lg mb-2 text-green-400 font-bold'>
                <FontAwesomeIcon icon={faCircleCheck} /> {item.status}
              </p>
              <select 
                name="flex-1 orderStatus" 
                className='py-2' 
                value={item.track} 
                onChange={(e) => handleTrack(item.userName, item.userEmail, item.idPay, e.target.value)}
              >
                <option value="Đang chuẩn bị hàng">Đang chuẩn bị hàng</option>
                <option value="Đang vận chuyển">Đang vận chuyển</option>
                <option value="Đã hoàn thành">Đã hoàn thành</option>
              </select>
            </div>
            <div className='border-b-2 py-2 flex flex-col gap-y-6'>
              {item.products.map((itemProduct) => {
                let product = products.find((prod) => prod._id === itemProduct._id);
                return product ? (
                  <div key={product._id} className='flex flex-col md:flex-row justify-between py-4 px-4 gap-3 border-b-2 border-r-2 border-l-2 border-slate-100 rounded-lg shadow-sm'>
                    <div className='w-full md:w-1/2 flex gap-5 items-center'>
                      <img className='w-[80px]' src={product.image[0]} alt="" />
                      <div>
                        <p className='text-sm md:text-lg'>{product.name}</p>
                        <p className='text-sm md:text-lg'>Số lượng: {itemProduct.quanlity}</p>
                        <div className={`w-6 h-6 rounded-full bg-${itemProduct.color}-500`}></div>
                      </div>
                    </div>
                    <div className='text-md font-bold md:text-2xl flex items-center justify-end gap-4'>
                      <p className='font-normal text-sm md:text-lg'>Thành tiền <b className='text-orange-300'>{product.price}đ</b></p>
                    </div>
                  </div>
                ) : null;
              })}
            </div>
            <div className='flex justify-end md:justify-between items-center'>
              <div className='flex flex-col gap-y-4 text-sm md:text-lg'>
                <p>Tên người nhận : <b>{item.userName}</b></p>
                <p>Địa chỉ : <b>{item.address}</b></p>
                <p>Số điện thoại : <b>{item.numberPhone}</b></p>
              </div>
              <p className='text-sm md:text-xl font-bold transform rotate-3'>
                Tổng tiền: <b className='font-bold text-2xl text-orange-400'> {item.totalAmount.toLocaleString('en-US')} đ</b>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Purchase;