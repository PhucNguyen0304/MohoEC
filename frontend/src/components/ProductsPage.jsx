import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContextProvider.jsx'
import ProductItem from './ProductItem.jsx'
const ProductsPage = ({products}) => {
  const [currentPage,setCurrentPage] = useState(1)
  const productsPerPage = 12
  const {filterProducts,setFilterProducts} = useContext(ShopContext)
  useEffect(()=> {
    setFilterProducts(products)
  },[])
  const totalPages = Math.ceil(filterProducts.length / productsPerPage )
  const currentProducts = filterProducts.slice(
    (currentPage-1) * productsPerPage,currentPage * productsPerPage
  )
  const handleToTop = ()=> {
      window.scrollTo({
        top: 0,
        behavior:"smooth"
      })
  }
  
  return (
    <div className='px-5 lg:px-[7vw]  py-10 gap-4 gap-y-5'>
        <div className='grid grid-cols-2 lg:grid-cols-4  gap-4 gap-y-9'>
            
        {
            currentProducts.map((product,index)=>(
                <ProductItem key = {index} id = {product._id} image={product.image} name = {product.name} price = {product.price} colors = {product.color}/>
            ))
        }
        </div>
        <div className='w-4/5 lg:w-max flex items-center justify-between mx-auto  py-5'>
            <button disabled={currentPage === 1} onClick={()=>setCurrentPage(currentPage - 1)} className={`outline-none px-2 lg:px-4 rounded-sm  border border-slate-300 text-base text-black font-medium ${currentPage === 1 ? "cursor-not-allowed opacity-30":"hover:cursor-pointer hover:bg-gray-200"}`}>
                Prev
            </button>
            { 
  Array.from({ length: totalPages }, (_, i) => {
    // Default rendering when totalPages <= 4
    return (
      <button
        key={i}
        onClick={() => {setCurrentPage(i + 1)
                        handleToTop()}
        }
        className={`${
          currentPage === i + 1 ? "bg-blue-400" : ""
        } text-base text-black cursor-pointer outline-none border border-slate-300 px-2 lg:px-5 rounded-sm`}
      >
        {i + 1}
      </button>
    );
  })
}
            <button disabled={currentPage === totalPages} onClick={()=>setCurrentPage(currentPage + 1)} className={`outline-none px-2 lg:px-4 rounded-sm  border border-slate-300 text-base text-black font-medium ${currentPage === totalPages ? "cursor-not-allowed opacity-30":"hover:cursor-pointer hover:bg-gray-200"}`}>
                Next
            </button>
        </div>
    
    </div>
  )
}
export default ProductsPage
    