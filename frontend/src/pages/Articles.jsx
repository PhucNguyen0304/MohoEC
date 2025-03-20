import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContextProvider';
import { Link } from 'react-router-dom';

function Articless() {

    const {articles, setArticles} = useContext(ShopContext)


    useEffect(()=> {
        console.log(articles)
    },[articles])


  return (
    <div className="flex flex-col items-center gap-6 mt-[100px] md:mt-[200px] justify-center p-4 hover:bg-gray-50 rounded-lg transition-colors">
       <h1 className='text-2xl lg:text-4xl  lg:pb-4 font-bold font-Rufina'>Bài Viết</h1>
      {/* Left - Image */}
       {
        articles.map((article,index)=> (  
            <Link to={`/article/${article._id}`} className='lg:w-1/2 flex items-center gap-4 transition-all duration-500 hover:shadow-xl rounded-lg p-4 cursor-pointer group'>
                <div className="w-[80px] h-[80px] md:w-[120px] md:h-[120px] lg:w-[280px] lg:h-[180px] flex-shrink-0 overflow-hidden">
                    <img 
                    src={article.avatar} 
                    alt={article.title}
                    className="w-full h-full group-hover:scale-125 transition-all duration-1000 object-cover rounded-lg"
                    />
                </div>
                      {/* Right - Content */}
                <div className="flex flex-col gap-2">
                    <h2 className="text-sm lg:text-xl font-semibold text-gray-800">
                    {article.title}
                    </h2>
                    <span className="text-gray-500 text-sm">News</span>
                    <p className="text-sm lg:text-lg text-gray-600 line-clamp-2 lg:line-clamp-3">
                    {article.content1}
                    </p>
                </div>
            </Link>
            ))
       }
    </div>
  );
}

export default Articless;