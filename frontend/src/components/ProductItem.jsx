import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ProductItem = ({ image, id, name, price, colors }) => {
  const priceString = price.toLocaleString("en-US");const navigate = useNavigate();/* 
  const [dragging, setDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [currentPos, setCurrentPos] = useState({ x: 0, y: 0 });
  
  const dragThreshold = 10; // Threshold for dragging distance

  useEffect(() => {
    console.log("Dragging state updated:", dragging);
  }, [dragging]);

  const handleMouseDown = (e) => {
    setDragging(false);
    setStartPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e) => {
    setCurrentPos({ x: e.clientX, y: e.clientY });
    const diffX = Math.abs(currentPos.x - startPos.x);
    const diffY = Math.abs(currentPos.y - startPos.y);
    if (diffX > dragThreshold || diffY > dragThreshold) {
      setDragging(true);
    }
  };

  const handleMouseUp = (e) => {
    if (!dragging) {
      navigate(`/product/${id}`);
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };



  const handleTouchStart = (e) => {
    setDragging(false);
    setStartPos({ x: e.touches[0].clientX, y: e.touches[0].clientY });
  };

  const handleTouchMove = (e) => {
    setCurrentPos({ x: e.touches[0].clientX, y: e.touches[0].clientY });
    const diffX = Math.abs(currentPos.x - startPos.x);
    const diffY = Math.abs(currentPos.y - startPos.y);
    if (diffX > dragThreshold || diffY > dragThreshold) {
      setDragging(true);
    }
  };

  const handleTouchEnd = (e) => {
    if (!dragging) {
      navigate(`/product/${id}`);
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } };*/
  
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
      className='flex flex-col gap-3'
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
        className='flex flex-col gap-3'
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className='overflow-hidden'>
          <img className='hover:scale-150 transition-all duration-1000 ease-in-out' src={currentImg} alt="" />
        </div>
        <div className='flex flex-col gap-3'>
          <p className='text-base lg:text-xl text-black'>{name}</p>
          <p className='text-base lg:text-xl text-orange-600'>{priceString}<span className='underline'>đ</span></p>
        </div>
        <div className='flex gap-2 items-center'>
          {colors.map((color, index) => (
            <div key={index} className={`bg-${color}-500 w-[15px] h-[15px] lg:w-[25px] lg:h-[25px] rounded-full cursor-pointer`}></div>
          ))}
        </div>
      </Link>
    </div>
  );
};

export default ProductItem;