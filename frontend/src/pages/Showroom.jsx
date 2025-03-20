import React from 'react'
import { assets } from '../assets/assets'

const Showroom = () => {
  return (
    <div className='flex flex-col lg:flex-row px-5 lg:px-[7vw]  lg:gap-12 items-center mt-12 py-20 justify-between'>
        <img className='w-full lg:w-[40%]' src={assets.heroShowrom_image} alt="" />
        <div className="max-w-4xl mx-auto bg-white">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Experience Stores</h2>

          {/* HCM Section */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">[Khu Vực Tp. Hồ Chí Minh]</h3>
            <p className="text-gray-600 mb-1">
              162 HT17, P. Hiệp Thành, Q. 12, TP. HCM (Nằm trong khuôn viên công ty SAVIMEX phía sau bến xe buýt Hiệp Thành)
            </p>
            <p className="text-gray-600 mb-4">Hotline: 0971 141 140</p>

            <p className="text-gray-600">
              S05.03-S18 khu The Rainbow | Vinhomes Grand Park, TP. Thủ Đức.
            </p>
            <p className="text-gray-600">Hotline: 0931 880 424</p>
          </div>

          {/* Hanoi Section */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">[Khu Vực Hà Nội]</h3>
            <p className="text-gray-600 mb-1">
              S3.03-Sh15 khu Sapphire | Vinhomes Smart City, Hà Nội.
            </p>
            <p className="text-gray-600 mb-4">Hotline: 0909 665 728</p>

            <p className="text-gray-600">
              S2.09-Sh19 khu Sapphire | Vinhomes Ocean Park, Hà Nội.
            </p>
            <p className="text-gray-600">Hotline: 0938 108 772</p>
          </div>

          {/* Long An Section */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">[Long An]</h3>
            <p className="text-gray-600 mb-4">
              COBI HOME (DV 4 - Đường Trung Tâm, KCN Long Hậu, Cần Giuộc, Long An)
            </p>
          </div>

          {/* Contact Info */}
          <div className="mb-6">
            <h4 className="text-md font-semibold text-gray-700 mb-2">Email chúng tôi</h4>
            <p className="text-blue-500 hover:underline">cskh@moho.com.vn</p>
          </div>

          <div className="mb-6">
            <h4 className="text-md font-semibold text-gray-700 mb-2">Điện thoại</h4>
            <p className="text-gray-600">097 114 1140 (Hotline/Zalo)</p>
          </div>

          {/* Working Hours */}
          <div>
            <h4 className="text-md font-semibold text-gray-700 mb-2">Thời gian làm việc</h4>
            <p className="text-gray-600">08:00 - 20:00</p>
            <p className="text-gray-600">Thứ 2 - Chủ Nhật</p>
          </div>
    </div>
    </div>
  )
}

export default Showroom
