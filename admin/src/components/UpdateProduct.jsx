import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'
import axios from 'axios'
import { backendUrl } from '../App'
import { use } from 'react'
const UpdateProduct = ({token}) => {
    const {productId} = useParams() 
    const [product,setProduct] = useState()

    const [image1,setImage1] = useState(false)
    const [image2,setImage2] = useState(false)
    const [image3,setImage3] = useState(false)
    const [image4,setImage4] = useState(false)
    const [name,setName] = useState("")
    const [price,setPrice] =useState('')
    const [category,setCategory] = useState('bedroom')
    const [subCategory,setSubCategory] = useState('combo')
    const [description,setDescription] = useState('')
    const [newProduct,setNewProduct] = useState(false)
    const [bestSeller,setBestSeller] = useState(false)
    const [color,setColor] = useState([])
    const getProduct = async()=> {
        try {
            const response = await axios.post(backendUrl + '/api/product/singleproduct',{productId},{headers:{token}})
            if(response.data.success) {
                setProduct(response.data.product)
            } else {
                toast.error(response.data.message)
            }
        }catch(error){
            console.log(error)
            toast.error(error.message)
        }
    }
    const toogleColors = (colorName)=> {
        if(color.includes(colorName)) {
            setColor((prev)=>prev.filter(prev != colorName))
            console.log(color)
        }
        else {
            setColor((prev)=>[...prev,colorName])
            console.log(color)
        }
    }
    const onSubmitHandler = async (e) => {
        try {
            const formData = new FormData()
            formData.append('name',name),
            formData.append('price',price),
            formData.append('category',category),
            formData.append('subCategory',subCategory),
            formData.append('description',description),
            formData.append('news',newProduct),
            formData.append('bestSeller',bestSeller),
            formData.append('color',JSON.stringify(color)),
            formData.append('id',productId),
            image1 && formData.append('image1',image1),
            image2 && formData.append('image2',image2),
            image3 && formData.append('image3',image3),
            image4 && formData.append('image4',image4)
            for (let [key, value] of formData.entries()) {
                console.log(`${key}: ${value}`);
              }
            const response = await axios.post(backendUrl + '/api/product/update',formData,{headers:{token}})
            if(response.data.success) {
                toast.success("Product Update")
                setName(''),
                setPrice(''),
                setCategory(''),
                setSubCategory(''),
                setDescription(''),
                setNewProduct(false),
                setBestSeller(false),
                setColor([]),
                setImage1(false),
                setImage2(false),
                setImage3(false),
                setImage4(false)
            }
        }catch(error) {
            console.log(error)
            toast.error(error.message)
        }
    }
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
      useEffect(()=> {
        getProduct()
      },[])
      useEffect(() => {
        if (product) {
          setName(product.name)
          setPrice(product.price)
          setCategory(product.category)
          setSubCategory(product.subCategory)
          setDescription(product.description)
          setImage1(product.image[0])
          setImage2(product.image[1])
          setImage3(product.image[2])
        setImage4(product.image[3])
            console.log(name,price,category,subCategory,description,newProduct,bestSeller,color)
        }
      },[product])
    
  return (
      <form className='flex flex-col gap-4' onSubmit={onSubmitHandler}>
          <p className='text-xl text-gray-700'>Upload Image</p>
          <div className='flex gap-4 items-center justify-start'>
              <label htmlFor = 'image1'  className='w-[80px] h-[80px]'>
                  <img className='w-full'  src={image1 instanceof File ? URL.createObjectURL(image1) : image1} alt="" />
                  <input onChange={(e)=>setImage1(e.target.files[0])} type="file" name="" id="image1" hidden/>
              </label>
              <label htmlFor = 'image2'  className='w-[80px] h-[80px]'>
                  <img className='w-full'  src={image2 instanceof File ? URL.createObjectURL(image2) : image2} alt="" />
                  <input onChange={(e)=>setImage2(e.target.files[0])} type="file" name="" id="image2" hidden/>
              </label>
              <label htmlFor = 'image3'  className='w-[80px] h-[80px]'>
                  <img className='w-full'  src={image3 instanceof File ? URL.createObjectURL(image3):image3} alt="" />
                  <input onChange={(e)=>setImage3(e.target.files[0])} type="file" name="" id="image3" hidden/>
              </label>
              <label htmlFor = 'image4'  className='w-[80px] h-[80px]'>
                  <img className='w-full'  src={image4 instanceof File ? URL.createObjectURL(image4):image4} alt="" />
                  <input onChange={(e)=>setImage4(e.target.files[0])} type="file" name="" id="image4" hidden/>
              </label>
          </div>
          <p className='text-xl text-gray-700 mt-4'>Product Name</p>
          <input onChange={(e)=>setName(e.target.value)} value={name} className='py-4 px-4 border outline-none' type="text" placeholder='Type Here' />
          <p className='text-xl text-gray-700 mt-4'>Product Decription</p>
          <textarea onChange={(e)=>setDescription(e.target.value)} value={description} name="" id="" placeholder='Write a content'></textarea>
          <div className='grid grid-cols-3 gap-8'>
                  <div className='flex flex-col gap-2'>
                      <p className='text-xl text-gray-700'>Product Category</p>
                      <select onChange={(e)=>setCategory(e.target.value)} className='border py-2 ' name="" id="">
                          <option value="bedroom">Phòng Ngủ</option>
                          <option value="dinningroom">Phòng Ăn</option>
                          <option value="office">Văn Phòng</option>
                      </select>
                  </div>
                  <div className='flex flex-col gap-2'>
                      <p className='text-xl text-gray-700'>Product SubCategory</p>
                      <select onChange={(e)=>setSubCategory(e.target.value)} className='border py-2 ' name="" id="">
                          <option value="combo">Combo</option>
                          <option value="wardrobe">Tủ Đầu Giường</option>
                          <option value="bed">Giường Ngủ</option>
                          <option value="table">Bàn</option>
                          <option value="combo">Combo</option>
                          <option value="shefl">Kệ Để Đồ</option>
                          <option value="table">Bàn Làm Việc</option>
                          <option value="chair">Ghế</option>
                      </select>
                  </div>
                  <div className='flex flex-col gap-2 '>
                      <p className='text-xl  text-gray-700'>Product Price</p>
                      <input onChange={(e)=>setPrice(e.target.value)} value={price} className='border py-2  outline-none'  type="number" name="" id="" placeholder='1000000'/>
                  </div>
              </div>
              <p className='text-xl text-gray-700'>Product Color</p>
              <div className='flex gap-4 items-center'>
                  {colors.map((color,index)=> {
                      const [stateActiveColor,setStateActiveColor] = useState(false)
                 return (
                      
                      <div onClick={()=>{
                          setStateActiveColor(!stateActiveColor)
                          toogleColors(color.name)
                      }} 
                      className={`w-[25px] h-[25px] cursor-pointer rounded-full transition-all duration-100 ${color.className} ${stateActiveColor?'scale-150':''}`}></div>
                  )             
                 }
                  )}
              </div>
              <div onClick={(e)=>document.getElementById('new').click()} className='flex items-center gap-4'>
                  <input onChange={()=>setNewProduct(!newProduct)} type="checkbox" name="" id="new" />
                  <p className='text-xl cursor-pointer text-gray-700'>Add To New Product</p>
              </div>
              <div onClick={(e)=>document.getElementById('bestSeller').click()} className='flex items-center gap-4'>
                  <input onChange={()=>setBestSeller(!bestSeller)} className='' type="checkbox" name="" id="bestSeller" />
                  <p className='text-xl cursor-pointer text-gray-700'>Add To BestSeller</p>
              </div>
              <button className='bg-black text-xl text-white cursor-pointer px-4 py-2'>UPDATE</button>
      </form>
  )
}

export default UpdateProduct
