import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContextProvider'
import { assets } from '../assets/assets'
import MiniCart from '../components/MiniCart'
import { useNavigate } from 'react-router-dom'
const Cart = ({cartObj,setCartObj,user}) => {

    const {totalAmount,totalProductQuanlity,saveCart} = useContext(ShopContext)
    useEffect(()=> {
      console.log("HELLO CART")
    },[])
      const navigate = useNavigate()
    
  return (
    <div className='my-24 lg:mt-[150px] px-5 lg:px-[7vw]'>
      <div className='flex flex-col gap-12 justify-center'>
        <div className='my-12 w-max mx-auto'>
            <p className='text-4xl mt-12 font-extrabold'>Giỏ Hàng Của Bạn</p>
            <hr className='w-1/2 mx-auto bg-black' />
        </div>
        <div className='flex flex-col gap-3 lg:flex-row justify-between'>
            <div className='flex flex-col gap-8'>
                <p>Có <b>{totalProductQuanlity} sản phẩm</b> trong giỏ hàng</p>
                <div>
                    <MiniCart cartObj={cartObj} setCartObj={setCartObj} user= {user}/>
                </div>
                <button onClick={()=>saveCart()} className='px-3 bg-gray-400 text-md md:text-lg text-white md:font-bold py-4 rounded-lg w-1/2 md:w-1/3'>Lưu Giỏ Hàng</button>
            </div>
            <div className='w-full lg:w-[360px] border border-slate-300 px-5 py-5 lg:h-max'>
                  <h3 className='text-base font-bold pb-5 border-b-2 border-b-slate-300 lg:text-3xl'>Thông tin đơn hàng</h3>
                  <div className='flex justify-between items-center pb-5 border-b-2 mt-8 border-b-slate-300'>
                      <p className='text-base font-bold lg:text-2xl lg:font-extrabold'>Tổng Tiền</p>
                      <p className='text-base font-bold text-orange-500 lg:text-3xl lg:font-extrabold'>{totalAmount.toLocaleString("en-US")}đ</p>
                  </div>
                  <button onClick={()=>{
                    saveCart()
                    navigate('/order')}} className='text-white w-full text-base font-bold lg:text-3xl bg-orange-600 py-4'>
                      Thanh toán
                  </button>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
