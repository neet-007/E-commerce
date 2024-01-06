import React from 'react'
import './input.css'
function Input({label, value, onChange, required, lableHtml, inputType='text'}) {
  return (
        <span className='flex-group-column justify-content-center'>
            {lableHtml && <label htmlFor={label}>{label}</label>}
            <input id ={label} type={inputType} className='input__input'
                   placeholder={label} value={value} onChange={onChange}
                   required={required}/>
        </span>
  )
}

export default Input