import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContextProvider'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'
const ArticleDetail = () => {
    const { articleId } = useParams()
    const [articles, setArticles] = useState([])
    const [article, setArticle] = useState(null)
    const [error, setError] = useState(null)
    // Get Article
        // Get Articles
        const getArticles = async() => {
            try {
                console.log("get articles functiono called")
                const response = await axios.get(backendUrl + '/api/article/getarticle')
                if(response.data.success) {
                    setArticles(response.data.articles)
                    console.log(response.data.articles)
                    toast.success("Get articles successfully")
                    const foundArticle = response.data.articles.find(
                        article => article._id === articleId
                    )
                    if (foundArticle) {
                        setArticle(foundArticle)
                    } else {
                        toast.error("Không tìm thấy bài viết")
                    }
                } else {
                    console.log(response.data)
                }
            }catch(error) {
                console.log(error)
                toast.error(error.message)
            }
        }
    
  useEffect(()=> {
    console.log("Hello get articles")
    getArticles()
  },[])
    // Format date function
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    useEffect(() => {
        console.log(article)
    }, [article])
    useEffect(() => {
        console.log(articles)
    }, [articles])

    // Show loading state
    if (!article && !error) {
        return (
            <div className="max-w-4xl mt-[300px] mx-auto p-6">
                <div className="animate-pulse space-y-8">
                    <div className="h-10 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-[400px] bg-gray-200 rounded"></div>
                    <div className="space-y-4">
                        <div className="h-4 bg-gray-200 rounded"></div>
                        <div className="h-4 bg-gray-200 rounded"></div>
                        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                    </div>
                </div>
            </div>
        )
    }

  
    // Only render when article data is available
    return (
        <div className="max-w-4xl mt-20 lg:mt-[200px] mx-auto p-6">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">
                    {article.title}
                </h1>
                <div className="flex items-center gap-3 text-gray-500 text-sm">
                    <span>News</span>
                    <span>•</span>
                    <span>{formatDate(article.createdAt)}</span>
                </div>
            </div>

            {/* Main Image */}
            <div className="mb-8">
                <img 
                    src={article.avatar} 
                    alt={article.title}
                    className="w-full h-[400px] object-cover rounded-lg"
                />
            </div>

            {/* Content Section 1 */}
            <div className="space-y-6 text-gray-700">
                <p className="text-lg leading-relaxed">
                    {article.content1}
                </p>

                {/* Section 1 */}
                <div className="mt-8">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">
                        {article.section1}
                    </h2>
                    <div className="whitespace-pre-line">
                        {article.content1.split('\n').map((line, index) => (
                            <p key={index} className="mb-2">
                                {line}
                            </p>
                        ))}
                    </div>
                    {article.image1 && (
                        <img 
                            src={article.image1} 
                            alt="Additional content"
                            className="w-full h-[300px] object-cover rounded-lg my-8"
                        />
                    )}
                </div>

                {/* Section 2 */}
                {article.section2 && (
                    <div className="mt-8">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">
                            {article.section2}
                        </h2>
                        <div className="whitespace-pre-line">
                            {article.content2.split('\n').map((line, index) => (
                                <p key={index} className="mb-2">
                                    {line}
                                </p>
                            ))}
                        </div>
                        {article.image2 && (
                            <img 
                                src={article.image2} 
                                alt="Additional content"
                                className="w-full h-[300px] object-cover rounded-lg my-8"
                            />
                        )}
                    </div>
                )}
            </div>

            {/* Metadata */}
            <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex flex-col gap-2 text-sm text-gray-500">
                    <p>Published: {formatDate(article.published_at)}</p>
                    <p>Last updated: {formatDate(article.updatedAt)}</p>
                </div>
            </div>
        </div>
    )
}

export default ArticleDetail