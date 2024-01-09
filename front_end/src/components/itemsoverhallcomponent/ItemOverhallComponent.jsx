import React from 'react'
import ItemCard from '../itemcard/ItemCard'
import SideNavFilter from '../../sections/itemsoverhall/sidenavfilter/SideNavFilter'
const ItemOverhallComponent = ({data=[], setFilterQuery}) => {

  const setHeight = () => {
    const parent = document.getElementById('itemsoverhall__main-section')
    const child = document.getElementById('itemsoverhall__main')
    parent.style.height = `${child.offsetHeight}px`
    console.log(child.offsetHeight)
  }
  return (
    <section className='itemsoverhall__main-section' id='itemsoverhall__main-section'>
        <div className='itemsoverhall__header flex-group-between'>
            <h5 className='f-large'>title title</h5>
            <span className='flex-group gap-1 align-items-center'>
                <button className='invisible-button f-larger cap'>filter</button>
                <button className="invisible-button f-larger cap">sort</button>
            </span>
        </div>
        <main className='itemsoverhall__main' id='itemsoverhall__main' onLoad={() => setHeight()}>
           {data?
           data.map(item => {
            return <ItemCard key={item.id} itemTitle={item.name} itemCategory={item.category.name} price={item.price} variation={'full'}
                    onClick={() => navigate(`/item/${item.id}`)}/>
           })
          :<h1>CATEGORY NOT FOUND</h1>}
        </main>
        <SideNavFilter className='itemsoverhall__sidenav' data={data} setFilterQuery={setFilterQuery}/>
    </section>
  )
}

export default ItemOverhallComponent