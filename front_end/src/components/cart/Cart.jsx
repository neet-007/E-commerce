import React from 'react'
import './cart.css'
import CartItem from '../cartitem/CartItem'
import Summery from './summery/Summery'

const Cart = () => {
  return (
    <section className='cart__main-section'>
        <div className="cart__offer">
            <p>offer offer offfer offer offer offer</p>
        </div>
        <div className="cart__bag">
            <p className='f-large fw-bold'>Bag</p>
            <span className='cart__bag-total-price'>
                <span className='text-muted'>2</span>
                <p className='text-muted'>items</p>
                <span>|</span>
                <p>SAR 750.0</p>
            </span>
            <div className='cart__cartitems-container'>
                <CartItem/>
                <CartItem/>
                <CartItem/>
            </div>
        </div>
        <div className='cart__bag-border'></div>
        <article className='cart__summery'>
            <Summery/>
        </article>
    </section>
  )
}

export default Cart