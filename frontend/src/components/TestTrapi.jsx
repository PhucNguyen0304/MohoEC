    import React, { useContext, useEffect, useState } from 'react'
    import TestTrapiProdItem from './TestTrapiProdItem'

    const TestTrapi = () => {
        const [products, setProducts] = useState([]);
    useEffect(()=> {
        console.log(products)
    }, [products])
        useEffect(() => {
            // Fetch products from Strapi
            fetch('http://localhost:1337/api/products?populate=image')
                .then(response => response.json())
                .then(data => {
                    // Strapi v4 returns data in { data: [...] } format
                    setProducts(data.data);
                })
                .catch(error => console.error('Error:', error));
        }, []);

        return (
            <div className='px-5 lg:px-[7vw]'>
                <h1 className='w-full text-4xl font-bold font-Rufina pb-6 pt-6'>Products</h1>
                <div className='grid grid-cols-2 lg :grid-cols-4 gap-4 gap-y-5'>
                    {products.map((product) => (
                        <TestTrapiProdItem 
                            key={product.id} 
                            id={product.id} 
                            name={product.title} 
                            price={product.price} 
                            image={product.image?product.image.url:null}
                            description={product.description}
                            qty={product.qty}
                        />
                    ))}
                </div>
            </div>
        )
    }

    export default TestTrapi