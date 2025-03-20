import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContextProvider';
import { assets } from '../assets/assets';

const MiniCart = () => {
  const { cartData, products, updateQuanlity, deleteProductCart, loading } = useContext(ShopContext);
  const colors = [
    { name: 'orange', className: 'bg-orange-500' },
    { name: 'purple', className: 'bg-purple-500' },
    { name: 'lime', className: 'bg-lime-500' },
    { name: 'red', className: 'bg-red-500' },
    { name: 'blue', className: 'bg-blue-500' },
    { name: 'green', className: 'bg-green-500' },
    { name: 'yellow', className: 'bg-yellow-500' },
    { name: 'pink', className: 'bg-pink-500' },
    { name: 'indigo', className: 'bg-indigo-500' },
  ];

  if (loading) {
    return <div>Loading...</div>; // Show loading indicator while data is being loaded
  }

  return (
    <div className='w-full'>
      {cartData.map((productCart, index) => {
        productCart.quanlity = Number(productCart.quanlity);
        let quanlity = productCart.quanlity;
        const productData = products.find((product) => product._id == productCart._id);
        const color = colors.find((color) => color.name == productCart.color);
        const totalPrice = productData.price * quanlity;

        return (
          <div key={index} className='grid grid-cols-[1fr_4fr_1fr] border-b-2 border-b-slate-200'>
            <img className='w-[70px] h-[70px] lg:w-[100px] lg:h-[100px]' src={productData.image[0]} alt='' />
            <div className='flex flex-col ml-8'>
              <p className={`text-sm font-bold lg:text-sm lg:font-bold`}>{productData.name}</p>
              <div className='flex gap-4'>
                <p className='text-sm'>Màu:</p>
                <div className={`w-[25px] h-[25px] rounded-full ${color.className}`}></div>
              </div>
              <div className='flex py-3 items-center space-x-4'>
                <button
                  onClick={() => {
                    if (quanlity < 2) {
                      quanlity = 1;
                    } else {
                      quanlity -= 1;
                    }
                    if (quanlity - 1 < 1) {
                      updateQuanlity(index, 1);
                    } else {
                      updateQuanlity(index, quanlity - 1);
                    }
                  }}
                  className='px-4 py-2 border rounded-lg text-sm text-gray-700 hover:bg-gray-200'
                >
                  -
                </button>
                <span className='text-sm font-semibold'>{quanlity}</span>
                <button
                  onClick={() => {
                    updateQuanlity(index, quanlity + 1);
                  }}
                  className='px-4 py-2 border rounded-lg text-sm text-gray-700 hover:bg-gray-200'
                >
                  +
                </button>
              </div>
            </div>
            <div className='flex flex-col justify-between items-end'>
              <img
                onClick={() => {
                  updateQuanlity(index, 0), deleteProductCart(productCart._id, productCart.color);
                }}
                className='w-4 cursor-pointer'
                src={assets.cross_icon}
                alt=''
              />
              <p className='text-sm lg:text-sm text-gray-700'>{totalPrice.toLocaleString('en-US')}đ</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MiniCart;