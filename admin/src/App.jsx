import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn.jsx";
import SideBar from "./components/SideBar.jsx";
import Add from "./pages/Add.jsx";
import List from "./pages/ListProduct.jsx";
import Navbar from "./components/Navbar.jsx";
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UpdateProduct from "./components/UpdateProduct.jsx";
import ListUsers from "./pages/ListUsers.jsx";
import UpdateUser from "./components/UpdateUser.jsx";
import Purchase from "./components/Purchase.jsx";
import Test from './components/test.jsx'
import Messages from "./components/Messages.jsx";
import Article from "./pages/Article.jsx";
export const backendUrl = import.meta.env.VITE_BACKEND_URL;

const App = () => {
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    useEffect(() => {
        localStorage.setItem('token', token);
},[token]);
    useEffect(() => {
      console.log(token)
    },[token]);
    return (
        <div className='bg-white  min-h-screen px-[22px] lg:px-[7vw]'>
            <ToastContainer />
            <Routes>
                <Route path='/signin' element={<SignIn setToken={setToken} />} />
            </Routes>
            {token === '' ? <SignIn setToken={setToken} /> : (
                <>
                    <Navbar token={token} setToken={setToken}/>
                    <hr />
                    <div className='flex flex-col lg:flex-row w-full'>
                        <div className="min-w-[330px]">
                            <SideBar />
                        </div>
                        <div className='w-full lg:w-[70%] mx-auto my-i text-gray-600 text-base'>
                            <Routes>
                                <Route path='/addproduct' element={<Add token={token} />} />
                                <Route path='/listproduct' element={<List token={token} />} />
                                <Route path='/listuser' element={<ListUsers token={token} />} />
                                <Route path='/edit/:productId' element={<UpdateProduct token={token} />} />
                                <Route path='/update/:userId' element={<UpdateUser token = {token}/>}/>
                                <Route path='/listpurchase' element={<Purchase/>}/>
                                <Route path='/test' element={<Test/>}/>
                                <Route path='/messages' element={<Messages/>}/>
                                <Route path='/article' element={<Article/>}/>
                            </Routes>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default App;