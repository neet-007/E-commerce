import React from 'react'
import './searchcomponent.css'
import SearchBar from '../searchbar/SearchBar'
import { X } from 'react-bootstrap-icons'

const closeComponent = () => {
    document.getElementsByClassName('searchcomponent__article')[0].classList.remove('searchcomponent__article_show')
}
const SearchComponent = () => {
  return (
    <article className='searchcomponent__article'>
        <div className='searchcomponent__search-div'>
            <span className='flex-group searchcomponent__row'>
                <span className='searchcomponent__appicon'>E-commerce</span>
                <SearchBar border={false} serachComponent={true}/>
                <span className='searchcomponent__x-span'
                      onClick={closeComponent}><X size={30}/></span>
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