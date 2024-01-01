import React from 'react'
import './searchbar.css'
import { Search } from 'react-bootstrap-icons'
const SearchBar = ({border}) => {
  let className
  !border ?  className = 'border-none': ''
  return (
    <form className={`searchbar__form ${className}`}>
        <Search size={20}/>
        <input type="search" name="search" id="search" className='searchbar__input'
               placeholder='Search'/>
    </form>
  )
}

export default SearchBar