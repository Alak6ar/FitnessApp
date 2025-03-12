import React from 'react'
import { useSubscribeMutation } from '../services/productApi';
import { useSelector } from 'react-redux';
import { selectCurrentToken } from '../features/auth/authSlice';
import { loadStripe } from "@stripe/stripe-js";


const SubscribeBtn = ({id, price}) => {
    const [subscribe, { isLoading }] = useSubscribeMutation();

    const token = useSelector(selectCurrentToken)
    const publishableKey = "pk_test_51Qw0pcBybKCJ0YtctQKhPb6sS9JqhPbsbufgmQjyHzFSeplZHtRCqyKkTT8cCnadYo44PCgYRmxAcGzQ8f8vqyP700gQcM3Z5b";
    const stripePromise = loadStripe(publishableKey);

    const subscribeHandler = async (planId, price) => {
        const stripe = await stripePromise;
    
        const data = {
          planId: planId,
          price: price
        }
        try {
          const res = await subscribe({ data, token }).unwrap();
          const des = await stripe?.redirectToCheckout({
            sessionId: res.sessionId
          })
          console.log(res);
    
        } catch (err) {
          console.log(err);
    
        }
      }
  return (
    <button className="mx-auto" onClick={() => subscribeHandler(id, price)} disabled={isLoading}>
    {
      isLoading ? (<svg className='inline mr-1.5 size-4 text-[#ffffff78] animate-spin fill-white' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"></path><path fill="" d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z"></path></svg>
      ) : 'Register Now'
    }
  </button>  )
}

export default SubscribeBtn