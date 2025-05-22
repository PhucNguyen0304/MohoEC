import React, { useContext } from 'react'
import ProductItem from './ProductItem'
import { ShopContext } from '../context/ShopContextProvider'

const BestSeller = () => {
    const {products} = useContext(ShopContext)
    const bestSellerProduct = products.filter((product)=>product.bestSeller === true)
  return (
    <div className='px-5 lg:px-[7vw]'>
        <h1 className='w-full text-4xl font-bold font-Rufina pb-6 pt-6'>Sản phẩm bán chạy</h1>
        <div className='grid grid-cols-2 lg:grid-cols-4 gap-4 gap-y-5'>
            {bestSellerProduct.map((product,index)=> (
                <ProductItem key= {index} id = {product._id} name = {product.name} price = {product.price} image = {product.image} colors= {product.color}/>
            ))}
        </div>
    </div>
 
  )
}

export default BestSeller
