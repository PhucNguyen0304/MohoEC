import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import LoginForm from './Login.jsx'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { ShopContext } from '../context/ShopContextProvider.jsx'
import InforUser from './InforUser.jsx'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee, faHome, faUser,faChevronDown,faTrash,faX } from "@fortawesome/free-solid-svg-icons";
import MiniCart from './MiniCart.jsx'
import { toast } from 'react-toastify'
import io from 'socket.io-client'
const socket = io("https://mohoec.onrender.com",{
    transports:["websocket"],
    withCredentials: true
})

const Navbar = ({user,setUser}) => {
    const [visible,setVisible] = useState(false)
    const [visibleSearch,setVisibleSearch] = useState(false)
    const {setSearch,setFilterProducts,products,totalProductQuanlity,totalAmount} = useContext(ShopContext)
    const [searchCopy,setSearchCopy] = useState('')
    const [visibleCartMini,setVisibleCartMini] = useState(false)
    const [visibleSubProfile,setVisibleSubProfile] = useState(false)
    const [ showSearchMb,setShowSearchMb ] = useState()
      const {visibleInfor,setVisibleInfor} = useContext(ShopContext)
    
    const [windowSizeIsMd,setwindowSizeIsMd] = useState(window.innerWidth > 768)
// Get history search from localStorage
const [historySearch, setHistorySearch] = useState(() => {
    try {
        const storedHistory = localStorage.getItem("searchHistory");
        return storedHistory ? JSON.parse(storedHistory) : [];
    } catch (error) {
        console.error("Error loading search history:", error);
        return [];
    }
});

// Save search history to localStorage when it changes
useEffect(() => {
    localStorage.setItem('searchHistory', JSON.stringify(historySearch));
}, [historySearch]);

//remove search history
const removeHisSearch = (item,e)=> {
    e.preventDefault()
    setHistorySearch(prev=>prev.filter((hisSearch)=>hisSearch !== item))
}

useEffect(() => {
    console.log(historySearch)
},[historySearch])

    const navigate  = useNavigate()
    const handelSearch = (item) => {
        console.log("Search item",item)
        
            // Add to history if not already present
            if (!historySearch.includes(item)) {
                setHistorySearch(prev => [item,...prev]);
            }
            setSearch(item);
            window.scrollTo({
                top: 450,
                behavior: 'smooth'  
             })
        
    }
    const handelSearchHistory = (item)=> {
        console.log("Search history",item)
        setSearch(item)
        setHistorySearch(prev=>[item, ...prev])
    }
    useEffect(()=> {
       console.log(searchCopy)
    },[searchCopy])
    const handleClick = ()=> {
        window.scrollTo({
           top: 0,
           behavior: 'smooth'  
        })
    }
    const handleClickToProduct = ()=> {
        window.scrollTo({
           top: 100,
           behavior: 'smooth'  
        })
    }
    useEffect(()=> {
        setShowSearchMb(true)
    },[user])
    //handle log out
    const handleLogOut = ()=> {
        console.log("Handle logout function called")
        setUser('')
        toast.success("Đăng xuất tài khoản thành công!!!")
    }

    // Add new state for input focus
    const [isInputFocused, setIsInputFocused] = useState(false);

  return (
    <div className='flex flex-col px-5 gap-3 pt-5 pb-5 lg:px-[7vw] fixed top-0 left-0 w-full shadow-sm bg-white z-50'>
        <InforUser user = {user} setUser={setUser}/>
        <div className='flex justify-between items-center'>
            <img onClick={()=>setVisible(true)} className='w-5 cursor-pointer lg:hidden' src={assets.menu_icon} alt="" />
                <Link onClick={handleClick} to='/'>
                    <img className='w-[105px] md:w-[181px] transform translate-x-1/4 lg:translate-x-0' src={assets.logo} alt='' />
                </Link>
            <div onFocus={() => setIsInputFocused(true)}  onBlur={() => {
                        // Small delay to allow clicking on history items
                        setTimeout(() => setIsInputFocused(false), 200);
                    }} className='w-[450px] hidden lg:flex relative items-center'>
                <input
                    onChange={(e) => setSearchCopy(e.target.value)}
                    value={searchCopy}
                    type='text'
                    className='px-2 py-3 outline-none border w-full border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 focus:ring-opacity-50 focus:shadow-lg'
                    placeholder='Tìm kiếm...'
                />
                <img
                    className='absolute right-2 w-7 cursor-pointer'
                    onClick={() => handelSearch(searchCopy)}
                    src={assets.search_icon}
                    alt=''
                />
                {/* Show history only when input is focused */}
                {isInputFocused && historySearch.length > 0 && (
                <div className='absolute top-10 left-0 w-full bg-white shadow-lg'>
                {historySearch.map((item,index)=> {
                    return (
                        <div key={index} onClick={()=>handelSearch(item)} className={`px-4 group py-2 flex justify-between items-center hover:bg-slate-100 cursor-pointer ${index > 10 ? 'hidden':''}`}>
                            <p>{item}</p>
                            <button onClick={(e)=>removeHisSearch(item,e)}>
                                    <FontAwesomeIcon icon={faX} />
                                </button>
                        </div>
                    )
                })}
            </div>
            )}
            </div>
            <div className='flex items-center gap-3 md:gap-5'>
                <img onClick={()=>setVisibleSearch(!visibleSearch)} className={`w-[24px] md:w-[32px] right-2 cursor-pointer hover:scale-90 duration-100 lg:hidden`} src={assets.search_icon} alt="" />
                <p className='hidden lg:blocktext-xl text-white font-medium px-4 py-2 shadow-lg bg-orange-400'>3D HOUSE</p>
                <div  className='relative group flex gap-4 items-center'>
                    <img onClick={()=>navigate('/signin')} className={`w-[22px] md:w-[32px] cursor-pointer ${user._id ? 'hidden':''}`} src={assets.profile_icon} alt="" />
                    <div onClick={()=> navigate('/signin')} className={`hidden cursor-pointer ${user ? '':'lg:flex'}  flex-col justify-center items-center `}>
                            <div>Đăng kí / Đăng Nhập</div>
                            <div >
                                Tài Khoản Của Tôi 
                                <FontAwesomeIcon className='ml-2' icon={faChevronDown} />
                            </div>
                    </div>
                    <div onClick={(e)=>{
                        setVisibleSubProfile(!visibleSubProfile)
                      
                    }} className={`${user._id? '':'hidden'}  md:w-auto cursor-pointer`}>
                        <p className='text-sm'>Xin Chào, <br /> <b> {user.name}</b> <FontAwesomeIcon className='ml-0 md:ml-2' icon={faChevronDown} /></p>   
                        
                        <div className= {` absolute bg-white top-[50px] w-[200px] shadow-inherit border border-slate-200 z-10 ${visibleSubProfile ? '':'hidden'}`}>
                            <ul className='flex flex-col'>
                                <li onClick={() => setVisibleInfor(true)} className='hover:bg-slate-100 px-6 py-4 font-poppins'>Xem Thông Tin</li>
                                <li onClick={()=>navigate('/purchase')} className='hover:bg-slate-100 px-6 py-4 font-poppins'>Đơn mua</li>
                                <li onClick={()=>handleLogOut() } className='hover:bg-slate-100 px-6 py-4 font-poppins'>Đăng Xuất</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className='relative' >
                    <Link onClick={()=>setVisibleCartMini(!visibleCartMini)}>
                        <p className='px-3 w-[32px] h-[32px] flex items-center justify-center  text-white leading-4 text-sm absolute mt-4 md:mt-6 ml-1 md:ml-2  font-bold bg-orange-300 rounded-full'>{totalProductQuanlity}</p>
                        <img  className='w-[22px] md:w-[32px] cursor-pointer' src={assets.cart_icon} alt="" />
                    </Link>
                    <div className={`absolute w-[100vw] right-[-22px] lg:w-[350px] px-4 py-4 shadow-slate-100 top-[100%] border lg:right-0 bg-white flex flex-col gap-4  ${visibleCartMini ? 'animate-expandMiniCart' : 'animate-collapseMiniCart'}  ${visibleCartMini ? '':'hidden'}`}>
                            <div className='py-4 border-b-2 border-slate-300 w-full'>
                                <p>Giỏ Hàng (<b>{totalProductQuanlity} sản phẩm)</b></p>
                            </div>
                            <div className='w-full'>
                                <MiniCart/>
                            </div>
                            <div className='flex justify-between items-center py-4'>
                                    <p className='text-xl text-gray-700 font-bold'>Tổng Tiền</p>
                                    <p className='text-xl font-medium text-orange-500'>{totalAmount.toLocaleString("en-US")}đ</p>
                            </div>
                            <button onClick={()=>{navigate('/cart')
                                                 setVisibleCartMini(!visibleCartMini)
                                                 handleClick()
                                                }
                            } className='text-white text-xl font-medium bg-gray-600 hover:scale-90 transition-all duration-75 hover:bg-gray-300 hover:text-black py-4 '>Xem Giỏ Hàng</button>
                    </div>
                </div>
                
            </div>
        </div>
        <div className={`w-full ${visibleSearch?'flex':"hidden"} animate-fadeInNav items-center justify-center relative mx-auto mt-10 lg:hidden `}>
            <input onChange={(e)=>setSearchCopy(e.target.value)} onFocus={()=>setIsInputFocused(true)} onBlur={()=>{ setTimeout(() => setIsInputFocused(false), 200)}} value={searchCopy} className='px-5 py-1 text-base italic w-full border border-slate-300 rounded-lg' type="text" placeholder='Tìm kiếmmm...'/>
            <img className='absolute right-2 w-5 cursor-pointer' onClick={()=>handelSearch(searchCopy)} src={assets.search_icon} alt="" />
            {isInputFocused && historySearch.length > 0 && (
                <div className='absolute top-10 left-0 w-full bg-white shadow-lg'>
                {historySearch.map((item,index)=> {
                    return (
                        <div key={index} onClick={()=>handelSearch(item)} className={`px-4 group py-2 flex justify-between items-center hover:bg-slate-100 cursor-pointer ${index > 10 ? 'hidden':''}`}>
                            <p>{item}</p>
                            <button onClick={(e)=>removeHisSearch(item,e)}>
                                    <FontAwesomeIcon icon={faX} />
                                </button>
                        </div>
                    )
                })}
            </div>
            )}
        </div>  
        <div className={` absolute h-screen full z-10 bg-black bg-opacity-50 right-0 left-0 top-0 bottom:0 ${visible?'block':'hidden'}`}>
                <div className={`max-w-[500px] h-screen bg-black bg-opacity-75 flex flex-col gap-5 pt-20  animate-fadeInNav `}>
                        <img onClick={()=>setVisible(false)} className='ml-[90%] hover:scale-125 transition-all duration-75 w-5 cursor-pointer' src={assets.cross_icon} alt="" />
                        <NavLink onClick={() => {setVisible(!visible)
                                                 handleClick()

                        }
                        } className='pl-5 border-b-2 border-slate-300 text-xl font-medium shadow-xl text-white pb-5' to='/collection'>
                            <p>Bộ Sưu Tập</p>
                        </NavLink>
                        <NavLink onClick={() => {setVisible(!visible)
                                                 handleClick()

                        }
                        } className='pl-5 border-b-2 border-slate-300 text-xl font-medium shadow-xl text-white pb-5' to='/bedroom'>
                            <p>Phòng Ngủ</p>
                        </NavLink>
                        <NavLink onClick={() => {setVisible(!visible)
                                                 handleClick()

                        }
                        } className='pl-5 border-b-2 border-slate-300 text-xl font-medium shadow-xl text-white pb-5' to='/dinningroom'>
                            <p>Phòng Ăn</p>
                        </NavLink>
                        <NavLink onClick={() => {setVisible(!visible)
                                                 handleClick()

                        }
                        } className='pl-5 border-b-2 border-slate-300 text-xl font-medium shadow-xl text-white pb-5' to='/office'>
                            <p>Văn Phòng</p>
                        </NavLink>
                        <NavLink onClick={() => {setVisible(!visible)
                                                 handleClick()

                        }
                        } className='pl-5 border-b-2 border-slate-300 text-xl font-medium shadow-xl text-white pb-5' to='/articles'>
                            <p>Bài Viết</p>
                        </NavLink>
                        <NavLink onClick={() => {setVisible(!visible)
                                                 handleClick()

                        }
                        } className='pl-5 border-b-2 border-slate-300 text-xl font-medium shadow-xl text-white pb-5' to='/showroom'>
                            <p>ShowRoom</p>
                        </NavLink>
                        
                </div>

        </div>
        <div className='hidden lg:flex pt-10  justify-start gap-x-10 items-center text-base text-gray-700 font-bold'>
                        
                        <Link onClick={handleClick} className='text-xl font-medium pb-5' to='/collection'>
                           <p onClick={()=>{setFilterProducts(products),setSearch('')}}>Bộ sưu tập</p>
                        </Link>
                        <Link onClick={handleClick} className='text-xl font-medium pb-5' to='/bedroom'>
                           <p onClick={()=>{setFilterProducts(products),setSearch('')}}>Phòng Ngủ</p>
                        </Link>
                        <Link onClick={handleClick} className='text-xl font-medium pb-5' to='/dinningroom'>
                           <p onClick={()=>{setFilterProducts(products),setSearch('')}}>Phòng Ăn</p>
                        </Link>
                        <Link onClick={handleClick} className='text-xl font-medium pb-5' to='/office'>
                           <p onClick={()=>{setFilterProducts(products),setSearch('')}}>Văn Phòng</p>
                        </Link>
                        <Link onClick={handleClick} className='text-xl font-medium pb-5' to='/articles'>
                           <p onClick={()=>{setFilterProducts(products),setSearch('')}}>Bài Viết</p>
                        </Link>
                        <Link onClick={handleClick} className='text-xl font-medium pb-5' to='/showroom'>
                           <p onClick={()=>{setFilterProducts(products),setSearch('')}}>Show Room</p>
                        </Link>

        </div>
    </div>
  )
}

export default Navbar
