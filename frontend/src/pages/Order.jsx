import React, { useContext, useState } from 'react';
import axios from 'axios';
import { ShopContext } from '../context/ShopContextProvider';
import { useNavigate } from 'react-router-dom';
import { backendUrl } from '../App';

const Order = ({ user }) => {
  const [address, setAddress] = useState('');
  const [numberPhone, setNumberPhone] = useState('');
  const [note, setNote] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const { totalAmount, setInforPay, sendRequest } = useContext(ShopContext);

  // Giao diện nhỏ gọn, vừa màn hình, không cần kéo
  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-80px)] pt-32 pb-8 bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-4 md:p-6">
        <h1 className="text-xl md:text-2xl font-bold mb-4 text-center">Thông Tin Thanh Toán</h1>
        <form className="space-y-3">
          <div>
            <label className="block text-gray-700 font-medium mb-1 text-sm">Tên</label>
            <input
              type="text"
              value={user.name}
              className="w-full bg-gray-100 px-3 py-2 border rounded-md text-sm"
              readOnly
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1 text-sm">Địa Chỉ</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-3 py-2 border rounded-md text-sm"
              placeholder="Nhập địa chỉ"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1 text-sm">Số Điện Thoại</label>
            <input
              type="number"
              value={numberPhone}
              onChange={(e) => setNumberPhone(e.target.value)}
              className="w-full px-3 py-2 border rounded-md text-sm"
              placeholder="Nhập số điện thoại"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1 text-sm">Ghi Chú</label>
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full px-3 py-2 border rounded-md text-sm"
              placeholder="Nhập ghi chú"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1 text-sm">Hình thức thanh toán</label>
            <div className="flex gap-4">
              <label className="flex items-center text-sm">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="momo"
                  checked={paymentMethod === 'momo'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mr-1"
                />
                MoMo
              </label>
              <label className="flex items-center text-sm">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="vnpay"
                  checked={paymentMethod === 'vnpay'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mr-1"
                />
                VNPay
              </label>
            </div>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1 text-sm">Tổng tiền</label>
            <input
              type="number"
              value={totalAmount}
              className="w-full bg-gray-100 px-3 py-2 border rounded-md text-sm"
              readOnly
            />
          </div>
          <button
            type="button"
            onClick={() => {
              setInforPay({
                address: address,
                numberPhone: numberPhone,
                note: note,
                paymentMethod: paymentMethod
              });
              sendRequest();
            }}
            className="w-full bg-blue-600 font-bold text-white py-2 rounded-md hover:bg-blue-700 transition-all duration-150 text-base mt-2"
          >
            Tiến Hành Thanh Toán
          </button>
        </form>
      </div>
    </div>
  );
};

export default Order;