import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'
import GoogleMapEmbed from './GoogleMap.jsx'

const Footer = () => {
  return (
    <div className='bg-[#f8f8f8]'>
        <div className='bg-[#f8f8f8] px-5 lg:px-7 py-10 grid grid-cols-1 lg:grid-cols-3 gap-5 gap-y-12'>
            <div className='flex flex-col justify-start'>
                <h1 className='text-base lg:text-xl text-gray-800 font-medium'>NỘI THẤT MOHO</h1>
                <p className='text-base lg:text-xl text-gray-600 mt-5'>Nội Thất MOHO là thương hiệu đến từ Savimex với gần 40 năm kinh nghiệm trong việc sản xuất và xuất khẩu nội thất đạt chuẩn quốc tế.</p>
                <img className='w-[180px]' src={assets.license1} alt="" />
                <img className='w-[180px]' src={assets.license2} alt="" />

            </div>
            <div className='flex flex-col justify-start'>
                <h1 className='text-xl lg:text-2xl text-gray-800 font-medium'>DỊCH VỤ</h1>
                <div className='flex flex-col gap-3 mt-5'>
                    <Link className='text-base lg:text-xl text-gray-500' to='/'>Chính Sách Bán Hàng</Link>
                    <Link className='text-base lg:text-xl text-gray-500' to='/'>Chính Sách Giao Hàng & Lắp Đặt</Link>
                    <Link className='text-base lg:text-xl text-gray-500' to='/'>Chính Sách Bảo Hành & Bảo Trì</Link>
                    <Link className='text-base lg:text-xl text-gray-500' to='/'>Chính Sách Đổi Trả</Link>
                    <Link className='text-base lg:text-xl text-gray-500' to='/'>Chính Sách Đối Tác Bán Hàng</Link>

                </div>
            </div>
            <div className='flex flex-col justify-start'>
                <h1 className='text-xl lg:text-2xl text-gray-800 font-medium'>THÔNG TIN LIÊN HỆ</h1>
                <div className='flex mt-6'>
                        <img className='w-8 mr-5 h-9' src={assets.location_icon} alt="" />
                        <div className='flex flex-col gap-5'>
                            <h1 className='text-xl lg:text-2xl text-gray-800 font-bold '>[Khu Vực TPHCM]</h1>
                            <p  className='text-base lg:text-xl text-gray-500'>162 HT17, P. Hiệp Thành, Q. 12, TP. HCM (Nằm trong khuôn viên công ty SAVIMEX phía sau bến xe buýt Hiệp Thành)</p>
                            <p className='text-base lg:text-xl text-gray-500'>Hotline: 0971 141 140</p>
                        </div>
                </div>
            </div>
            
        </div>
        <div className='w-full mx-auto'>
            <GoogleMapEmbed/>
        </div>
        <div className='bg-black '>
            <p className='mx-auto text-center text-base text-white py-10'>Copyright © 2024 Nội Thất MOHO.</p>
        </div>
    </div>
  )
}

export default Footer 
