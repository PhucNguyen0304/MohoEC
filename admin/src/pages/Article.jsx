import React, { useEffect, useState,useRef} from 'react';
import { assets } from '../../../frontend/src/assets/assets';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from 'react-toastify';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { faUser,faChevronDown ,faCircleCheck,faX, faSpinner, faMarker} from "@fortawesome/free-solid-svg-icons";
import { backendUrl } from '../App';
function Article() {
  const [imageList, setImageList] = useState([]);
  const [imageUpload, setImageUpload] = useState(null);
  const [note, setNote] = useState('');
  const [imageUrl, setImageUrl] = useState(''); 
  const [isLoading, setIsLoading] = useState(false);      
  const fileInputRef = useRef(null);
  const handleCreateArticle = () => {
    window.open('http://localhost:1337/admin', '_blank');
  };
  
  // Block/unblock scroll when is loading
  useEffect(()=> {
    if(isLoading) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isLoading])


  useEffect(()=> {
    console.log(imageList)
  },[imageList])

  // Get Image
  const getImage = async() => {
   try {
    const response = await axios.get(backendUrl + '/api/article/getImg')
    if(response.data.success) {
      setImageList(response.data.images)
    }
   } catch(error) {
    console.log(error)
   }
  }


  // Upload Image
const uploadImage = async() => {
  try {
    if(!note) {
      toast.error('Vui lòng nhập ghi chú')
      return
    }  
    setIsLoading(true)
    const response = await axios.post(backendUrl + '/api/article/sendImg',{image:imageUpload,note})
  
    if(response.data.success) {
      toast.success('Ảnh đã được tải lên')
      setImageUpload(null)
      setIsLoading(false)
      getImage()
      
    } else {
      setIsLoading(false)
      toast.error('Lỗi tải ảnh')
    }
  } catch (error) {
    setIsLoading(false)
    console.log(error)
  }
}


  // Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if(!file.type.startsWith('image/')) {
      toast.error("Vui lòng chọn ảnh phù hợp")
    }
    const reader = new FileReader();
    reader.onloadend =()=> {
      setImageUpload(reader.result)
    }
    reader.readAsDataURL(file)
  }


  // Remove Image
  const removeImage = (e) => {
    e.preventDefault()
    setImageUpload(null)
    if(fileInputRef.current) {
      fileInputRef.current.value = ''
  }
  }

//Add row image

const handleAddImage = () => {
  setImageList(prev=>[{
    url:'',
    note:''
  },...prev])
}
useEffect(()=> {
    getImage()
},[])
  return (
    <div className="flex gap-5 p-5 min-h-screen bg-gray-100">
      {/* Left Column */}
      <div className={`absolute top-0 left-0 w-full h-full z-10  flex-col items-center justify-center bg-black/50  ${isLoading?'flex':'hidden'}`}>
          <FontAwesomeIcon icon={faSpinner} spinPulse className="text-white"/>
          <h2 className="text-white">Đang tải ảnh</h2>
      </div>

      {/* Right Column */}
      <div className="w-full bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-2xl font-semibold mb-6">Quản lí bài viết</h2>
        
        {/* Upload Section */}
        <div  className="mb-6 flex justify-between items-center">
          <label onClick={handleAddImage} className="cursor-pointer inline-flex items-center gap-2 bg-white border border-gray-300 py-2 px-4 rounded hover:bg-gray-50 transition-all   hover:scale-105">
            <span>📤</span>
            Thêm Ảnh
          </label>
          <Link  to='http://localhost:1337/admin/auth/login' className="cursor-pointer inline-flex items-center gap-2 bg-white border border-gray-300 py-2 px-4 rounded hover:bg-gray-100 transition-all hover:shadow-lg  hover:scale-105">
            <FontAwesomeIcon icon={faMarker} bounce />
            Tạo/Sửa Bài Viết
          </Link>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ảnh
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                 Ghi chú
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Link ảnh
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {imageList.map((image, index) => (
                <tr key={index}>
                  <td className="h-24 w-24 px-6 py-4">
                    <div className="w-24 h-24 min-w-24 min-h-24">
                       {image.url ?(
                        <img 
                        src={image.url} 
                        alt="preview" 
                        className="w-full h-full rounded"
                      />
                       ):(
                        <label className='relative' htmlFor='image'>
                            {imageUpload?(<img className='w-full h-full' src={imageUpload}/>):(<img className='w-full h-full' src={assets.uploadImg}/>)}
                           <FontAwesomeIcon onClick={(e) => removeImage(e)} className='absolute z-10 top-0 right-0 cursor-pointer' icon={faX} size="lg" style={{color: "slate-500",}}/>
                            <input
                            id='image'
                            ref={fileInputRef}
                            accept='image/*'
                            className='hidden'
                            onChange={handleImageChange}
                            type="file" name=""/>
                        </label>
                       )
                       }
                    </div>
                  </td>
                  <td className=" w-[300px] px-6 py-4 ">
                      <div className='w-[300px] min-w-[300px] '>
                      {image.note ?(image.note):(<textarea className='w-full h-full border-2 border-gray-300 outline-none rounded-md p-2'  placeholder='Nhập ghi chú' onChange={(e)=>setNote(e.target.value)}/>)}
                      </div>
                  </td>
                  <td className="w-[300px] px-6 py-4">
                    <div className="w-[300px]">
                      {image.url ? (
                        <div className="flex items-center gap-2">
                          <div className="truncate flex-1" title={image.url}>
                            {image.url}
                          </div>
                          <button 
                            onClick={() => {
                              navigator.clipboard.writeText(image.url);
                              toast.success('Đã copy')
                            }}
                            className=" text-blue-500 hover:text-blue-700"
                          >
                            📋
                          </button>
                        </div>
                      ) : (
                        <button 
                          onClick={uploadImage} 
                          className='bg-blue-500 text-white px-4 py-2 rounded-md'
                        >
                          Lưu
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {imageList.length === 0 && (
                <tr>
                  <td colSpan="3" className="px-6 py-4 text-center text-gray-500">
                    No images uploaded yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Article;
