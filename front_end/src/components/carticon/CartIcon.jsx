import React from 'react'
import './carticon.css'
import { Bag } from 'react-bootstrap-icons'
const CartIcon = ({onClick, count=0}) => {
  return (
    <article className='carticon__article' onClick={onClick}>
      <Bag size={25} className='carticon__icon'/>
      <span className='carticon__count'>{count}</span>
    </article>
  )
}

export default CartIcon