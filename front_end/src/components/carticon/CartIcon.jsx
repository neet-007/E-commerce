import React from 'react'
import './carticon.css'
import { Bag } from 'react-bootstrap-icons'
import { useGetCartItems } from '../../querysandmutaions/queriesandmutaions'
import Loader from '../loader/Loader'
const CartIcon = ({onClick}) => {
  //const {data, isLoading, isError, error} = useGetCartItems()

  //if (isLoading) return <Loader/>
  //if (isError){
   // console.log(error)
    //return <h1>ERROR</h1>
  //}

  return (
    <article className='carticon__article' onClick={onClick}>
      <Bag size={25} className='carticon__icon'/>
      <span className='carticon__count'>{0}</span>
    </article>
  )
}

export default CartIcon