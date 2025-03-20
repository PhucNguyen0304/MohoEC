import React from 'react'

const StatePurchase = () => {
  return (
    <div className="container mx-auto mt-[100px] p-4">
        <h2 className="text-2xl font-bold mb-4 text-center">Thông Tin Thanh Toán</h2>
        <div className="bg-white shadow-md rounded-lg p-6">
            <p className="text-lg mb-2"><strong>Trạng thái:</strong> Thành công</p>
            <p className="text-lg mb-2"><strong>Mã thanh toán:</strong> f</p>
            <p className="text-lg mb-2"><strong>Hình thức thanh toán:</strong> </p>
            <p className="text-lg mb-2"><strong>Tổng tiền:</strong> </p>
            <div className='flex justify-end'>
                <button style={{backgroundColor:'rgba(39 , 104 ,127)'}} className='py-2 md:py-4 text-lg md:text-2xl font-bold rounded-lg text-white px-4 md:px-6 transition-all duration-200 hover:scale-95'>Đơn mua</button>
            </div>
            
        </div>
  </div>
  )
}

export default StatePurchase
