import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ProductItem = ({ image, id, name, price, colors }) => {
  const priceString = price.toLocaleString("en-US");const navigate = useNavigate();
 
    const [dragging,setDragging] = useState(false)
    const [startPos,setStartPos] = useState({x:0,y:0})
    const [currentPos,setCurrentPos] = useState({x:0,y:0})
    const [isHovered, setIsHovered] = useState(false);
    const threshold = 10
    const handleMouseDown = (e) => {
     setDragging(false);
      setStartPos({x:e.clientX,y:e.clientY})
    }
    const handleMouseMove = (e) => {
      setCurrentPos({x: e.clientX,y:e.clientY})
      const diffX = Math.abs( currentPos.x - startPos.x )
      const diffY = Math.abs(currentPos.y - startPos.y )
      if(diffX > threshold || diffY > threshold) {
        setDragging(true)
      }
    }
    const handleMouseUp = (e) => {
      if(!dragging) {
        navigate(`/product/${id}`)
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        })
      }
    } 
    const handlePreventDefault = (e) => {
    e.preventDefault();
  };
    const handleClick = (e) => {
    if (dragging) {
      e.preventDefault();
    }
  };
  useEffect(()=> {
 },[dragging])
    const handleTouchStart = (e) => {
      setDragging(false)
      setStartPos({x:e.touches[0].clientX,y:e.touches[0].clientY})
    }
    const handleTouchMove = (e) => {
      setCurrentPos({x:e.touches[0].clientX,y:e.touches[0].clientY})
      const diffX = Math.abs(currentPos.x - startPos.x)
      const diffY = Math.abs(currentPos.y - startPos.y)
      if(diffX > threshold || diffY > threshold) {
        setDragging(true)
    } }
    const handleTouchEnd = (e) => {
      if(!dragging) {
        navigate(`/product/${id}`)
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        })
      }
    }
    const [currentImg,setCurrentImg] = useState(image[0])
    useEffect(() => {
      setCurrentImg(image[0]);
    }, [image]);
    const handleMouseEnter = () => {
      if(image[1]) {
        setCurrentImg(image[1])
      }
    }
    const handleMouseLeave = () => {
      setCurrentImg(image[0])

    }
  return (
    <div
      className='flex flex-col gap-2'
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <Link
        onDragStart={handlePreventDefault}
        to={`/product/${id}`}
        className='flex flex-col gap-2 h-full'
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className='overflow-hidden h-[130px] lg:h-[240px] flex items-center justify-start relative'>
          {/* Ảnh 1 */}
          <img
            className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out ${currentImg === image[0] ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
            src={image[0]}
            alt=""
            style={{ maxWidth: '100%' }}
          />
          {/* Ảnh 2 */}
          {image[1] && (
            <img
              className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out ${currentImg === image[1] ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
              src={image[1]}
              alt=""
              style={{ maxWidth: '100%' }}
            />
          )}
        </div>
        <div className='flex flex-col items-start gap-1 text-left'>
          <p className='text-sm lg:text-lg text-black'>{name}</p>
          <p className='text-sm lg:text-lg text-orange-600'>{priceString}<span className='underline'>đ</span></p>
        </div>
        <div className='flex gap-1 items-center justify-start mt-1'>
          {colors.map((color, index) => (
            <div
              key={index}
              className={`bg-${color}-500 w-[13px] h-[13px] lg:w-[20px] lg:h-[20px] rounded-full cursor-pointer`}
            ></div>
          ))}
        </div>
      </Link>
    </div>
  );
};

export default ProductItem;