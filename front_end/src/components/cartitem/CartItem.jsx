import React from 'react'
import './cartitem.css'
import { Trash3 } from 'react-bootstrap-icons'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../../hooks/useCart'
const CartItem = ({itemId, itemTitle, quantity, price, imgUrl, category}) => {
  const navigate = useNavigate()
  const {cartOptions, isPending, isError, error} = useCart('remove')
  return (
    <article className='cartitem__main-article'>
        <img src={imgUrl ? imgUrl:"src/assets/iphone.png"} alt="item-img"
             className='cartitem__img cursor-pointer'
             onClick={() => navigate(`/item/${itemId}`)}/>
        <span className='cartitem__price'>SAR {price}</span>
        <div className='cartitem__details'>
          <h3 className='cartitem__title cursor-pointer' onClick={() => navigate(`/item/${itemId}`)}>
            {itemTitle}
          </h3>
          <p>{category ? category : 'category'}</p>
          <p>sada</p>
          <p>asd</p>
          <p>{quantity}</p>
          <span className='cartitem__delete cursor-pointer' onClick={() => removeCartItem({cartItems:[itemId], option:'remove'})}>
            <Trash3/>
          </span>
        </div>
    </article>
  )
}

export default CartItem