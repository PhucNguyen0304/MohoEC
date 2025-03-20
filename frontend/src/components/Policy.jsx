import React from 'react'
import { assets } from '../assets/assets'

const Policy = () => {
  return (
    <div className='grid grid-cols-2 px-5 lg:grid-cols-4 lg:px-[7vw] py-10'>
        <div className='hover:bg-gray-100 transition-all duration-300 group border border-slate-100 py-20 flex flex-col gap-4 items-center justify-center'>
            <img className='w-20' src={assets.cart} alt="" />
            <h1 className='text-base group-hover:scale-110 transition-all duration-150 lg:text-2xl text-gray-500 font-semibold'>Giao Hàng & Lắp Đặt</h1>
            <p className='text-xl font-medium text-gray-400'>Miễn phí</p>
        </div>
        <div className='hover:bg-gray-100 transition-all duration-300 group border border-slate-100 py-20 flex flex-col gap-4 items-center justify-center'>
            <img className='w-20' src={assets.exchange} alt="" />
            <h1 className='text-base group-hover:scale-110 transition-all duration-150 lg:text-2xl text-gray-500 font-semibold'>Đổi Trả 1 - 1</h1>
            <p className='text-xl font-medium text-gray-400'>Miễn phí</p>
        </div>
        <div className='hover:bg-gray-100 transition-all duration-300 group border border-slate-100 py-20 flex flex-col gap-4 items-center justify-center'>
            <img className='w-20' src={assets.guarantee} alt="" />
            <h1 className='text-base group-hover:scale-110 transition-all duration-150 lg:text-2xl text-gray-500 font-semibold'>Bảo Hành 2 Năm</h1>
            <p className='text-xl font-medium text-gray-400'>Miễn phí</p>
        </div>
        <div className='hover:bg-gray-100 transition-all duration-300 group border border-slate-100 py-20 flex flex-col gap-4 items-center justify-center'>
            <img className='w-20' src={assets.advise} alt="" />
            <h1 className='text-base group-hover:scale-110 transition-all duration-150 lg:text-2xl text-gray-500 font-semibold'>Tư Vấn Thiết Kế</h1>
            <p className='text-xl font-medium text-gray-400'>Miễn phí</p>
        </div>
    </div>
  )
}

export default Policy
