import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContextProvider.jsx'
import ProductItem from './ProductItem.jsx'
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

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
        <div className='grid grid-cols-2 lg:grid-cols-4  gap-8 gap-y-9'>
            
        {
            currentProducts.map((product,index)=>(
                <ProductItem key = {index} id = {product._id} image={product.image} name = {product.name} price = {product.price} colors = {product.color}/>
            ))
        }
        </div>
        <div className="w-full flex items-center justify-center py-5">
          <div className="flex gap-2 bg-white rounded-lg shadow px-3 py-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              className={`w-9 h-9 flex items-center justify-center rounded-full border border-slate-300 text-base text-black font-medium transition-all ${currentPage === 1 ? "cursor-not-allowed opacity-30" : "hover:bg-blue-100 hover:text-blue-600"}`}
              aria-label="Trang trước"
            >
              <FaChevronLeft />
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => {
                  setCurrentPage(i + 1);
                  handleToTop();
                }}
                className={`w-9 h-9 flex items-center justify-center rounded-full border border-slate-300 text-base font-semibold transition-all
                  ${currentPage === i + 1 ? "bg-blue-500 text-white border-blue-500 shadow" : "bg-white text-black hover:bg-blue-100 hover:text-blue-600"}`}
              >
                {i + 1}
              </button>
            ))}
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
              className={`w-9 h-9 flex items-center justify-center rounded-full border border-slate-300 text-base text-black font-medium transition-all ${currentPage === totalPages ? "cursor-not-allowed opacity-30" : "hover:bg-blue-100 hover:text-blue-600"}`}
              aria-label="Trang sau"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
    
    </div>
  )
}
export default ProductsPage
