import React from 'react'
import './carticon.css'
import { Bag } from 'react-bootstrap-icons'
import Loader from '../loader/Loader'
const CartIcon = ({onClick, cartCount}) => {
  
  return (
    <article className='carticon__article' onClick={onClick}>
      <Bag size={25} className='carticon__icon'/>
      <span className='carticon__count'>{cartCount}</span>
    </article>
  )
}

export default CartIcon