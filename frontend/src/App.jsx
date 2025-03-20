import React, { useContext, useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero.jsx'
import { BrowserRouter, Router,Route, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Footer from './components/Footer.jsx'
import Test from './components/Test.jsx'
import Collection from './pages/Collection.jsx'
import Bedroom from './pages/Bedroom.jsx'
import Dinningroom from './pages/Dinningroom.jsx'
import Office from './pages/Office.jsx'
import Showroom from './pages/Showroom.jsx'
import ProductDetail from './pages/ProductDetail.jsx'
import GoToTopButton from './components//GoToTopButton.jsx'
import { ToastContainer, toast } from 'react-toastify';
import SignIn from './components/SignIn.jsx'
import SignUp from './components/SignUp.jsx'
import 'react-toastify/dist/ReactToastify.css';
import Cart from './pages/Cart.jsx'
import ResetPass from './components/ResetPass.jsx'
  import PaymentInfor from './components/PaymentInfor.jsx'
import Orders from './pages/Order.jsx'
import ShopContextProvider, { ShopContext } from './context/ShopContextProvider.jsx'
import Purchase from './components/Purchase.jsx'
import ChatBox from './components/ChatBox.jsx'
import io from 'socket.io-client';
import ArticleDetail from './pages/ArticleDetail.jsx'
import TestTrapi from './components/TestTrapi.jsx'
import Articles from './pages/Articles.jsx'
import axios from 'axios'

export const backendUrl = import.meta.env.VITE_BACKEND_URL;
const App = () => {
  
    const [cartObj,setCartObj] = useState([])


const [user,setUser] = useState(()=> {
  try {
    const storedUser = localStorage.getItem("user")
    return storedUser ? JSON.parse(storedUser): ''
  } catch(error) {
    console.log(err)
    return ""
  }
})
useEffect(() => {
  if(user) {
    localStorage.setItem('user',JSON.stringify(user))
  }
  else {
    localStorage.removeItem('user')
  }
},[user])
// cart current
     useEffect(()=>{
        if(user && user.cart) {
            const currentCart = user.cart.map((item)=> ({
                ...item,
                quanlity:Number(item.quanlity)
            })) 
            setCartObj(currentCart)
        }
     },[user])
useEffect(() => {
  console.log("User login: ", user);
}, [user]);
  return (
    <ShopContextProvider cartObj={cartObj} setCartObj={setCartObj} user={user} setUser={setUser}>
      <>
      <ToastContainer/>
      <Navbar user = {user} setUser = {setUser}/>
      <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/collection' element={<Collection/>}></Route>
          <Route path='/bedroom' element={<Bedroom/>}></Route>
          <Route path='/dinningroom' element={<Dinningroom/>}></Route>
          <Route path='/office' element={<Office/>}></Route>
          <Route path='/showroom' element={<Showroom/>}></Route>
          <Route path='/product/:productId' element = {<ProductDetail user={user}/>}></Route>
          <Route path='/cart' element = {<Cart cartObj={cartObj} setCartObj={setCartObj} user = {user}/>}></Route>
          <Route path='/signin' element = {<SignIn setUser = {setUser}/>} ></Route>
          <Route path='/signup' element = {<SignUp/>}></Route>
          <Route path='/resetpass/:token' element = {<ResetPass/>}></Route>
          <Route path='/order' element = {<Orders user = {user}/>}></Route>
          <Route path='/paymentinfor' element = {<PaymentInfor/>}></Route>
          <Route path='/purchase' element = {<Purchase/>}></Route>
          <Route path='/articles' element = {<Articles/>}></Route>
          <Route path='/article/:articleId' element = {<ArticleDetail/>}></Route>
      </Routes>
      <ChatBox user = {user}/>
      <GoToTopButton/>

      <Footer/>      
    </>
    </ShopContextProvider>
  )
}

export default App
