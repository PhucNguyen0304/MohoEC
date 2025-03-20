import React, { useEffect, useState } from "react";
import { createContext } from "react";
import axios from 'axios'
import {toast} from 'react-toastify'
import { useRef } from "react";
import io from 'socket.io-client';
const socket = io("http://localhost:4000",{
    transports: ['websocket'],
    withCredentials: true,
})
export const ShopContext = createContext()
const ShopContextProvider = ({cartObj,setCartObj,user,setUser,children}) => {
    const [sortType,setSortType] = useState('')
    const [products,setProducts] = useState([])
    const [category,setCategory] = useState([])
    const [subCategory,setSubCategory] = useState([])
    const [search,setSearch] = useState('')
    const [filterProducts,setFilterProducts] = useState([])
    const [cartItems,setCartItems] = useState({})
    const [totalAmount,setTotalAmount] = useState(0)
    const [totalProductQuanlity,setTotalProductQuanlity] = useState(0)
    const [visibleInfor,setVisibleInfor] = useState(false)
    const [email,setEmail ] = useState()
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [cartData,setCartData] = useState([])
    const [purchase ,setPurchases] = useState([])
    const [ text,setText ] = useState('')
    const [ messages,setMessages ] = useState([])
    const [articles, setArticles] = useState([])
    
    useEffect(()=> {
        console.log(messages)
    },[])
     useEffect(()=> {
        socket.on("updateStatusOrder",({email})=> {
            console.log("Purchase function called" + email)
            getPurchase(email)
        })
     },[])
    const [inforPay,setInforPay] = useState(()=> {
      try {
        const storedInforPay = localStorage.getItem("inforPay")
        return storedInforPay ? JSON.parse(storedInforPay): ''
      } catch(error) {
        console.log(err)
        return ""
      }
    })
    useEffect(() => {
      if(inforPay) {
        localStorage.setItem('inforPay',JSON.stringify(inforPay))
      }
      else {
        localStorage.removeItem('inforPay')
      }
    },[inforPay])
    //get   messages
      const getMessages = async() => {
            try {
                console.log("Getmessages function called ")
                const userEmail = user.email
                console.log(userEmail)
                const response = await axios.post(backendUrl + '/api/message/get', {userEmail})
                console.log(response)
                if(response.data.success) {
                    setMessages(response.data.listMsg)
                }
            }catch(error) {
                console.log(error)
            }
        } 
    useEffect(()=> {
    if(user.email && user.name ) {
        getMessages()
    }
},[user])


    useEffect(()=> {
        console.log(messages)
    },[messages])
    const sendMessage = async(isUserSend,text,image) => {
        try {   
            console.log("send MSG calles")
            const userEmail = user.email
           const userName = user.name
           const response = await axios.post(backendUrl + '/api/message/send',{isUserSend,userEmail,userName,text,image})
           if(response.data.success) {
            console.log(response.data)
                console.log("saved msg ")
        }
        }catch(error) {
            console.log(error)
        }
    }

        //get cart first render
    const getCart = async () => {
        try {
            console.log("hello get cart" + email)
            const response = await axios.post(backendUrl + '/api/user/getsinglecart',{email})
            if(response.data.success) {
                let templateCart = []
                response.data.cart.map((item)=> {
                    products.map((product)=> {
                        if(item._id === product._id) {
                            templateCart.push({
                                _id:item._id,
                                color:item.color,
                                quanlity:item.quanlity
                            })
                        }
                    })
                })
                 setCartData(templateCart)
            }
            else {
                console.error("Can't get cart")
            }
        }catch(error) {
            console.log(error),1
            toast.error(error)
        }
    }
    useEffect(()=> {
        console.log(user)
    },[user])
    useEffect(()=> { 
        if(user) {
            setEmail(user.email)
        }
    },[user])
    //get purchase
    const getPurchase = async(emailFromAdmin) => {
        try {
            const userEmail = email ? email : emailFromAdmin
            console.log("GETPURCHASE")
            const response = await axios.post(backendUrl + "/api/purchase/get",{email: userEmail})
            if(response.data.success) {
                toast.success("get purchase success")
                console.log(response.data.purchase)
                setPurchases(response.data.purchase)
            } else {
                console.log(response.data)
            }
        }catch(error) {
            toast.error(error.message)
            console.log(error)
        }
    }
    useEffect(() => {
        if (email && products.length > 0) {
            getCart();
            getPurchase()
        }
    }, [email, products]);
        {/**()=> {
        try {
             const storedCartData = localStorage.getItem('cartData')
             console.log(JSON.parse(storedCartData))
             return storedCartData ? JSON.parse(storedCartData) : []
        } catch(error){
            console.log(error)
            return [];
        }
    })
    const [loading, setLoading] = useState(true); 
    useEffect(()=> {
        if(cartData.length > 0) {
            localStorage.setItem('cartData',JSON.stringify(cartData))
        } else {
            localStorage.removeItem('cartData')
        }
        setLoading(false);
    },[cartData])*/}
    //send request momo
        const sendRequest = async () => {
            try { 
                const headers = {
                    'Content-Type': 'application/json',
                };
                const response = await axios.post(backendUrl + '/api/payment/momo/request',{totalAmount})
                console.log(response)
               if(response.data.success) {
                window.location.href = response.data.payUrl
               }
               else {
                    console.log("wrong something")
               }
            }catch(error) {
               console.log(error)
              }
          }
    
//sendPurchase
    const sendPurchase = async(orderId,amount,address,numberPhone,note,payMethod) => {
        console.log(orderId + " " + amount + " " + address + " " + numberPhone + " " + note + " " + payMethod)
        
        console.log("Heelo sendPurchase")
        let products = cartData
        console.log(cartData)
        
        console.log(products)
        const status = "Đã thanh toán"
        const idPay = orderId
        const totalAmount = amount
        const isUserSend = 'false'
        const image = null
        const text = `Bạn đã thanh toán thành công đơn 
                    hàng ${idPay} tổng số tiền ${totalAmount} VND`
        try {
            const response = await axios.post (backendUrl + "/api/purchase/checkispurchase", { email, idPay})
            if(response.data.success) {
                const response = await axios.post(backendUrl + "/api/purchase/update",{email,products,status,idPay,totalAmount,address,numberPhone,note,payMethod})
                if(response.data.success) {
                sendMessage(isUserSend,text,image)
                toast.success("save to purchase success")
                console.log(cartData)
                setCartData([])
                console.log(cartData)
                updateCartDB()
            } else {
                console.log(response.data.message)
            }
            } else {
                console.log(response.data)
            }
        }catch(error) {
            console.log(error)
            toast.error({success:false,message:error.message})
        }
    }

    const addToCart = async (productId,color,quanlity)=> {
        if(!user) {
            toast.error("Vui lòng đăng nhập để thêm vào giỏ")
            return
        }
        if(!color) {
            toast.error("Chưa chọn màu")
            return
        }
        let cartClone = structuredClone(cartItems)
        if(cartClone[productId]) {
                cartClone[productId][color] = quanlity
                toast.success("Thêm thành công")
        } else {
            cartClone[productId] = {}
            cartClone[productId][color] = quanlity
            toast.success("Thêm thành công")
        }
        setCartItems(cartClone)
    }
    const saveCart = async() => {
        console.log("save cart")
        updateCartDB()
    }
    //cart Data
        useEffect(()=> {
           let templateData = []
           for(const items in cartItems) {
              for(const item in cartItems[items]) {
                 if(cartItems[items][item] > 0) {
                    templateData.push({
                      _id:items,
                      color:item,
                      quanlity: cartItems[items][item]
                    })
                 }
              }
           }
           console.log(templateData)
           setCartData(templateData) 
        },[cartItems])
    //updaate cart to database 
    const updateCartDB = async() => {
        try {
            console.log("hello update cart")
            let cart = cartData
            console.log(cart)
            const response = await axios.post(backendUrl + '/api/user/cart/update',{email,cart})
            if(response.data.success) {
                toast.success("UPDATE CART TO DB")
                }
            else {
                toast.error("UPDATE CART FAil")
                console.log(response.data.message)
            }
        }catch(error)  {
            console.log(error)
            toast.error(error)
        }
    }
    //get cart Amount
    const getCartAmount = ()=> {
        let totalAmount = 0
        for(const items in cartData) {
            const product = products.find((product,index)=> product._id == cartData[items]._id)
            totalAmount += product.price * cartData[items].quanlity
        }
        setTotalAmount(totalAmount)
    }
    //get Total product quanlity
    const totalQuanlity = () => {
         let totalProductQuanlity = 0
        for(const items in cartData) {
            totalProductQuanlity +=  cartData[items].quanlity
        }
        setTotalProductQuanlity(totalProductQuanlity)
    }
    const updateQuanlity = async (index,quanlity) => {
        console.log("hello update")
        let cartClone = structuredClone(cartData)
        cartClone[index].quanlity = quanlity
        setCartData(cartClone)
    }
    //delete Product cart 
    const deleteProductCart = async(id,color) => {
        let cartData = structuredClone(cartItems)
        cartData[id][color] = 0
        setCartItems(cartData)
        toast.success("Xóa sản phẩm thành công!!!")
    }
    const updateQuantity = async(itemId,size,quantity) => {

        let cartData = structuredClone(cartItems)
        cartData[itemId][size] = quantity

        setCartItems(cartData)
    }
    //get Products Data
    const getProductData =async () => {
        try {
            const response = await axios.get(backendUrl + '/api/product/list')
            if(response.data.success) {
                console.log(response.data.success)
                setProducts(response.data.products)
            }
            else {
                toast.error(response.data.message)
            }
        }catch(error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    // Get Articles
    const getArticles = async() => {
        try {
            const response = await axios.get(backendUrl + '/api/article/getarticle')
            if(response.data.success) {
                setArticles(response.data.articles)
            } else {
                console.log(response.data)
            }
        }catch(error) {
            console.log(error)
            toast.error(error.message)
        }
    }



    useEffect(()=> {
        getArticles()
    },[])
     useEffect(()=> {
         getProductData()
     },[])
    //ueseffect
    useEffect(()=> {
        totalQuanlity()
    },[cartData])
     useEffect(()=> {
        getCartAmount()
    },[cartData])
    useEffect(()=>{
        setFilterProducts(products)
    },[])
     useEffect(()=> {
        console.log(cartData)
     },[cartData])
     useEffect(()=> {
        console.log("visibleinfor " + visibleInfor)
     },[visibleInfor])
    const value = {
        products,sortType,setSortType,category,setCategory,
        subCategory,setSubCategory,search,setSearch,filterProducts,setFilterProducts,
        cartItems,setCartItems,addToCart,totalAmount,setTotalAmount,cartData,setCartData,totalAmount,
        totalProductQuanlity,setTotalProductQuanlity,updateQuanlity,deleteProductCart,user,visibleInfor,setVisibleInfor,saveCart,
        updateCartDB,sendPurchase,inforPay,setInforPay,sendRequest,purchase ,setPurchases, messages,setMessages,sendMessage,
        articles, setArticles
    }
    return (
        <ShopContext.Provider value={value}>
            {children}
        </ShopContext.Provider>
    )
}
export default ShopContextProvider