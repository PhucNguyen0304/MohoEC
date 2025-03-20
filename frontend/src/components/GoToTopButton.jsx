import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee, faHome, faUser,faChevronDown, faUpLong } from "@fortawesome/free-solid-svg-icons";
const GoToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showText, setShowText] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    setShowText(true)
    setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
        setShowText(false);
      }, 100);
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <div className="fixed bottom-4 right-0  z-40 pl-10">
      {isVisible && (
       <div className='transition-all ease-in-out'>
            {showText && (
                <p className={`font-medium text-lg absolute left-0 top-2 transition-opacity duration-1000 ${showText ? 'opacity-100' : 'opacity-0'}`}>
                Top
                </p>
            )}
            <button
                 onClick={scrollToTop}
                 className="w-[60px] h-[60px]  bg-gray-700 text-white text-lg font-semibold  rounded-full shadow-lg  transition duration-300 focus:ring-8  focus:ring-gray-400"
                 >
                 <FontAwesomeIcon icon={faUpLong} bounce />
            </button>
       </div>
      )}
    </div>
  );
};

export default GoToTopButton;