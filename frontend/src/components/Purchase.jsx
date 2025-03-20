import React, { useContext, useEffect, useState,useRef } from 'react';
import { ShopContext } from '../context/ShopContextProvider';
import { Star } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser,faChevronDown ,faCircleCheck,faX} from "@fortawesome/free-solid-svg-icons";
import { backendUrl } from '../App';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';
const Purchase = () => {
    const { purchase, products ,user } = useContext(ShopContext);
    const [rating, setRating] = useState(5);
      const [review, setReview] = useState("");
      const [ visibleReview, setVisibleReview ] = useState(false)
      const [ previewProductInfor ,setPreviewProductInfor ] = useState({})
      const [ idPay,setIdPay ] = useState('')
      const [ image, setImage ] = useState(null)
      const fileInputRef = useRef(null)
    useEffect(() => {
        console.log(products);
    }, [products]);

    const handleSendPreview = (product,idPay) => {
      setPreviewProductInfor(product);
      setIdPay(idPay)
      setVisibleReview(true);
  };

//Handle image review change
  const handleImageChange = (e)=> {
      const file = e.target.files[0];
      if(!file.type.startsWith('image/')) {
         toast.error("Vui lòng chọn hình ảnh hợp lệ")
      }
      const reader = new FileReader()
      reader.onloadend = () => {
        setImage(reader.result)
      }
      reader.readAsDataURL(file)
  }

//Handle remove image
  const removeImage = (e) => {
    e.preventDefault(); // Prevent default action
    e.stopPropagation(); // Stop event bubbling
    setImage(null)
    if(fileInputRef.current) fileInputRef.current.value = ''
  }

  // send review

  const sendReview = async() => {
        try {
            const idProduct = previewProductInfor._id
            const emailUser = user.email
            const nameUser = user.name
            const text = review
            const response = await axios.post(backendUrl + '/api/review/send', {idProduct,emailUser,nameUser,text,image})
            if(response.data.success) {
              toast.success("Đánh giá sản phẩm thành công")
              sendReviewPurchase(emailUser,idProduct)
              setVisibleReview(false)
            } else {
              toast.error("Đánh giá sản phẩm thất bại")
            }
        }catch(error) {
          console.log(error)
        }
  }

  const sendReviewPurchase = async(emailUser,idProduct) => {
    try {
      const productId = idProduct
      const email = emailUser
      const response = await axios.post(backendUrl + '/api/purchase/updatestatusreview',{email,idPay,productId})
      console.log(response.data)
    }catch(error) {
      console.log(error)
    }
  }


    useEffect(() => {
      console.log(user)
    },[user])
    useEffect(()=> {
      console.log(previewProductInfor)
    },[previewProductInfor])
    return (
        <div className="container mx-auto mt-24 md:mt-[200px] p-4">
            <h2 className='text-xl md:text-4xl font-bold mb-5 text-center'>Đơn Hàng Đã Mua</h2>
            <div className='flex flex-col items-center gap-y-6'>
                {purchase.map((items) => (
                    <div key={items._id} className='shadow-lg border p-4 rounded-lg w-full md:w-[95%] lg:w-1/2 flex flex-col gap-y-5 text-lg'>
                        <div className='flex flex-col md:flex-row justify-between  px-4'>
                            <h3 className='flex-1 text-sm md:text-xl mb-2'><b>Mã thanh toán:</b> {items.idPay}</h3>
                            <p className='flex-1 md:ml-6 text-sm md:text-lg mb-2 text-green-400'><FontAwesomeIcon icon={faCircleCheck} /> {items.status} </p>
                            <p><b className='flex-1  text-black'>{items.track}</b></p>
                        </div>
                        {/** Display product item */}
                        <div className='border-b-2 py-2 flex flex-col gap-y-6'>
                            {items.products.map((itemProduct) => {
                                let product = products.find((item) => item._id === itemProduct._id);
                                return product ? (
                                    <div key={itemProduct._id} className='flex flex-col md:flex-row  justify-between py-4 px-4 gap-3 border-b-2 border-r-2 border-l-2 border-slate-100 rounded-lg shadow-sm'>
                                        <div className='w-full md:w-1/2 flex gap-5 items-center'>
                                            <img className='w-[80px]' src={product.image[0]} alt="" />
                                            <div>
                                                <p className='text-sm md:text-lg'>{product.name}</p>
                                                <p className='text-sm md:text-lg'>Số lượng: {itemProduct.quanlity}</p>
                                                <div className={`w-6 h-6 rounded-full bg-${itemProduct.color}-500`}></div>
                                            </div>
                                        </div>
                                        <div className='text-md font-bold md:text-2xl flex items-center justify-between md:justify-end gap-4'>
                                            {itemProduct.review === 'true' ?(<button className='bg-slate-400 text-white text-sm md:text-md md:font-bold px-2 py-2 rounded-sm md:rounded-md'>Đã Đánh Giá</button>) 
                                            :(<button onClick={()=>handleSendPreview(product,items.idPay)} className='bg-orange-400 text-white text-sm md:text-lg md:font-bold px-2 py-2 rounded-sm md:rounded-md'>Đánh Giá</button>)}
                                            
                                            <p className='font-normal text-sm md:text-lg'>Thành tiền <b className='text-orange-300'>{product.price}đ</b></p>
                                        </div>
                                    </div>
                                ) : null;
                            })}
                        </div>
                        {/** Display total amount */}
                        <div className='flex justify-end items-center'>
                            <p className='text-lg md:text-xl font-bold  transform rotate-3'>Tổng tiền: <b className='font-bold text-2xl text-orange-400'> {items.totalAmount.toLocaleString('en-US')} đ</b></p>
                        </div>
                    </div>
                ))}
            </div>


            {/**--------Display review------------ */}
            <div className={`fixed transition-opacity ease-in duration-500 opacity-100 inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 ${visibleReview ? '':'hidden'}`}>
      <div className="bg-white p-6 rounded-2xl w-[500px] shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Đánh Giá Sản Phẩm</h2>
        <div className="flex items-center gap-2 mb-4">
          {previewProductInfor.image  && (<img src={previewProductInfor.image[0]} className="w-12 h-12 rounded-lg" /> )}
          
          <div>
            { previewProductInfor.name && (<p className="text-sm font-medium">{previewProductInfor.name}</p>)}
            <p className="text-xs text-gray-500">Phân loại hàng: SOCOLA Fucuco</p>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <p className="text-sm font-medium">Chất lượng sản phẩm</p>
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              onClick={() => setRating(star)}
              className={`cursor-pointer ${
                star <= rating ? "text-yellow-400" : "text-gray-300"
              }`}
            />
          ))}
          <span className="text-sm text-orange-500">Tuyệt vời</span>
        </div>

        <textarea
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
          placeholder="Bao bì/Mẫu mã: để lại đánh giá.\n\nHương vị:"
          rows="4"
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />

        <div className="flex justify-between items-center mt-4">
          <label className='relative w-[80px] h-[80px]' htmlFor="image">
          
              {image?(<img className='w-full h-full' src={image}/>):(<img className='w-full h-full' src={assets.uploadImg}/>)}
              {image && (<FontAwesomeIcon onClick={(e) => removeImage(e)} className='absolute top-0 right-0' icon={faX} size="lg" style={{color: "#2f3735",}} />)}
              <input  
              type="file" 
              id='image'
              hidden
              accept='image/*'
              ref={fileInputRef}
              onChange={handleImageChange}
              />
           </label>
          <div className="flex gap-2">
            <button onClick={()=>setVisibleReview(false)} className="bg-gray-300 px-4 py-2 rounded-lg text-sm">Trở Lại</button>
            <button onClick={()=>sendReview()} className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm">Hoàn Thành</button>
          </div>
        </div>
      </div>
    </div>
        </div>
    );
};

export default Purchase;