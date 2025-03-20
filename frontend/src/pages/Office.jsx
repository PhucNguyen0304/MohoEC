import React, { useContext } from 'react'
import Hero from '../components/Hero.jsx'
import { assets } from '../assets/assets.js'
import Filter from '../components/Filter.jsx'
import ProductsPage from '../components/ProductsPage.jsx'
import { ShopContext } from '../context/ShopContextProvider.jsx'
import Policy from '../components/Policy.jsx'
const Office = () => {
    const {products} = useContext(ShopContext)
    const productsOffice = products.filter((product) => product.category === 'office')
  return (
    <div className='my-12 lg:mt-[150px]'>
        <Filter page="office"/>
        <ProductsPage products={productsOffice}/>
        <Policy/>
    </div>
  )
}

export default Office
