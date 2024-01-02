import React from 'react'
import './input.css'
function Input({label, inputType='text'}) {
  return (
        <span className='flex-group-column justify-content-center'>
            <input id ={label} type={inputType} className='input__input'
                   placeholder={label} />
        </span>
  )
}

export default Input