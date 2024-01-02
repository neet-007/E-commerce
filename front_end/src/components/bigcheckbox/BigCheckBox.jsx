import React from 'react'
import './bigcheckbox.css'
const BigCheckBox = ({items=[]}) => {
  return (
    <div className='bigcheckbox__layout'>
        {items.map((item, i) => {
            return <span key={i}>{item}</span>
        })}
    </div>
  )
}

export default BigCheckBox