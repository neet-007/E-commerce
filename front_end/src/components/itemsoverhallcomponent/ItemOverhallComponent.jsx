import React, { useState } from 'react'
import ItemCard from '../itemcard/ItemCard'
import SideNavFilter from '../../sections/itemsoverhall/sidenavfilter/SideNavFilter'

const SortDropDown = ({ sortQuery, setSortQuery }) => {
  const handleRadio = () => {
    const radioGroup = document.getElementById('overhall-radio-group')
    setSortQuery(radioGroup.querySelector('input[name="overhall-sort"]:checked').value)
  }

  const showSortDropDown = () => {
    const SortDropDown = document.getElementById('overhall-radio-group')
    SortDropDown.classList.contains('itemsoverhall__dropdown-ul-show') ? SortDropDown.classList.remove('itemsoverhall__dropdown-ul-show'):SortDropDown.classList.add('itemsoverhall__dropdown-ul-show')
  }

  return (
  <span className='itemsoverhall__dropdown-span'>
      <button className='invisible-button f-larger cap'
               onClick={showSortDropDown}>sort by: {sortQuery} ^</button>
      <ul className='list-style itemsoverhall__dropdown-ul cap flex-group-column gap-1' id='overhall-radio-group'>
        <li>
          <span>
            <input type="radio" id='overhall-new' name='overhall-sort' onChange={handleRadio} value={'new'}/>
            <label htmlFor="overhall-new" onClick={showSortDropDown}>new</label>
          </span>
        </li>
        <li>
          <span>
            <input type="radio" id='overhall-old' name='overhall-sort' onChange={handleRadio} value={'old'}/>
            <label htmlFor="overhall-old" onClick={showSortDropDown}>old</label>
          </span>
        </li>
        <li>
          <span>
            <input type="radio" id='overhall-price-low' name='overhall-sort' onChange={handleRadio} value={'min_price'}/>
            <label htmlFor="overhall-price-low" onClick={showSortDropDown}>price:low-high</label>
          </span>
        </li>
        <li>
          <span>
            <input type="radio" id='overhall-price-high' name='overhall-sort' onChange={handleRadio} value={'max_price'}/>
            <label htmlFor="overhall-price-high" onClick={showSortDropDown}>price:high-low</label>
          </span>
        </li>
      </ul>
  </span>
  )
};

const ItemOverhallComponent = ({data={}, setSearchParams, page, setPage, sortQuery, setSortQuery, setPrice, setFilterQuery}) => {
  const setHeight = () => {
    const parent = document.getElementById('itemsoverhall__main-section')
    const child = document.getElementById('itemsoverhall__main')
    parent.style.height = `${child.offsetHeight}px`
  }

  return (
    <section className='itemsoverhall__main-section' id='itemsoverhall__main-section'>
        <div className='itemsoverhall__header flex-group-between'>
            <h5 className='f-large cap fw-bold'>{data.name}</h5>
            <span className='flex-group gap-1 align-items-baseline'>
                <button className='invisible-button f-larger cap'>filter</button>
                <SortDropDown sortQuery={sortQuery} setSortQuery={setSortQuery}/>
            </span>
        </div>
        <main className='itemsoverhall__main' id='itemsoverhall__main' onLoad={() => setHeight()}>
           {data && data.details.items.length !== 0?
           data.details.items.map(item => {
            return <ItemCard key={item.id} itemTitle={item.name} itemCategory={item.category.name} price={item.price} variation={'full'}
                    onClick={() => navigate(`/item/${item.id}`)}/>
           })
           :<h1>CATEGORY NOT FOUND</h1>}
           {page !== 1 &&
             <button onClick={() => setPage(prev => prev - 1)}>previous</button>
           }
           {data.details.next &&
            <button onClick={() => setPage(prev => prev + 1)}>next</button>
           }
        </main>
        <SideNavFilter className='itemsoverhall__sidenav' data={data.details} setSearchParams={setSearchParams} setSortQuery={setSortQuery} setPrice={setPrice} setFilterQuery={setFilterQuery}/>
    </section>
  )
}

export default ItemOverhallComponent