import React from 'react'
import bg from '../../../public/images/hero.png'
import { Link, Outlet } from 'react-router-dom'

const Index = () => {
  return (
    <div>
      <img src={bg} alt="Background" className='fixed inset-0 size-full object-cover z-0'/>
      <div className='max-w-screen-2xl mx-auto px-6 md:px-10'>
      <div className='relative py-10'>
        <ul className='flex justify-center space-x-6 sm:space-x-12 text-white font-semibold text-base'>
          <li><Link to="/">HOME</Link></li>
          <li><Link to="/contact">CONTACT US</Link></li>
          <li><Link to="login">LOGIN</Link></li>
          <li><Link to="sign-up">SIGN UP</Link></li>
        </ul>
      </div>
      
      <div className='bg-white/80 rounded-[35px] px-8 sm:px-12 py-20 relative z-10 max-w-xl mx-auto md:ml-0 md:mr-auto'>
            <Outlet/>
      </div>
      </div>
    </div>
  )
}

export default Index