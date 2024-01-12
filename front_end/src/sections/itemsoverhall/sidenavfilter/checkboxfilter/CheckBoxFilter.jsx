import React from 'react'
import './checkboxfilter.css'
const CheckBoxFilter = ({data=[], setSearchParams, title='title'}) => {
  const handleChange = () => {
    const form = document.getElementById('checkboxfilter__form')
    const inputOptions = form.querySelectorAll('input')
    let searchParams = ''
    for (let i=0; i < inputOptions.length; i++){
      if (inputOptions[i].checked){
        searchParams += `${inputOptions[i].value}&`
      }
    }
    setSearchParams(prev => ({...prev, title:searchParams}))
  }
  return (
    <div className='flex-group-column checkboxfilter__form' id='checkboxfilter__form'>
        <p className='cap fw-bold m-b-1'>{title}</p>
        {data.map(item => {
          return <span key={`check-box-filter${item}`} className='flex-group gap-1'>
                  <input type="checkbox" name={`check-box-filter${item}`} id={`check-box-filter${item}`} value={`check-box-filter${item}`}
                         onChange={() => handleChange()}/>
                  <label htmlFor={`check-box-filter${item}`}>{item}</label>
                </span>
        })}
    </div>
  )
}

export default CheckBoxFilter