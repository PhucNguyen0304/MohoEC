import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { ShopContext } from '../context/ShopContextProvider';
import { useNavigate } from 'react-router-dom';
import { backendUrl } from '../App';
const Order = ({user}) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [numberPhone, setNumberPhone] = useState('');
  const [note,setNote] = useState('')
  const [amount, setAmount] = useState('');
  const [paymentMethod,setPaymentMethod] = useState('')
  const {cartData,totalAmount,inforPay,setInforPay,sendRequest,isPurchaseSent, setIsPurchaseSent} = useContext(ShopContext)
  const navigate = useNavigate()
 
  const handlePayment = async () => {
    try {
      const response = await axios.post('https://mohoec.onrender.com/api/payment/momo', {
        name,
        address,
        numberPhone,
        amount
      });
      if (response.data.success) {
        window.location.href = response.data.paymentUrl; // Redirect to payment URL
      } else {
        alert('Payment initiation failed');
      }
    } catch (error) {
      console.error('Error initiating payment:', error);
      alert('Error initiating payment');
    }
  };

  return (
    <div className="container mx-auto p-4 mt-[100px] md:mt-[200px] lg:w-1/2">
      <h1 className="text-2xl font-bold mb-4 text-center md:text-4xl md:font-bold">Thông Tin Thanh Toán</h1>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Tên</label>
        <input
          type="text"
          value={user.name}
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-gray-200 px-4 py-4 border text-md md:text-2xl rounded-md  focus:outline-none"
          placeholder="Nhập tên"
          readOnly= {true}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Địa Chỉ</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full px-4 py-4 border text-md md:text-2xl rounded-md focus:ring-2 focus:ring-orange-200 focus:outline-none"
          placeholder="Nhập địa chỉ"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Số Điện Thoại</label>
        <input
          type="number"
          value={numberPhone}
          onChange={(e) => setNumberPhone(e.target.value)}
          className="w-full px-4 py-4 border text-md md:text-2xl rounded-md focus:ring-2 focus:ring-orange-200 focus:outline-none"
          placeholder="Nhập số điện thoại"
        />
      </div>
      
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Ghi Chú</label>
        <input
          type="text"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="w-full px-4 py-4 border text-md md:text-2xl rounded-md focus:ring-2 focus:ring-orange-200 focus:outline-none"
          placeholder="Nhập ghi chú"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Hình thức thanh toán</label>
        <div className="flex items-center mb-2">
          <input
            type="radio"
            id="momo"
            name="paymentMethod"
            value="momo"
            checked={paymentMethod === 'momo'}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="mr-2"
          />
          <label htmlFor="momo" className="text-gray-700 text-lg md:text-2xl">MoMo</label>
        </div>
        <div className="flex items-center">
          <input
            type="radio"
            id="vnpay"
            name="paymentMethod"
            value="vnpay"
            checked={paymentMethod === 'vnpay'}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="mr-2"
          />
          <label htmlFor="vnpay" className="text-gray-700 text-lg md:text-2xl">VNPay</label>
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Tổng tiền</label>
        <input
          type="number"
            value={totalAmount}
            onChange={(e) => setAmount(e.target.value)}
          className="w-full px-4 bg-gray-200 py-4 border text-md md:text-2xl rounded-md  focus:outline-none"
          placeholder="Tổng tiền"
          readOnly={true}
        />
      </div>
      <button
        onClick={()=>  {
          setInforPay({
          address:address,
          numberPhone:numberPhone,
          note:note,
          paymentMethod:paymentMethod
        })
          sendRequest()}}
        style={{ backgroundColor: 'rgb(39, 104, 129)' }}
        className="w-full bg-rgb(39 104 140) font-bold text-2xl py-4 text-white  rounded-md hover:bg-purple-700 transition-all duration-200 hover:scale-95"
      >
        Tiến Hành Thanh Toán
      </button>
    </div>
  );
};

export default Order;