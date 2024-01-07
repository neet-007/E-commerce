import React from 'react'
import './summeryitems.css'
import ItemCard from '../../../itemcard/ItemCard'
import SummeryItemcard from '../summeryitemcard/SummeryItemcard'
const SummeryItems = ({data}) => {
  return (
    <div className='summeryitems__layout'>
        <p>Estimated delivery by Friday, January 05 - Sunday, January 07</p>
        {data?
        data.map(item => {
          return <SummeryItemcard key={item.item.id} itemId={item.item.id} itemTitle={item.item.name} quantity={item.quantity} price={item.price}/>
        })
        :''}
    </div>
  )
}

export default SummeryItems