import React from 'react'
import './summeryitemcard.css'
import { useNavigate } from 'react-router-dom'
const SummeryItemcard = ({itemId, itemTitle, quantity, price}) => {
  const navigate = useNavigate()
  return (
    <article className='summeryitemcard__main-article'>
        <img src="src/assets/iphone.png" alt="" className='cursor-pointer'
        onClick={() => navigate(`/item/${itemId}`)}/>
        <div className='summeryitemcard__details'>
            <p className='cap cursor-pointer' onClick={() => navigate(`/item/${itemId}`)}>
                {itemTitle}
            </p>
            <span className='flex-group-column text-muted'>
                <p className='cap'>Qty {quantity}</p>
                <p className='cap'>Size XS</p>
            </span>
            <p className='cap'>Limited Stock</p>
            <span className='text-muted upper'>SAR {price}</span>
        </div>
    </article>
  )
}

export default SummeryItemcard