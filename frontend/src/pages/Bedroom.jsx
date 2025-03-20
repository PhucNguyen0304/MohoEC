import React, { useContext } from 'react'
import Hero from '../components/Hero.jsx'
import { assets } from '../assets/assets.js'
import Filter from '../components/Filter.jsx'
import ProductsPage from '../components/ProductsPage.jsx'
import { ShopContext } from '../context/ShopContextProvider.jsx'
import Policy from '../components/Policy.jsx'
const Bedroom = () => {
    const {products} = useContext(ShopContext)
    const productsBedroom = products.filter((product) => product.category === 'bedroom')
  return (
    <div className='my-12 lg:mt-[150px]'>
        <Filter page="bedroom"/>
        <ProductsPage products={productsBedroom}/>
        <Policy/>
    </div>
  )
}

export default Bedroom
