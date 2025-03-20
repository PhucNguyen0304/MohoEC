import React, { useContext, useState } from 'react'
import { ShopContext } from '../context/ShopContextProvider';
import { assets } from '../assets/assets';

const ListCartItem = () => {
    const {cartData,setCartData,products,updateQuanlity,deleteProductCart} = useContext(ShopContext)
    const colors = [
        { name: "orange", className: "bg-orange-500" },
        { name: "purple", className: "bg-purple-500" },
        { name: "lime", className: "bg-lime-500" },
        { name: "red", className: "bg-red-500" }, 
        { name: "blue", className: "bg-blue-500" },
        { name: "green", className: "bg-green-500" },
        { name: "yellow", className: "bg-yellow-500" },
        { name: "pink", className: "bg-pink-500" },
        { name: "indigo", className: "bg-indigo-500" },
      ];
  return (
    <div className='w-full'>
      {
                        cartData.map((productCart,index)=> {
                          const [productCartQuanlity,setProductCartQuanlity] = useState(productCart.quanlity)
                          const productData = products.find((product)=>product._id == productCart._id);
                          let quanlity = productCart.quanlity;
                          const color = colors.find((color,index)=>color.name == productCart.color)
                          let totalPrice = quanlity * productData.price
                          return(
                            <div className='grid grid-cols-[1fr_4fr_1fr] border-b-2 border-b-slate-200'>
                                <img className='w-[70px] h-[70px] lg:w-[100px] lg:h-[100px]' src={productData.image[0]} alt="" />
                                <div className='flex flex-col gap-4 ml-8'>
                                  <p className={`text-base font-bold lg:text-3xl lg:font-bold`}>{productData.name}</p>
                                  <div className='flex gap-4'>
                                    <p className='text-xl'>Màu:</p>
                                    <div className={`w-[25px] h-[25px] rounded-full ${color.className}`}></div> 
                                  </div>
                                  <div className="flex py-3 items-center space-x-4">
                                        <button
                                                 onClick={()=>{ if(productCartQuanlity < 2) setProductCartQuanlity(1)
                                                                else {
                                                                    setProductCartQuanlity(productCartQuanlity - 1)
                                                                }
                                                                if(productCartQuanlity - 1 < 1) {
                                                                    updateQuanlity(index,1)
                                                                } else {
                                                                    updateQuanlity(index,productCartQuanlity - 1)

                                                                }
                                }}
                                            className="px-4 py-2 border rounded-lg text-xl text-gray-700 hover:bg-gray-200"
                                        >
                                            -
                                        </button>
                                        <span className="text-xl font-semibold">{productCartQuanlity}</span>
                                        <button
                                            onClick={()=>{setProductCartQuanlity(productCartQuanlity + 1)
                                                            updateQuanlity(index,productCartQuanlity + 1)
                                                            
                                            }}
                                            className="px-4 py-2 border rounded-lg text-xl text-gray-700 hover:bg-gray-200"
                                        >
                                            +
                                        </button>
                                </div>
                                </div>
                                <div className='flex flex-col justify-between items-end'>
                                  <img onClick={()=> {updateQuanlity(index,0),
                                                      deleteProductCart(productCart._id,productCart.color)
                                  }
                                    } className='w-4 cursor-pointer' src={assets.cross_icon} alt="" />
                                  <p className='text-base lg:text-3xl text-gray-700'>{totalPrice.toLocaleString("en-US")}đ</p>
                                </div>
                            </div>
                          )
                            })
      
                        }
    </div>
  )
}

export default ListCartItem
