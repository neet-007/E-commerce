import React from 'react'
import './select.css'
function Select({options=[]}) {
  return (
    <select className='select__select' defaultValue={'city'} >
        {options.map((option, i) => {
            return <option key={i} value={option}>{option}</option>
        })}
    </select>
  )
}

export default Select