import React, {useEffect, useState}from 'react'
import './searchcomponent.css'
import SearchBar from '../searchbar/SearchBar'
import { useDebounce } from '../../../hooks/useDebounce'
import { useSearchSomeItems } from '../../../querysandmutaions/queriesandmutaions'
import Loader from '../../../components/loader/Loader'
import { X } from 'react-bootstrap-icons'

const closeComponent = () => {
    document.getElementsByClassName('searchcomponent__article')[0].classList.remove('searchcomponent__article_show')
}
const SearchComponent = () => {
  const [searchValue, setSearchValue] = useState()
  const debounceValue = useDebounce(searchValue)
  const {data:searchData, isLoading, isError, error} = useSearchSomeItems(debounceValue)
  useEffect(() => {
    console.log(searchData)
  },[searchData])
  if (isError){
    console.log(error)
    return <h1>ERROR</h1>
  }
  return (
    <article className='searchcomponent__article'>
        <div className='searchcomponent__search-div'>
            <span className='flex-group searchcomponent__row'>
                <span className='searchcomponent__appicon'>E-commerce</span>
                <SearchBar border={false} serachComponent={true} value={searchValue} onChange={(e) => setSearchValue(e.target.value)}/>
                <span className='searchcomponent__x-span'
                      onClick={closeComponent}><X size={30}/></span>
            </span>
            <section className='searchcomponent__result-section'>
                <p className='text-muted cap'>Popular Search Terms</p>
                {searchData && searchData.length === 0 ?
                <ul className='searchcomponent__result-ul'>
                    <li>aa</li>
                    <li>dsad</li>
                    <li>dasd</li>
                </ul>
                :searchData ?
                <ul>
                    {searchData.map(item => {
                        return <li>{item.name}</li>
                    })}
                </ul>
                : ''}
            </section>
        </div>
        <div className='searchcomponent__overlay-div'></div>
    </article>
  )
}

export default SearchComponent