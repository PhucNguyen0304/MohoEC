import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser,faChevronDown,faMessage, faNewspaper } from "@fortawesome/free-solid-svg-icons";
const SideBar = () => {
  const [showSideBar,setShowSideBar] = useState(true)
  return (
    <div className='w-full flex flex-col gap-4'>
        <div >
            <div>
                <div onClick={()=>(setShowSideBar(!showSideBar))} className='flex items-center justify-center gap-4 border  border-slate-300 text-xl font-medium text-gray-700 px-4'>
                      <FontAwesomeIcon icon={faChevronDown} className={`${showSideBar?'hidden':''}`}/>    
                      <FontAwesomeIcon icon={faChevronDown} className={`rotate-180 ${showSideBar?'':'hidden'}`} />       
                </div>
            </div>
            <div></div>
        </div>
        <div className={`w-full flex flex-col gap-4 overflow-hidden transition-all duration-1000 ${showSideBar ? 'max-h-screen':'max-h-0'} lg:max-h-screen`}>
            <NavLink to='/addproduct'>
                <div onClick={()=>setShowSideBar(!showSideBar)} className='flex items-center gap-4 border border-slate-300  py-4 text-xl font-medium text-gray-700 px-4'>
                    <img src={assets.addIcon} alt="" />
                    <p>Thêm Sản Phẩm</p>
                </div>
            </NavLink>
            <NavLink to='/listproduct'>
                <div onClick={()=>setShowSideBar(!showSideBar)} className='flex items-center gap-4 border border-slate-300  py-4 text-xl font-medium text-gray-700 px-4'>
                    <img src={assets.order_icon} alt="" />
                    <p>Danh Sách Sản Phẩm</p>
                </div>
            </NavLink>
            <NavLink to='/listuser'>
                <div onClick={()=>setShowSideBar(!showSideBar)} className='flex items-center gap-4 border border-slate-300  py-4 text-xl font-medium text-gray-700 px-4'>
                    <FontAwesomeIcon className='w-[27px]' icon={faUser} />   
                    <p>Danh Sách Tài Khoản</p>
                </div>
            </NavLink>
            <NavLink to='/listpurchase'>
                <div onClick={()=>setShowSideBar(!showSideBar)} className='flex items-center gap-4 border border-slate-300  py-4 text-xl font-medium text-gray-700 px-4'>
                    <img src={assets.order_icon} alt="" />
                    <p>Danh Sách Đơn Hàng</p>
                </div>
            </NavLink>
            <NavLink to='/messages'>
                <div onClick={()=>setShowSideBar(!showSideBar)} className='flex items-center gap-4 border border-slate-300  py-4 text-xl font-medium text-gray-700 px-4'>
                    <FontAwesomeIcon className='' icon={faMessage} bounce style={{color: "#374151",}} />
                    <p>TIN NHẮN</p>
                </div>
            </NavLink>
            <NavLink to='/article'>
                <div onClick={()=>setShowSideBar(!showSideBar)} className='flex items-center gap-4 border border-slate-300  py-4 text-xl font-medium text-gray-700 px-4'>
                <FontAwesomeIcon icon={faNewspaper} bounce />
                    <p>BÀI VIẾT</p>
                </div>
            </NavLink>
            
        </div>
    </div>
  )
}
export default SideBar
