import React, { useContext } from 'react'
import Hero from '../components/Hero.jsx'
import { assets } from '../assets/assets.js'
import Filter from '../components/Filter.jsx'
import ProductsPage from '../components/ProductsPage.jsx'
import { ShopContext } from '../context/ShopContextProvider.jsx'
import Policy from '../components/Policy.jsx'
const Dinningroom = () => {
    const {products} = useContext(ShopContext)
    const productsDinningroom = products.filter((product) => product.category === 'dinningroom')
  return (
    <div className='my-12 lg:mt-[150px]'>
        <Filter page="dinningroom"/>
        <ProductsPage products={productsDinningroom}/>
        <Policy/>
    </div>
  )
}

export default Dinningroom
