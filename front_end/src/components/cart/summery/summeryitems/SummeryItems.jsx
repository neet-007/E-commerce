import React from 'react'
import './summeryitems.css'
import ItemCard from '../../../itemcard/ItemCard'
import SummeryItemcard from '../summeryitemcard/SummeryItemcard'
const SummeryItems = () => {
  return (
    <div className='summeryitems__layout'>
        <p>Estimated delivery by Friday, January 05 - Sunday, January 07</p>
        <SummeryItemcard/>
        <SummeryItemcard/>
        <SummeryItemcard/>
        <SummeryItemcard/>
    </div>
  )
}

export default SummeryItems