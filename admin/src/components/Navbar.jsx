import React, { useEffect } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
const Navbar = ({token,setToken}) => {
  const navigate = useNavigate() 
  return (
    <div className='flex justify-between items-center border-b-2 border-slate-300 py-12'>
        <img onClick={()=>navigate('/')} className='cursor-pointer w-[120px] lg:w-[240px] ' src={assets.logo} alt="" />
        <div className='flex items-center justify-center gap-x-6'>
           {token === "" ?  null:<p className='lg:font-bold lg:text-2xl'>ADMIN</p>  }
           <button onClick={()=> {
            setToken('')
            navigate('signin')
           }} className='text-white bg-slate-500 px-4 py-2 rounded-md'>Đăng Xuất</button>

        </div>
    </div>
  )
}

export default Navbar
