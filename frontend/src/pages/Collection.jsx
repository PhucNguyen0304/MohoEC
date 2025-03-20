import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets.js'
import Filter from '../components/Filter.jsx'
import ProductsPage from '../components/ProductsPage.jsx'
import { ShopContext } from '../context/ShopContextProvider.jsx'
import Policy from '../components/Policy.jsx'
const Collection = () => {
  const {products} = useContext(ShopContext)
  const [screenSize,setSizeScreen] = useState(window.innerWidth)
  return (
    <div className='my-12'>
        <img className='w-full lg:mt-[150px]' src={screenSize <= 1024 ? assets.hero_mb[0] : assets.heroAllProducts_picture} alt="" />
        <Filter page="all"/>
        <ProductsPage products = {products}/>
        <Policy/>
    </div>
  )
}

export default Collection
