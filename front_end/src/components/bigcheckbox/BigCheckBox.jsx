import React, { useEffect } from 'react'
import './bigcheckbox.css'
const BigCheckBox = ({items=[], setFilterQuery=() => {}}) => {
  const handleChange = () => {
    const parent = document.getElementById('bigcheckbox__layout')
    const inputOptions = parent.querySelectorAll('input')
    let filterQuery = ''
    for (let i=0; i < inputOptions.length; i++){
      if (inputOptions[i].checked) filterQuery += `${inputOptions[i].value}&`
    }
    setFilterQuery(filterQuery)
  }
  return (
    <div className='bigcheckbox__layout' id='bigcheckbox__layout'>
        {items.map((item, i) => {
            return <span key={`bigcheckbox__input${i}`}>
              <input type="checkbox" name={`bigcheckbox__input${i}`} id={`bigcheckbox__input${i}`}
                     value={item} onChange={handleChange}/>
              <label htmlFor={`bigcheckbox__input${i}`}>dsad</label>
            </span>
        })}
    </div>
  )
}

export default BigCheckBox