import React from 'react'
import './searchbar.css'
import { Search } from 'react-bootstrap-icons'
const SearchBar = ({border, onClick, value, onChange, serachComponent=false}) => {
  let className
  let classNames
  serachComponent ? classNames = ['searchbar__form_1', 'searchbar__input_1'] : classNames =['searchbar__form', 'searchbar__input']
  !border ?  className = 'border-none': ''
  return (
    <form className={`${classNames[0]} ${className}`} onClick={onClick}>
        <Search size={20}/>
        <input type="search" name="search" id="search" className={`${classNames[1]}`}
               placeholder='Search' value={value} onChange={onChange}/>
    </form>
  )
}

export default SearchBar