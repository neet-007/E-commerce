import React from 'react'
import './cart.css'
import CartItem from '../cartitem/CartItem'
import Summery from './summery/Summery'
import { useGetCartItems } from '../../querysandmutaions/queriesandmutaions'
import Loader from '../loader/Loader'

const Cart = () => {
  const {data, isLoading, isError, error} = useGetCartItems()
  if (isLoading) return <Loader/>
  if (isError){
    console.log(error)
    return <h1>ERROR</h1>
  }
  console.log(data)
  return (
    <section className='cart__main-section'>
        <div className="cart__offer">
            <p>offer offer offfer offer offer offer</p>
        </div>
        <div className="cart__bag">
            <p className='f-large fw-bold'>Bag</p>
            <span className='cart__bag-total-price'>
                <span className='text-muted'>{data[0].count}</span>
                <p className='text-muted'>items</p>
                <span>|</span>
                <p>SAR {data[0].price}</p>
            </span>
            <div className='cart__cartitems-container'>
                {data[0].cart_items.map(item => {
                    return <CartItem key={item.item.id} itemId={item.item.id} itemTitle={item.item.name} quantity={item.quantity} price={item.price}/>
                })}
            </div>
        </div>
        <div className='cart__bag-border'></div>
        <article className='cart__summery'>
            <Summery subtotal={data[0].price} data={data[0].cart_items}/>
        </article>
    </section>
  )
}

export default Cart