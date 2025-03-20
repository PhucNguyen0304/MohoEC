import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContextProvider'
import ProductItem from './ProductItem'

const RelatedProducts =({category,subCategory}) => {

    const { products} = useContext(ShopContext)
    const [related,setRelated] = useState([])
    useEffect(()=> {

        if(products.length > 0) {
            let productsCopy = products.slice()
            productsCopy = productsCopy.filter((item)=> category ===item.category)
            productsCopy = productsCopy.filter((item)=> subCategory ===item.subCategory)
          setRelated(productsCopy)

        }

    },[products])
  return (
    <div className='grid grid-cols-2 lg:grid-cols-4 gap-5 gap-y-5'>
        {
            related.map((product,index)=> (
                <ProductItem key={index} image = {product.image} id = {product._id}  price={product.price} name = {product.name} colors = {product.color}/>
            ))
        }
    </div>
  )
}

export default RelatedProducts
