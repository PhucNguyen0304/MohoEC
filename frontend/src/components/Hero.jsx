import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";
const Hero = ({image1mb,image2mb,image3mb,image1,image2,image3}) => {
  const imagesmb = [
    image1mb,image2mb,image3mb
  ]
  const images = [
    image1,image2,image3
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };
  useEffect(()=> {
    setInterval(()=> {
        setCurrentIndex((prevIndex)=>images.length-1 === prevIndex ? 0 : prevIndex + 1
      )
    },10000)
  },[images.length])
  return (
    <div className="relative mt-14 lg:mt-[150px] w-full mx-auto overflow-hidden group">
      {/**Slider Hero Mobile */}
      <div className={`relative flex transition-transform duration-[3000ms] md:hidden`} style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {imagesmb.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Slide ${index + 1}`}
            className="h-[460px] w-full"
          />
        ))}
      </div>
      {/** hero tablet */}
      <div className={`relative hidden md:flex lg:hidden transition-transform duration-[3000ms]`} style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Slide ${index + 1}`}
            className="w-full"
          />
        ))}
      </div>
      {/**slider hero lg */}
      <div className={`relative hidden lg:flex transition-transform duration-[3000ms]`} style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Slide ${index + 1}`}
            className="w-full"
          />
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
  onClick={prevSlide}
  className="opacity-0 group-hover:opacity-100 group-hover:left-10 absolute left-16 top-1/2 -translate-y-1/2 p-4 rounded-full bg-orange-400 text-white shadow-2xl transform transition-all duration-700 ease-in-out hover:scale-110 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-orange-300"
>
  &#8592;
</button>
<button
  onClick={nextSlide}
  className="opacity-0 group-hover:opacity-100 group-hover:right-10 absolute right-16 top-1/2 -translate-y-1/2 p-4 rounded-full bg-orange-400 text-white shadow-2xl transform transition-all duration-700 ease-in-out hover:scale-110 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-orange-300"
>
  &#8594;
</button>


      
      {/* Indicators */}
      <div className="absolute bottom-4 w-full flex justify-center space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full ${
              currentIndex === index ? "bg-blue-500" : "bg-gray-300"
            }`}
          ></button>
        ))}
        
      </div>
    </div>
  );
};

export default Hero;
