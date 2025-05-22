import React, { useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import { toast } from 'react-toastify';
import axios from 'axios';
import { backendUrl } from '../App';
import DndContext from '../components/DndContext';
import DraggableImage from '../components/DraggableImage';

const Add = ({ token }) => {
  const [images, setImages] = useState([null, null, null, null]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('bedroom');
  const [subCategory, setSubCategory] = useState('combo');
  const [description, setDescription] = useState('');
  const [newProduct, setNewProduct] = useState(false);
  const [bestSeller, setBestSeller] = useState(false);
  const [color, setColor] = useState([]);
  const [activeColors, setActiveColors] = useState({}); // State to manage active colors

  const toogleColors = (colorName) => {
    setActiveColors((prev) => ({
      ...prev,
      [colorName]: !prev[colorName],
    }));
    if (color.includes(colorName)) {
      setColor((prev) => prev.filter((prevColor) => prevColor !== colorName));
    } else {
      setColor((prev) => [...prev, colorName]);
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (color.length === 0) {
      toast.error('Vui lòng chọn màu cho sản phẩm');
      return;
    }
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('price', price);
      formData.append('category', category);
      formData.append('subCategory', subCategory);
      formData.append('description', description);
      formData.append('news', newProduct);
      formData.append('bestSeller', bestSeller);
      formData.append('color', JSON.stringify(color));
      images.forEach((image, index) => {
        if (image) {
          formData.append(`image${index + 1}`, image);
        }
      });
      console.log(formData);
      console.log(name, price, category, subCategory, description, newProduct, bestSeller, color);
      const response = await axios.post(backendUrl + '/api/product/add', formData, { headers: { token } });
      if (response.data.success) {
        toast.success('Product Added');
        setName('');
        setPrice('');
        setCategory('bedroom');
        setSubCategory('bed');
        setDescription('');
        setColor([]);
        setNewProduct(false);
        setBestSeller(false);
        setImages([null, null, null, null]);
        setActiveColors({}); // Reset active colors
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
   const moveImage = (fromIndex,toIndex) => { 
      const updatedImages = [...images]
      const [movedImage] = updatedImages.splice(fromIndex,1)
      updatedImages.splice(toIndex,0,movedImage)
      setImages(updatedImages)
   }
   
   const handleImageChange = (index,file) => {
    const updatedImages = [...images]
    updatedImages[index] = file
    setImages(updatedImages)
   }

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

  return (
    <DndContext>
      <form className='flex flex-col gap-4 text-sm' onSubmit={onSubmitHandler}>
        <p className='text-xl text-gray-700'>Tải ảnh lên</p>
        <div className='flex gap-4 items-center justify-start'>
          {images.map((image, index) => (
            <label key={index} htmlFor={`image${index + 1}`} className='w-[80px] h-[80px]'>
              <DraggableImage 
                id={`image${index + 1}`}
                src={!image ? assets.upload_icon : URL.createObjectURL(image)}
                index={index}
                moveImage={moveImage}
              />
              <input
                onChange={(e) => handleImageChange(index, e.target.files[0])}
                type='file'
                name=''
                id={`image${index + 1}`}
                hidden
              />
            </label>
          ))}
        </div>
        <p className='text-xl text-gray-700 mt-4'>Tên sản phẩn</p>
        <input onChange={(e) => setName(e.target.value)} value={name} className='py-4 px-4 border outline-none' type='text' placeholder='Type Here' />
        <p className='text-xl text-gray-700 mt-4'>Product Description</p>
        <textarea onChange={(e) => setDescription(e.target.value)} value={description} name='' id='' placeholder='Write a content'></textarea>
        <div className='grid grid-cols-3 gap-8'>
          <div className='flex flex-col gap-2'>
            <p className='text-lg lg:text-xl text-gray-700'>Danh mục sản phẩm</p>
            <select onChange={(e) => setCategory(e.target.value)} value={category} className='border py-2 category-bar' name='' id=''>
              <option value='bedroom'>Phòng Ngủ</option>
              <option value='dinningroom'>Phòng Ăn</option>
              <option value='office'>Văn Phòng</option>
            </select>
          </div>
          <div className='flex flex-col gap-2'>
            <p className='text-lg lg:text-xl text-gray-700'>Chi tiết danh mục</p>
            <select onChange={(e) => setSubCategory(e.target.value)} value={subCategory} className='border py-2 ' name='' id=''>
              <option value='combo'>Combo</option>
              <option value='wardrobe'>Tủ Đầu Giường</option>
              <option value='bed'>Giường Ngủ</option>
              <option value='table'>Bàn</option>
              <option value='combo'>Combo</option>
              <option value='shefl'>Kệ Để Đồ</option>
              <option value='table'>Bàn Làm Việc</option>
              <option value='chair'>Ghế</option>
            </select>
          </div>
          <div className='flex flex-col gap-2 '>
            <p className='text-lg lg:text-xl  text-gray-700'>Giá sản phẩm</p>
            <input onChange={(e) => setPrice(e.target.value)} value={price} className='border py-2  outline-none' type='number' name='' id='' placeholder='1000000' />
          </div>
        </div>
        <p className='text-xl text-gray-700'>Màu sản phẩm</p>
        <div className='flex gap-4 items-center'>
          {colors.map((color, index) => (
            <div
              key={index}
              onClick={() => {
                toogleColors(color.name);
              }}
              className={`w-[25px] h-[25px] cursor-pointer rounded-full transition-all duration-100 ${color.className} ${activeColors[color.name] ? 'scale-150' : ''}`}
            ></div>
          ))}
        </div>
        <div onClick={(e) => document.getElementById('new').click()} className='flex items-center gap-4'>
          <input onChange={() => setNewProduct(!newProduct)} type='checkbox' name='' id='new' checked={newProduct} />
          <p className='text-xl cursor-pointer text-gray-700'>Thêm vào mục sản phẩm mới</p>
        </div>
        <div onClick={(e) => document.getElementById('bestSeller').click()} className='flex items-center gap-4'>
          <input onChange={() => setBestSeller(!bestSeller)} className='' type='checkbox' name='' id='bestSeller' checked={bestSeller} />
          <p className='text-xl cursor-pointer text-gray-700'>Thêm vào mục sản phẩm bán chạy</p>
        </div>
        <button className='bg-black text-xl text-white cursor-pointer px-4 py-2'>Thêm Sản Phẩm</button>
      </form>
    </DndContext>
  );
};

export default Add;