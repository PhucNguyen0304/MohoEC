import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContextProvider.jsx';

const Filter = ({page}) => {
    const [selectedOption, setSelectedOption] = useState("new");
    const [showCategory,setShowCategory] = useState(false)
    const [showFilterPrice,setShowFilterPrice] = useState(false)
    const [showColors,setShowColors] = useState(false)
    const {products,sortType,setSortType,filterProducts,setFilterProducts,search,setSearch} = useContext(ShopContext)
    const [category,setCategory] = useState([])
    const [subCategory,setSubCategory] = useState([])
    const [sortPrice,setSortPrice] = useState([])
    const [listColors,setListColors] = useState([])
    
    const categoryAll = [
        {id:1,value:"bedroom",type:"Tổng Hợp Nội Thất Phòng Ngủ"}, 
        {id:2,value:"wardrobe",type:"Phòng ngủ: Tủ gỗ"},
        {id:3,value:"bed",type:"Phòng ngủ: Giường"},
        {id:4,value:"combo",type:"Phòng ngủ: Combo"},
        {id:5,value:"dinningroom",type:"Tổng Hợp Nội Thất Phòng Ăn"},
        {id:6,value:"combo",type:"Phòng Ăn:Combo"},
        {id:7,value:"table",type:"Phòng Ăn:Bàn"},
        {id:8,value:"office",type:"Tổng Hợp Nội Thất Văn Phòng"},
        {id:9,value:"shelf",type:"Văn Phòng: Kệ"},
        {id:10,value:"table",type:"Văn Phòng: Bàn"},
        {id:11,value:"chair",type:"Văn Phòng: Ghế"},
    ]
    const categoryBedroom = [
        {id:1,value:"wardrobe",type:"Phòng ngủ: Tủ gỗ"},
        {id:2,value:"bed",type:"Phòng ngủ: Giường"},
        {id:3,value:"combo",type:"Phòng ngủ: Combo"},
    ]
    const categoryDinningroom = [
        {id:1,value:"combo",type:"Phòng Ăn:Combo"},
        {id:2,value:"table",type:"Phòng Ăn:Bàn"},
    ]
    const categoryOffice = [
        {id:1,value:"shelf",type:"Văn Phòng: Kệ"},
        {id:2,value:"table",type:"Văn Phòng: Bàn"},
        {id:3,value:"chair",type:"Văn Phòng: Ghế"},
    ]
    const filterPrice = [
        {idPrice:"1price",type:"Dưới 500.000đ"}, 
        {idPrice:"2price",type:"500.000đ - 1.000.000đ"},
        {idPrice:"3price",type:"1.000.000đ - 2.500.000đ "},
        {idPrice:"4price",type:"2.500.000đ - 5.000.000đ"},
        {idPrice:"5price",type:"Trên 5.000.000đ"},
    ]
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
      const [activeColors,setActiveColors] = useState(Array(colors.length).fill(false))
         const toogleColors = (index)=> {
          setActiveColors((pre)=> pre.map((isActive,i)=> i === index ? !isActive : isActive))
      } 
  const tooglePrice = (id,e) => {
        console.log(id,e.target.checked)
        if(e.target.checked) {
            setSortPrice((pre)=>[...pre,id])
        } else {
            setSortPrice(sortPrice.filter((price)=>price !== id))
        }
  }
    const handelSortPrice = (filterProducts)=> {
        let filterProductsCopy = []
        sortPrice.map((item)=>{
            if(item === "1price") {
                console.log("hello 1 price")
                filterProducts.map((product)=>product.price < 500000 ? filterProductsCopy.push(product):'')
            }
            if(item === "2price") {
                filterProducts.map((product)=>product.price < 1000000 && product.price > 500000 ? filterProductsCopy.push(product):'')
            }
             if(item === "3price") {
                filterProducts.map((product)=>product.price > 1000000 && product.price < 2500000 ? filterProductsCopy.push(product):'')
            }
             if(item === "4price") {
                filterProducts.map((product)=>product.price < 5000000 && product.price > 2500000 ? filterProductsCopy.push(product):'')
            }
             if(item === "5price") {
                filterProducts.map((product)=>product.price > 5000000 ? filterProductsCopy.push(product):'')
            }
        })
            if(sortPrice.length > 0 ) {
                setFilterProducts(filterProductsCopy)
            } else { 
                setFilterProducts(filterProducts)
            }
               

    }
  const sortProduct = (productsFilter) => {
    let fpCopy = productsFilter.slice()
    switch(sortType) {
        case 'low-high':
          console.log('low-high')
          setFilterProducts(fpCopy.sort((a,b)=>( a.price- b.price)))
          break
          case 'high-low':
             console.log('high-low')
             setFilterProducts(fpCopy.sort((a,b)=>( b.price- a.price)))
             break
        case 'new':
             console.log('new')
             setFilterProducts(fpCopy.filter((product)=>product.new === true))
             break
        case 'bestSeller':
            console.log("bestSeller")
             setFilterProducts(fpCopy.filter((product)=>product.bestSeller === true))
             break
        default:
              setFilterProducts(fpCopy)
              break;
    }
}
      const toggleCategory = (id,e)=> {
            console.log(id)
            if(e.target.checked) {
                console.log('category')
                setCategory((prev)=>[...prev,e.target.value])
                console.log(category)
            } else {
                console.log('category')
                setCategory(category.filter((item)=> item !== e.target.value))
                console.log(category)

            }
      }
      const subToggleCategory = (id,e)=> {
        console.log(id)
        if(e.target.checked) {
            console.log('subcategory')
            setSubCategory((prev)=>[...prev,e.target.value])
            console.log(subCategory)

        } else {
            console.log('subcategory')
            setSubCategory(subCategory.filter((item)=> item !== e.target.value))
            console.log(subCategory)

        }
  } 
        const handelToogleColors = (nameColors) => {
            if(listColors.includes(nameColors)) {
                setListColors(listColors.filter((color)=>color !== nameColors))
            } else {
                setListColors((prev)=>[...prev,nameColors])
                console.log(listColors)
            }
        }
        const  applyFilter = () => {
            let productsCopy = products.slice()
            productsCopy = productsCopy.filter((product)=>product.name.toLowerCase().includes(search.toLowerCase()))
            if(category.length > 0) {
                console.log(category)
                productsCopy = productsCopy.filter((product)=>category.includes(product.category))
            }
            if(subCategory.length > 0) {
                console.log(subCategory)
                productsCopy = productsCopy.filter((product)=>subCategory.includes(product.subCategory))
            }
            if(listColors.length > 0) {
                console.log(listColors)
             {/** productsCopy = productsCopy.filter((product,index)=>product.color.filter((colorItem)=>listColors.includes(colorItem)))*/}   
                productsCopy = productsCopy.filter((product) =>
                    product.color.some((colorItem) => listColors.includes(colorItem))
                  );
            }
            handelSortPrice(productsCopy)
        }
useEffect(()=>
    sortProduct(filterProducts)
,[sortType])
useEffect(()=> {
    applyFilter()
},[search])
  return (
    <div className='px-5  lg:px-[7vw] py-12'>
        <div className='flex items-center justify-between'>
            {
                page === 'all'? (<h1 className='text-base lg:text-5xl text-black font-semibold'>Tất cả sản phẩm</h1>):null 
            }
            {
                page === 'bedroom'? (<h1 className='text-base lg:text-5xl text-black font-semibold'>Nội thất Phòng ngủ</h1>):null 
            }
             {
                page === 'dinningroom'? (<h1 className='text-base lg:text-5xl text-black font-semibold'>Nội thất Phòng ăn</h1>):null 
            }
            {
                page === 'office'? (<h1 className='text-base lg:text-5xl text-black font-semibold'>Nội thất văn phòng</h1>):null 
            }
            <div className='w-[160px] lg:w-[263px] lg:max-w-[280px] cursor-pointer relative '>
                
                    <div className="w-[159.5px] lg:w-full py-4 mx-auto">
                            <select  className='w-full  bg-white outline-none border py-2 border-slate-300 rounded-sm text-base text-gray-500' 
                            onChange={(e)=>{setSelectedOption(e.target.value);
                                            setSortType(e.target.value)
                            }} value={selectedOption}>
                                    <option className='cursor-pointer' value="new">Mới nhất</option>
                                    <option className='cursor-pointer' value="low-high">Giá:Tăng dần</option>
                                    <option className='cursor-pointer' value="high-low">Giá: Giảm dần</option>
                                    <option className='cursor-pointer' value="bestSeller">Bán chạy nhất</option>
                            </select>
                    </div>
            </div>
        </div>
        <div className='grid grid-cols-2 lg:grid-cols-4 gap-4 gap-y-5'>
                
                <div className='relative'>
                    <div onClick={()=>setShowCategory(!showCategory)} className='flex items-center border cursor-pointer border-slate-300 px-3 py-2 justify-between'>
                        <p className='text-base lg:text-xl text-black'>DANH MỤC</p>
                        <img className='rotate-90 w-2 lg:w-4' src={assets.dropdown_icon} alt="" />
                    </div>
                    {
                        page === 'all' && showCategory ?(  
                        <div className='absolute z-10 bg-white w-full top-[100%] border text-base text-gray-500 border-slate-300 py-2'>
                            {
                                categoryAll.map((item)=>(
                                        <div className='border-b-2 lg:border-0 flex items-center gap-3 px-3 hover:cursor-pointer hover:text-gray-800'
                                    onClick={() => document.getElementById(`${item.id}`).click()}
                                >
                                    <input id={`${item.id}`} type="checkbox"  name="" value={item.value} onChange={(e)=> {item.id === 1 || item.id === 5 || item.id === 8? toggleCategory(item.id,e) :subToggleCategory(item.id,e)}}/>
                                    <p  className='cursor-poin'>{item.type}</p>
                                </div>
                                ))
                            }
                        </div>):null
                    }
                    {
                        
                        page === 'bedroom' && showCategory ?(  
                            <div className='absolute z-10 bg-white w-full top-[100%] border text-base text-gray-500 border-slate-300 py-2'>
                                {categoryBedroom.map((item)=>(
                                   <div className='flex items-center gap-3 px-3 hover:cursor-pointer hover:text-gray-800'
                                   onClick={() => document.getElementById(`${item.id}`).click()}
                               >
                                   <input id={`${item.id}`} type="checkbox" name="" value={item.value} onChange={(e)=>subToggleCategory(item.id,e)}/>
                                   <p  className='cursor-poin'>{item.type}</p>
                               </div>
                                ))}
                            </div>):null
                    }
                     {
                        
                        page === 'dinningroom' && showCategory?(  
                            <div className='absolute z-10 bg-white w-full top-[100%] border text-base text-gray-500 border-slate-300 py-2'>
                                {categoryDinningroom.map((item)=>(
                                   <div className='flex items-center gap-3 px-3 hover:cursor-pointer hover:text-gray-800'
                                   onClick={() => document.getElementById(`${item.id}`).click()}
                               >
                                   <input id={`${item.id}`} type="checkbox" name="" value={item.value} onChange={(e)=>subToggleCategory(item.id,e)} />
                                   <p  className='cursor-poin'>{item.type}</p>
                               </div>
                                ))}
                            </div>):null
                    }
                    {
                        
                        page === 'office' && showCategory ?(  
                            <div className='absolute z-10 bg-white w-full top-[100%] border text-base text-gray-500 border-slate-300 py-2'>
                               {categoryOffice.map((item)=>(
                                   <div className='flex items-center gap-3 px-3 hover:cursor-pointer hover:text-gray-800'
                                   onClick={() => {console.log(item.id)
                                    document.getElementById(`${item.id}`).click()}
                                   }
                               >
                                   <input id={`${item.id}`} type="checkbox" name=""  value={item.value} onChange={(e)=>subToggleCategory(item.id,e)}/>
                                   <p  className='cursor-poin'>{item.type}</p>
                               </div>
                                ))}
                            </div>):null
                    }
                </div>
                <div className='relative'>
                    <div onClick={()=>setShowFilterPrice(!showFilterPrice)} className='flex items-center cursor-pointer border border-slate-300 px-3 py-2 justify-between'>
                        <p className='text-base lg:text-xl text-black'>GIÁ SẢN PHẨM</p>
                        <img className='rotate-90 w-2 lg:w-4' src={assets.dropdown_icon} alt="" />
                    </div>
                        <div className={`absolute bg-white w-full top-[100%] border text-base text-gray-500 border-slate-300 py-4 ${showFilterPrice?"":"hidden z-10"}`}>
                            {filterPrice.map((item,index)=>(
                                   <div key={index} className='flex items-center gap-3 px-3 hover:cursor-pointer hover:text-gray-800'
                                   onClick={() => {console.log(item.idPrice)
                                    document.getElementById(`${item.idPrice}`).click()}}
                               >
                                   <input id={`${item.idPrice}`} type="checkbox" onChange={(e)=>tooglePrice(item.idPrice,e)} name="" />
                                   <p  className='cursor-poin'>{item.type}</p>
                               </div>
                                ))}
                        </div>
                  
                </div>
                <div className='relative'>
                    <div onClick={()=>setShowColors(!showColors)} className='flex items-center cursor-pointer border border-slate-300 px-3 py-2 justify-between'>
                        <p className='text-base lg:text-xl text-black'>MÀU</p>
                        <img className='rotate-90 w-2 lg:w-4' src={assets.dropdown_icon} alt="" />
                    </div>
                        <div className={`absolute  bg-white w-full top-[100%] border text-base text-gray-500 border-slate-300 py-4 grid grid-cols-5 gap-y-6 ${showColors?"":"hidden"}`}>
                                {/**    {colors.map((color) => (
                                    <div
                                        onClick={()=>setColorIsActive(!colorIsActive)}
                                        key={color.name}
                                        className={ `${color.className} ${colorIsActive ?} w-[25px] h-[25px] rounded-full border border-slate-300 cursor-pointer`}
                                    ></div>
                                    ))
                                }*/}
                                {
                                    activeColors.map((isActive,index)=> (
                                        <div
                                        key = {index}
                                        onClick={()=>{
                                            toogleColors(index)
                                          handelToogleColors(colors[index].name)
                                        }}
                                        className={`${colors[index].className}  ${isActive?'scale-150 border border-slate-300':''} transition-all duration-300 w-[25px] h-[25px] rounded-full cursor-pointer`}
                                    >
                                       
                                    </div>
                                    ))
                                }
                        </div>
                  
                </div>
                <div onClick={()=>applyFilter()
                } className='flex items-center text-black  w-max border  px-2 cursor-pointer hover:scale-95 hover:bg-gray-300 hover:text-gray-700  transition-all duration-75'>
                    <img className='w-6 lg:w-8' src={assets.filter_icon} alt="" />
                    <p className='text-base lg:text-2xl'>LỌC SẢN PHẨM </p>
                </div>
        </div>
        <div>

        </div>
    </div>
  )
}

export default Filter
