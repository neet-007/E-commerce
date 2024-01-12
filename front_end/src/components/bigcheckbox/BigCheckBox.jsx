import React, { useEffect } from 'react'
import './bigcheckbox.css'
const BigCheckBox = ({title ,items=[], setFilterQuery=() => {}, existingFilter=[]}) => {
  const handleChange = () => {
    const parent = document.getElementById(`bigcheckbox__layout${title}`)
    const inputOptions = parent.querySelectorAll('input')
    let filterQuery = ''
    let removeFilter = []
    let filterKey = title.replace(' ', '-')
    for (let i=0; i < inputOptions.length; i++){
      if (inputOptions[i].checked) {filterQuery += `&${filterKey}=${inputOptions[i].value}`}
      else removeFilter.push(`${filterKey}=${inputOptions[i].value}`)
    }

    const handleFilter = (str1, str2, arr) => {
      for (const substr of str2.split('&')){
          if (str1.includes(substr)) continue;
          str1 += ('&' + substr)
      }
      for (const a of arr){
          str1 = str1.replace(a, '')
      }
      return str1
    }
    setFilterQuery(prev => handleFilter(prev, filterQuery, removeFilter) )
  }
  return (
    <>
      <p className='cap fw-bold'>{title}</p>
      <div className='bigcheckbox__layout' id={`bigcheckbox__layout${title}`}>
          {items.map((item, i) => {
            if (item === '' || item === 0) return
            return <span key={`bigcheckbox__input${i}`}>
                <input type="checkbox" name={`bigcheckbox__input${i}`} id={`bigcheckbox__input${i}`}
                      value={item} onChange={handleChange}
                      defaultChecked={existingFilter.includes(String(item))}/>
                <label htmlFor={`bigcheckbox__input${i}`}>{item}</label>
              </span>
          })}
      </div>
    </>
  )
}

export default BigCheckBox