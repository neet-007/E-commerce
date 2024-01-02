import React from 'react'
import './itemsoverhall.css'
import ItemCard from '../../components/itemcard/ItemCard'
import SideNavFilter from './sidenavfilter/SideNavFilter'
export const ItemsOverhall = () => {
  return (
    <section className='itemsoverhall__main-section'>
        <div className='itemsoverhall__header flex-group-between'>
            <h5 className='f-large'>title title</h5>
            <span className='flex-group gap-1'>
                <p>filter</p>
                <p>sort</p>
            </span>
        </div>
        <main className='itemsoverhall__main'>
            <ItemCard/>
            <ItemCard/>
            <ItemCard/>
            <ItemCard/>
            <ItemCard/>
        </main>
        <SideNavFilter className='itemsoverhall__sidenav'/>
    </section>
  )
}
