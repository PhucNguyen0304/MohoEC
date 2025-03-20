import React, { useContext, useEffect, useState,useRef } from 'react';
import { ShopContext } from '../context/ShopContextProvider';
import ProductItem from './ProductItem.jsx';

const New = () => {
  const [screenSize,setScreenSize] = useState(window.innerWidth)
  const [productsARow, setProductsARow] = useState(screenSize <= 1024 ? 2 : 4);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { products } = useContext(ShopContext);
  const newProducts = products.filter((product) => product.new === true);
  const [startPos,setStartPos] = useState(0)
  const [translate,setTranslate] = useState(0)
  const [isDragging,setIsDragging] = useState(false)
  const sliderRef = useRef(null)
  useEffect(() => {
  }, [isDragging]);

  const handleMouseDown = (e) => {
    setIsDragging(true)
    setStartPos(e.clientX)
    sliderRef.current.style.transition = 'none'
  }
  const handleMouseMove = (e) => {
    if(!isDragging) return;
    const currentPos = e.clientX
    const diff =  currentPos-startPos
    setTranslate((pre)=>pre + diff)
    setStartPos(currentPos)
  }
  const handleMouseUp = (e) => {
    e.preventDefault();
    setIsDragging(false)
    const maxTranslate = productsARow === 2 ? (newProducts.length - 2)*-200 :  (newProducts.length - 4)*-500

    if(translate > 0) {
      setTranslate(0)
    }
    else if(translate < maxTranslate) {
      setTranslate(maxTranslate)
    }
    else {
      const currentIndex = Math.round(translate / -270)
      setTranslate(-currentIndex * 270)
    }
    sliderRef.current.style.transition = 'transform .3s ease'
  }
  
  const handleTouchStart= (e) => {
    setIsDragging(true)
    setStartPos(e.touches[0].clientX)
    sliderRef.current.style.transition = 'none'
  }
  const handleTouchMove = (e) => {
    if(!isDragging) return;
    const currentPos = e.touches[0].clientX
    const diff =  currentPos-startPos
    setTranslate((pre)=>pre + diff)
    setStartPos(currentPos)
  }
  const handleTouchEnd = (e) => {
    e.preventDefault();
    setIsDragging(false)
    const maxTranslate = productsARow === 2 ? (newProducts.length - 2)*-360 :  (newProducts.length - 4)*-275
    if(translate > 0) {
      setTranslate(0)
    }
    else if(translate < maxTranslate) {
      setTranslate(maxTranslate)
    }
    else {
      const currentIndex = Math.round(translate / -200)
      setTranslate(-currentIndex * 200)
    }
    sliderRef.current.style.transition = 'transform .3s ease'
  }
  useEffect(() => {
    const handleResize = () => {
      setScreenSize(window.innerWidth);
      setProductsARow(window.innerWidth <= 1024 ? 2 : 4);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const prevSlider = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? newProducts.length - 1 : prevIndex - 1));
  };

  const nextSlider = () => {
    setCurrentIndex((prevIndex) => (prevIndex === newProducts.length - 1 ? 0 : prevIndex + 1));
  };

  useEffect(() => {
    if (currentIndex === newProducts.length - 1) {
      setCurrentIndex(0);
    }
  }, [currentIndex, newProducts.length]);

  return (
    <div className='px-5 lg:px-[7vw] py-12'>
      <h1 className='w-full text-4xl  pb-12 font-bold font-Rufina'>New Product</h1>
      <div className='relative w-full group overflow-hidden'>
        <div
          className={`relative grid grid-flow-col auto-cols-[46%] gap-4 lg:auto-cols-[24%] cursor-grab active:cursor-grabbing  transition-transform duration-500`}
         /* style={{ transform: `translateX(-${currentIndex * (100 / productsARow)}%)` }}*/
            style={{transform: `translateX(${translate}px`}}
            ref={sliderRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}

        >
          {newProducts.map((product, index) => (
            <div
            key={index}
            onClick={(e) => {
              if (isDragging) {
                e.preventDefault();
              }
            }}
          >
                <ProductItem key={index} image = {product.image} id = {product._id}  price={product.price} name = {product.name} colors = {product.color}/>
            </div>
          ))}
        </div>
        <button
          onClick={prevSlider}
          className='absolute hidden animate-fadeInHero bg-orange-400 left-10 top-1/2 -translate-y-1/2 p-2 rounded-full shadow-lg'
        >
          &#8592;
        </button>
        <button
          onClick={nextSlider}
          className='absolute  hidden animate-fadeInHero bg-orange-400 right-10 top-1/2 -translate-y-1/2 p-2 rounded-full shadow-lg'
        >
          &#8594;
        </button>
      </div>
    </div>
  );
};

export default New;
