import React, { useState } from 'react'
import eye_ic from '../../../public/images/eye.svg'
import eye_slash_ic from '../../../public/images/eye-slash.svg'

const InputField = ({ ...data }) => {
  const { pwdInp, type, ...attrs } = data;
  const [showPwd, setShowPwd] = useState(false);

  const handleClickShowPwd = () => {
    setShowPwd(prev => !prev)
  }

  return (
    <div className='relative'>
      <input type={showPwd ? 'text' : type} {...attrs} className='input-field' />
      {pwdInp && <button onClick={handleClickShowPwd} className='absolute my-auto inset-y-auto size-5 right-3 bottom-0 top-0' type='button' >
        <img src={showPwd ? eye_slash_ic : eye_ic} alt="eye" className='size-full' />
      </button>}
    </div>
  )
}

export default InputField