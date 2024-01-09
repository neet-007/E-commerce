import React from 'react'
import './checkboxfilter.css'
const CheckBoxFilter = ({data=[], setFilterQuery}) => {
  const handleChange = () => {
    const form = document.getElementById('checkboxfilter__form')
    const inputOptions = form.querySelectorAll('input')
    let filterQuery = ''
    for (let i=0; i < inputOptions.length; i++){
      if (inputOptions[i].checked){
        filterQuery += `${inputOptions[i].value}&`
      }
    }
    setFilterQuery(filterQuery)
  }
  return (
    <div className='flex-group-column checkboxfilter__form' id='checkboxfilter__form'>
        <p className='cap fw-bold m-b-1'>title</p>
        {data.map(item => {
          return <span key={item.id} className='flex-group gap-1'>
                  <input type="checkbox" name={item.id} id={item.id} value={item.id}
                         onChange={() => handleChange()}/>
                  <label htmlFor={item.id}>filter</label>
                </span>
        })}
    </div>
  )
}

export default CheckBoxFilter