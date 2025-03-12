import React from 'react'

const Validatior = ({error}) => {
  return (
    <div className='mt-2'>
        <p className='text-red-600 text-base'>* {error}</p>
    </div>
  )
}

export default Validatior