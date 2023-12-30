import React from 'react'
import './cartitem.css'
import { Trash3 } from 'react-bootstrap-icons'
const CartItem = () => {
  return (
    <article className='cartitem__main-article'>
        <img src="src/assets/iphone.png" alt="item-img"
             className='cartitem__img'/>
        <span className='cartitem__price'>SAR 350.0</span>
        <div className='cartitem__details'>
          <h3 className='cartitem__title'>
            Al-Ittihad F.C. 2023/24 Stadium Home
          </h3>
          <p>dsad</p>
          <p>sada</p>
          <p>asd</p>
          <p>asdsad</p>
          <span className='cartitem__delete'>
            <Trash3/>
          </span>
        </div>
    </article>
  )
}

export default CartItem