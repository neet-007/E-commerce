import React from 'react'
import './searchcomponent.css'
import SearchBar from '../searchbar/SearchBar'
import { X } from 'react-bootstrap-icons'
const SearchComponent = () => {
  return (
    <article className='searchcomponent__article'>
        <div className='searchcomponent__search-div'>
            <span className='flex-group-between searchcomponent__row'>
                <span>E-commerce</span>
                <SearchBar border={false}/>
                <span className='searchcomponent__x-span'><X size={30}/></span>
            </span>
            <section className='searchcomponent__result-section'>
                <p className='text-muted cap'>Popular Search Terms</p>
                <ul className='searchcomponent__result-ul'>
                    <li>aa</li>
                    <li>dsad</li>
                    <li>dasd</li>
                </ul>
            </section>
        </div>
        <div className='searchcomponent__overlay-div'></div>
    </article>
  )
}

export default SearchComponent