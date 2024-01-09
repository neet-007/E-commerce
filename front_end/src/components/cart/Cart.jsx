import React from 'react'
import './cart.css'
import CartItem from '../cartitem/CartItem'
import Summery from './summery/Summery'
import { useGetCartItems } from '../../querysandmutaions/queriesandmutaions'
import Loader from '../loader/Loader'
import { images } from '../../constants'
import { useUserContext } from '../../context/Context'

const Cart = () => {
  const {user, isLoading} = useUserContext()
  if (isLoading) return <Loader/>

  return (
    <section className='cart__main-section'>
        <div className="cart__offer">
            <p>offer offer offfer offer offer offer</p>
        </div>
        <div className="cart__bag">
            <p className='f-large fw-bold'>Bag</p>
            <span className='cart__bag-total-price'>
                <span className='text-muted'>{user.cart.length === 0 ? 0 :
                                            user.cart[0].count}</span>
                <p className='text-muted'>items</p>
                <span>|</span>
                <p>SAR {user.cart.length === 0 ? 0 :
                        user.cart[0].price}</p>
            </span>
            <div className='cart__cartitems-container'>
                {user.cart.length === 0 ? '':
                user.cart[0].cart_items.map((item, i) => {
                    return <CartItem key={item.item.id} itemId={item.item.id} itemTitle={item.item.name} quantity={item.quantity} price={item.price}
                                     imgUrl={images[i]} category={item.item.category.name}/>
                })}
            </div>
        </div>
        <div className='cart__bag-border'></div>
        <article className='cart__summery'>
            <Summery subtotal={user.cart[0].price} data={user.cart[0].cart_items}/>
        </article>
    </section>
  )
}

export default Cart