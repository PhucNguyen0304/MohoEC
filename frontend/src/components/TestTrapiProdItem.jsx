import React from 'react'

const TestTrapiProdItem = ({  name, price, description, qty, image }) => {
    console.log(name, price, description, qty)
    return (
        <div className="border p-4 rounded-lg">
            <img src={ `http://localhost:1337${image}`} alt={name} className='w-full h-40 object-cover rounded-lg' />
            <h2 className="text-xl font-semibold">{name}</h2>
            <p className="text-gray-600">{description}</p>
            <p className="text-lg font-bold">${price}</p>
            <p className="text-sm">Quantity: {qty}</p>
        </div>
    )
}

export default TestTrapiProdItem
