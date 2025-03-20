import React, { useContext, useState, useRef, useEffect } from 'react'
import { ShopContext } from '../context/ShopContextProvider'
import { Link } from 'react-router-dom'

const ArticleHome = () => {
    const { articles } = useContext(ShopContext)
    const [isDragging, setIsDragging] = useState(false)
    const [startX, setStartX] = useState(0)
    const [scrollLeft, setScrollLeft] = useState(0)
    const [isPaused, setIsPaused] = useState(false)
    const sliderRef = useRef(null)

    // Auto slide functionality
    useEffect(() => {
        if (!sliderRef.current || isPaused) return;

        const interval = setInterval(() => {
            const isAtEnd = sliderRef.current.scrollLeft >= (sliderRef.current.scrollWidth - sliderRef.current.clientWidth);
            
            if (isAtEnd) {
                // Reset to start if at end
                sliderRef.current.scrollTo({
                    left: 0,
                    behavior: 'smooth'
                });
            } else {
                // Slide one article
                sliderRef.current.scrollBy({
                    left: sliderRef.current.clientWidth / 4, // Divide by 4 because we show 4 articles
                    behavior: 'smooth'
                });
            }
        }, 5000);

        return () => clearInterval(interval);
    }, [isPaused]);

    // Pause auto-slide on hover or drag
    const handleMouseEnter = () => setIsPaused(true);
    const handleMouseLeave = () => setIsPaused(false);

    // Format date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    // Navigation handlers
    const handleNavigation = (direction) => {
        if (!sliderRef.current) return;
        
        const scrollAmount = direction === 'left' ? -400 : 400;
        sliderRef.current.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    };

    // Drag handlers
    const handleMouseDown = (e) => {
        setIsDragging(true)
        setStartX(e.pageX - sliderRef.current.offsetLeft)
        setScrollLeft(sliderRef.current.scrollLeft)
    }

    const handleMouseUp = () => {
        setIsDragging(false)
    }

    const handleMouseMove = (e) => {
        if (!isDragging) return
        e.preventDefault()
        const x = e.pageX - sliderRef.current.offsetLeft
        const walk = (x - startX) * 2
        sliderRef.current.scrollLeft = scrollLeft - walk
    }

    return (
        <div className="px-5 lg:px-[7vw] mx-auto">
           <h1 className='w-full text-4xl font-bold font-Rufina pb-6 pt-6'>Tin Tức</h1>
            
            {/* Slider container with navigation */}
            <div 
                className="relative group"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {/* Left button */}
                <button 
                    onClick={() => {
                        handleNavigation('left');
                        setIsPaused(true);
                    }}
                    className="opacity-0 group-hover:opacity-100 group-hover:left-10 absolute left-16 top-1/2 -translate-y-1/2 p-4 rounded-full bg-orange-400 text-white shadow-2xl transform transition-all duration-700 ease-in-out hover:scale-110 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-orange-300"
                   
                > &#8592;
                   
                </button>

                {/* Articles container with drag functionality */}
                <div 
                    ref={sliderRef}
                    className="grid grid-flow-col auto-cols-[calc(50%-8px)] md:auto-cols-[calc(25%-12px)] gap-4 overflow-x-auto snap-x snap-mandatory touch-pan-x"
                    onMouseDown={(e) => {
                        handleMouseDown(e);
                        setIsPaused(true);
                    }}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                    onMouseMove={handleMouseMove}
                    style={{
                        cursor: isDragging ? 'grabbing' : 'grab',
                        userSelect: 'none',
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                    }}
                >
                    {articles.map((article) => (
                        <Link 
                            to={`/article/${article._id}`}
                            key={article._id}
                            className="snap-start"
                            onClick={(e) => {isDragging && e.preventDefault();window.scrollTo({top:0,behavior:'smooth'})}}
                        >
                            <div className="bg-white rounded-lg shadow-md hover:shadow-2xl transition-shadow p-4  duration-300 h-full">
                                <img 
                                    src={article.avatar} 
                                    alt={article.title}
                                    className="w-full h-48 object-cover rounded-t-lg transition-all duration-1000"
                                    draggable="false"
                                />
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold mb-2 line-clamp-2 h-14">
                                        {article.title}
                                    </h3>
                                    <p className="text-gray-600 mb-3 line-clamp-3 h-18">
                                        {article.content1}
                                    </p>
                                    <div className="flex items-center justify-between text-sm text-gray-500">
                                        <span>News</span>
                                        <span>{formatDate(article.createdAt)}</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Right button */}
                <button 
                    onClick={() => {
                        handleNavigation('right');
                        setIsPaused(true);
                    }}
                    className="opacity-0 group-hover:opacity-100 group-hover:right-10 absolute right-16 top-1/2 -translate-y-1/2 p-4 rounded-full bg-orange-400 text-white shadow-2xl transform transition-all duration-700 ease-in-out hover:scale-110 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-orange-300"
                    style={{ transform: 'translate(50%, -50%)' }}
                >
                    &#8594;
                </button>
            </div>

        </div>
    )
}

// Add this CSS to your global styles
const styles = `
    /* Hide scrollbar */
    .overflow-x-auto::-webkit-scrollbar {
        display: none;
    }

    /* Line clamp utilities */
    .line-clamp-2 {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    .line-clamp-3 {
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
`;

export default ArticleHome
