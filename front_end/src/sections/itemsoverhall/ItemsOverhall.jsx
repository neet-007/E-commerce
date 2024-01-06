import React from 'react'
import './itemsoverhall.css'
import ItemCard from '../../components/itemcard/ItemCard'
import SideNavFilter from './sidenavfilter/SideNavFilter'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetItemsFromCategory } from '../../querysandmutaions/queriesandmutaions'
import Loader from '../../components/loader/Loader'
export const ItemsOverhall = () => {
  const {id:categoryId} = useParams()
  console.log(categoryId)
  const {data, isLoading, isError, error} = useGetItemsFromCategory(categoryId)
  const navigate = useNavigate()
  if (isLoading) return <Loader/>
  if(isError) console.log(error)
  console.log(data.items)
  return (
    <section className='itemsoverhall__main-section'>
        <div className='itemsoverhall__header flex-group-between'>
            <h5 className='f-large'>title title</h5>
            <span className='flex-group gap-1 align-items-center'>
                <button className='invisible-button f-larger cap'>filter</button>
                <button className="invisible-button f-larger cap">sort</button>
            </span>
        </div>
        <main className='itemsoverhall__main'>
           {data?
           data.items.map(item => {
            return <ItemCard key={item.id} itemTitle={item.name} itemCategory={item.category.name} price={item.price} variation={'full'}
                    onClick={() => navigate(`/item/${item.id}`)}/>
           })
          :<h1>CATEGORY NOT FOUND</h1>}
        </main>
        <SideNavFilter className='itemsoverhall__sidenav'/>
    </section>
  )
}
