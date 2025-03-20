import React, {useState,useRef, useEffect} from 'react'
import { assets } from '../assets/assets'
import '../index.css'
const Partner = () => {
const images = [
   assets.partner_logo
]
const [startPos,setStartPos] = useState(0)
const [tranlate,setTranslate] = useState(0)
const [isDragging,setIsDragging] = useState(false)
const sliderRef = useRef(null)
const imageWidth = 200
const imagePerRow = window.innerWidth <= 1024 ? 2 : 4
const handelMouseDown = (e) => {
    console.log("on mouse down")
    setIsDragging(true)
    setStartPos(e.clientX)
    sliderRef.current.style.transition = 'none'
}
const handelMouseMove = (e) => {
  console.log("on mouse move")

    if(!isDragging) return;
    const currentPos = e.clientX
    const diff = currentPos - startPos
    console.log(startPos)
    setTranslate((prev) => prev + diff)
    setStartPos(currentPos)
}
const handelMouseUp = (e) => {
  console.log("on mouse up")

    setIsDragging(false)
    const maxTranslate = -(assets.partner_logo.length - imagePerRow) * 400
    if(tranlate > 0) {
      setTranslate(0)
    }
    else if(tranlate < maxTranslate) {
      setTranslate(maxTranslate)

    }
    else {
     const currentIndex = Math.round(tranlate / -imageWidth)
     setTranslate(-currentIndex * imageWidth)
    }
    sliderRef.current.style.transition = 'transform .3s ease'
}

const handleTouchStart = (e) => {
  setIsDragging(true);
  setStartPos(e.touches[0].clientX); // Use the first touch point
  sliderRef.current.style.transition = "none";
};

const handleTouchMove = (e) => {
  if (!isDragging) return;
  const currentPos = e.touches[0].clientX; // Use the first touch point
  const diff = currentPos - startPos;
  setTranslate((prev) => prev + diff);
  setStartPos(currentPos)
};

const handleTouchEnd = () => {
  setIsDragging(false);
  adjustTranslate();
};

const adjustTranslate = () => {
  const maxTranslate = -(assets.partner_logo.length - imagePerRow) * imageWidth;
  if (tranlate > 0) {
    setTranslate(0);
  } else if (tranlate < maxTranslate) {
    setTranslate(maxTranslate);
  } else {
    const currentIndex = Math.round(tranlate / -imageWidth);
    setTranslate(-currentIndex * imageWidth);
  }
  sliderRef.current.style.transition = "transform 0.3s ease";
};

const handleDragStart = (e) => {
        e.preventDefault()
    }
  return (
      <div className={`overflow-hidden px-5 lg:px-[7vw] py-24 mx-auto pt-12` }>
                  <h1 className='w-full text-4xl font-bold font-Rufina pb-12'>Partner</h1>

          <div className={`w-full grid grid-flow-col gap-12 ${imagePerRow === 2 ? 'auto-cols-[46%]':'auto-cols-[24%]'}  cursor-grab active:cursor-grabbing `}
              style={{transform: `translateX(${tranlate}px)` }}
              ref={sliderRef}
              onMouseDown={handelMouseDown}
              onMouseMove={handelMouseMove}
              onMouseUp={handelMouseUp}
              onMouseLeave={handelMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              >
                {
                  assets.partner_logo.map((src,index) => (
                            <img src={src}
                          key={index}
                          className='flex-shrink-0 '
                          onDragStart={handleDragStart}
                          alt="" />
                  ))
                }
          </div>
      </div>
  )
}
export default Partner