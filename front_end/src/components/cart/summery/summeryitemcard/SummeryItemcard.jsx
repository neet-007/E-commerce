import React from 'react'
import './summeryitemcard.css'
const SummeryItemcard = () => {
  return (
    <article className='summeryitemcard__main-article'>
        <img src="src/assets/iphone.png" alt="" />
        <div className='summeryitemcard__details'>
            <p className='cap'>
                Al-Ittihad F.C. 2023/24 Stadium Home Men's Nike Dri-FIT Shirt
            </p>
            <span className='flex-group-column text-muted'>
                <p className='cap'>Qty 1</p>
                <p className='cap'>Size XS</p>
            </span>
            <p className='cap'>Limited Stock</p>
            <span className='text-muted upper'>SAR 350.00</span>
        </div>
    </article>
  )
}

export default SummeryItemcard