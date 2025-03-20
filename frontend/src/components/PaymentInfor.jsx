import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { ShopContext } from '../context/ShopContextProvider';

const PaymentInfor = () => {
  const { cartData,setCartData,updateCartDB , sendPurchase,inforPay,setInforPay} = useContext(ShopContext);
  const [statePay, setStatePay] = useState({});
  useEffect(() => {
    console.log(statePay);
  }, [statePay]);
  useEffect(() => {
    console.log(inforPay.address,inforPay.numberPhone,inforPay.note,inforPay.paymentMethod);
  }, [inforPay]);
  
  useEffect(() => {
      const query = new URLSearchParams(window.location.search);
      const partnerCode = query.get('partnerCode') || '';
      const orderId = query.get ('orderId') || '';
      const amount = query.get('amount') || '';
      const resultCode = query.get('resultCode') || ""
      if(resultCode == 0){
        setStatePay({partnerCode,orderId,amount,resultCode})
      }
    }, [window.location.search]); 
    
    useEffect(() => {
      if(statePay !== null && inforPay !== null && cartData.length > 0 ) {
      console.log(statePay.orderId,statePay.amount,inforPay.address,inforPay.numberPhone,inforPay.note,inforPay.paymentMethod)
       sendPurchase(statePay.orderId,statePay.amount,inforPay.address,inforPay.numberPhone,inforPay.note,inforPay.paymentMethod)
    }
  }, [statePay,cartData,inforPay]);

  return (
    <div className="container mx-auto mt-[100px] p-4">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Thông Tin Thanh Toán</h2>
        <p className="text-lg mb-2"> Trạng thái : {statePay.resultCode == 0 ? 'Thành công': "Thất bại"} </p>
        <p className="text-lg mb-2"><strong>Mã thanh toán:</strong> {statePay.orderId}</p>
        <p className="text-lg mb-2"><strong>Hình thức thanh toán:</strong> {statePay.partnerCode}</p>
        <p className="text-lg mb-2"><strong>Tổng tiền:</strong> {statePay.amount}</p>
        <div className='flex justify-end'>
             <button style={{backgroundColor:'rgba(39 , 104 ,127)'}} className='py-2 md:py-4 text-lg md:text-2xl font-bold rounded-lg text-white px-4 md:px-6 transition-all duration-200 hover:scale-95'>Đơn mua</button>
        </div>
      </div>
    </div>
  );
};

export default PaymentInfor;