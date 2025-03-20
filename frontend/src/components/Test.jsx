import { useState } from "react";
import { Star } from "lucide-react";

export default function Test() {
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState("");
  const [image, setImage] = useState(null);
  const handleImageUpload = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-2xl w-[500px] shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Đánh Giá Sản Phẩm</h2>

        <div className="bg-yellow-100 text-yellow-800 p-2 rounded-lg mb-4 text-sm">
          💰 Xem Hướng dẫn đánh giá chuẩn để nhận đến <span className="font-bold">200 xu!</span>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <img src="/product-image.jpg" alt="Product" className="w-12 h-12 rounded-lg" />
          <div>
            <p className="text-sm font-medium">Lương khô đủ vị mini Fucuco</p>
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

        {image && <img src={image} alt="Preview" className="mt-2 w-full h-24 object-cover rounded-lg" />}

        <div className="flex gap-2 mt-4">
          <label className="cursor-pointer bg-red-500 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2">
            🎥 Thêm Hình Ảnh
            <input type="file" className="hidden" onChange={handleImageUpload} />
          </label>
          <button className="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2">
            🎥 Thêm Video
          </button>
        </div>

        <p className="text-xs text-gray-500 mt-2">Thêm 50 ký tự và 1 hình ảnh và 1 video để nhận <span className="text-red-500 font-bold">200 xu</span></p>

        <div className="flex justify-between items-center mt-4">
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" className="w-4 h-4" /> Hiển thị tên đăng nhập
          </label>
          <div className="flex gap-2">
            <button className="bg-gray-300 px-4 py-2 rounded-lg text-sm">Trở Lại</button>
            <button className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm">Hoàn Thành</button>
          </div>
        </div>
      </div>
    </div>
  );
}