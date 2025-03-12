import React from 'react'
import Header from '../Header'
import { Link, useSearchParams } from 'react-router-dom';

const CheckoutSuccess = () => {
    const [searchParams] = useSearchParams();
    console.log(searchParams.get("session_id"));
    
    return (
        <div>
            <div className="bg-black">
                <Header />
            </div>

            <div className='px-6 py-10 rounded-md max-w-lg mx-auto mt-14 shadow-xl border border-gray-300 text-center'>
                <h1 className='text-green-600 text-3xl font-semibold mb-4 text-center'>Thank You</h1>
                <p className='text-lg text-gray-800 mb-4 '>Your Payment Accepted by <span className='font-semibold'>Fitness.com</span></p>
                <Link to="/" className='px-4 py-2 block bg-orange-600 rounded-lg text-white w-48 text-center mx-auto'>Continue Shopping</Link>
            </div>
        </div>
    )
}

export default CheckoutSuccess