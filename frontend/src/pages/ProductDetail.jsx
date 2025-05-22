import React, { useContext, useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContextProvider';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';
import axios from 'axios';
import { backendUrl } from '../App';

const ProductDetail = ({user}) => {
  const { productId } = useParams();
  const { products, addToCart } = useContext(ShopContext);
  const product = products.find((product) => product._id == productId);
  const [image, setImage] = useState(product.image[0]);
  const [activeColors, setActiveColors] = useState(Array(product.color.length).fill(false));
  const [color, setColor] = useState();
  const [zoom, setZoom] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const imgRef = useRef(null);
  
//get review
const [review,setReview] = useState([])
const getReview = async() => {
  try {
    const response = await axios.get(backendUrl + `/api/review/get/${productId}`)
  if(response.data.success) {
    setReview(response.data.listReview)
  }
  else {
    console.log(response.data)
  }
  }catch(error) {
    console.log(error)
  }
}
useEffect(()=> {
  getReview()
},[productId])
useEffect(()=> {
  console.log(review)
},[review])


  useEffect(() => {
    setImage(product.image[0]);
  }, [product]);

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

  const [quanlity, setQuanlity] = useState(1);

  const increase = () => setQuanlity(quanlity + 1);
  const decrease = () => {
    if (quanlity < 2) setQuanlity(1);
    else {
      setQuanlity(quanlity - 1);
    }
  };

  // Add this component for individual review items
  const ReviewItem = ({ review }) => {
    return (
      <div className="border-b border-gray-200 py-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-gray-600 font-semibold">{review.nameUser[0]}</span>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">{review.nameUser}</h4>
            <div className="flex items-center gap-1">
              <img className='w-3' src={assets.star_icon} alt="" />
              <img className='w-3' src={assets.star_icon} alt="" />
              <img className='w-3' src={assets.star_icon} alt="" />
              <img className='w-3' src={assets.star_icon} alt="" />
              <img className='w-3' src={assets.star_icon} alt="" />
              <span className="text-xs text-gray-500 ml-2">
                {new Date(review.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
        <p className="text-gray-600 ml-13">{review.text}</p>
        {review.image && (
          <div className="mt-2 ml-13">
            <img src={review.image} alt="Review" className="w-24 h-24 object-cover rounded-lg" />
          </div>
        )}
      </div>
    );
  };

  // Add this section in your main return statement after the RelatedProducts component
  const ReviewSection = () => {
    return (
      <div className="mt-12 mb-24">
        <div className="border-t border-gray-200 pt-8">
          <h2 className="text-2xl font-bold mb-6">Đánh giá sản phẩm</h2>
          <div className="space-y-6">
            {review.length > 0 ? (
              review.map((item) => (
                <ReviewItem key={item._id} review={item} />
              ))
            ) : (
              <p className="text-gray-500 text-center py-8">Chưa có đánh giá nào</p>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Xử lý sự kiện hover để phóng to ảnh theo vị trí chuột
  const handleMouseMove = (e) => {
    const rect = imgRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
  };

  return (
    <div className='my-24 lg:mt-[180px] px-5 lg:px-[7vw]'>
      {/**container */}
      <div className='flex flex-col lg:flex-row lg:justify-between lg:items-start gap-8 bg-white rounded-2xl shadow-lg p- pt-0'>
        {/**left side */}
        <div className='flex flex-col-reverse gap-6 lg:flex-row lg:flex-1'>
          <div className='grid grid-cols-4 gap-4 lg:grid-cols-1 lg:w-32'>
            {product.image.map((src, index) => (
              <img 
                key={index} 
                className='cursor-pointer rounded-lg border-2 hover:border-blue-500 transition-all duration-200' 
                onClick={() => setImage(product.image[index])} 
                src={src} 
                alt="" 
              />
            ))}
          </div>
          <div className='w-full relative'>
            <div
              className="overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 w-full h-full"
              style={{ minHeight: 280, cursor: zoom ? "zoom-in" : "default" }}
              onMouseEnter={() => setZoom(true)}
              onMouseLeave={() => setZoom(false)}
              onMouseMove={handleMouseMove}
            >
              <img
                ref={imgRef}
                src={image}
                alt=""
                className={`w-full h-full object-contain transition-transform duration-300 ${zoom ? "scale-150" : "scale-100"}`}
                style={
                  zoom
                    ? {
                        transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                        pointerEvents: "none",
                        cursor: "zoom-in"
                      }
                    : { cursor: "default" }
                }
              />
            </div>
          </div>
        </div>

        {/**right side */}
        <div className='flex flex-col gap-6 gap-y-2 lg:flex-1 lg:pl-8'>
          <h1 className='text-2xl font-extrabold border-b-2 border-slate-100 py-2 text-gray-800'>{product.name}</h1>
          
          <div className='flex gap-3 items-center justify-start border-b-2 border-slate-100 py-2'>
            <div className='flex gap-1'>
              <img className='w-5 h-5' src={assets.star_icon} alt="" />
              <img className='w-5 h-5' src={assets.star_icon} alt="" />
              <img className='w-5 h-5' src={assets.star_icon} alt="" />
              <img className='w-5 h-5' src={assets.star_icon} alt="" />
              <img className='w-5 h-5' src={assets.star_dull_icon} alt="" />
            </div>
            <p className='text-base text-gray-400 font-medium'>(113 đánh giá)</p>
          </div>

          <div className='w-full border-b-2 border-slate-100 py-2'>
            <p className='text-4xl font-bold text-orange-500'>{product.price.toLocaleString("en-US")}đ</p>
          </div>

          <div className='border-b-2 border-slate-100 py-2'>
            <p className='text-base font-semibold mb-3'>Màu sắc:</p>
            <div className='flex gap-6 justify-start items-center'>
              {activeColors.map((isActive, index) => {
                const bgColor = colors.find((color) => color.name === product.color[index]);
                if (bgColor) {
                  return (
                    <div
                      key={index}
                      onClick={() => {
                        setColor(bgColor.name);
                      }}
                      className={`w-8 h-8 rounded-full hover:cursor-pointer ${bgColor.className} shadow-md hover:shadow-lg 
                        ${bgColor.name === color ? 'scale-125 ring-2 ring-offset-2 ring-gray-400' : ''} 
                        transition-all duration-200`}
                    >
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </div>

          <div className='py-2'>
            <p className='text-lg font-bold mb-3'>Mô tả sản phẩm</p>
            <p className='text-gray-600 leading-relaxed'>{product.description}</p>
          </div>

          <div className="flex items-center space-x-6 py-2">
            <p className='text-base font-semibold'>Số lượng:</p>
            <div className='flex items-center'>
              <button
                onClick={decrease}
                className="px-4 py-2 border rounded-l-lg text-xl text-gray-700 hover:bg-gray-100 transition-colors"
              >
                -
              </button>
              <span className="px-6 py-2 border-t border-b text-xl font-semibold bg-white">{quanlity}</span>
              <button
                onClick={increase}
                className="px-4 py-2 border rounded-r-lg text-xl text-gray-700 hover:bg-gray-100 transition-colors"
              >
                +
              </button>
            </div>
          </div>

          <button 
            onClick={() => {
              addToCart(product._id, color, quanlity);
            }} 
            className='w-full text-xl py-4 text-white font-bold bg-gradient-to-r from-blue-600 to-blue-800 
              rounded-lg shadow-lg hover:shadow-xl hover:scale-[0.98] transition-all duration-300 
              lg:max-w-[300px] mt-4'
          >
            THÊM VÀO GIỎ HÀNG
          </button>
        </div>
      </div>
       
      {/* Add the review section here */}
      <ReviewSection />
      
      <div className='flex flex-col justify-center'>
        <h1 className='text-base  py-24 lg:text-3xl lg:font-bold mx-auto'>Sản Phẩm Liên Quan</h1>
        <RelatedProducts category={product.category} subCategory={product.subCategory} />
      </div>

    </div>
  );
};

export default ProductDetail;