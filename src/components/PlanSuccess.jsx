import React, { useEffect } from 'react'
import Header from './Header'
import { Link, useSearchParams } from 'react-router-dom';
import { usePlanSuccessQuery } from '../services/productApi';

const PlanSuccess = () => {
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get("session_id")
    // const {data, isLoading} = usePlanSuccessQuery('cs_test_a1ATUfUVGHucNsAHIAT9tOf05NoD7br9stGF8sxWPvQotYd74t8f7uMhJI')
    // console.log(data);
    
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
</div>  )
}

export default PlanSuccess