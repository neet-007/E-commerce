import React from 'react'
import './checkout.css'
import Summery from '../../components/cart/summery/Summery'
import CheckOutForm from './checkoutform/CheckOutForm'
import { useGetOrder } from '../../querysandmutaions/queriesandmutaions'
import Loader from '../../components/loader/Loader'
import { useUserContext } from '../../context/Context'

const Checkout = () => {
  const {data, isError, error} = useGetOrder()
  const {user, isLoading} = useUserContext()
  if (isLoading) return <Loader/>

  return (
    <section className='checkout__main-article'>
        <CheckOutForm className={'checkout__details flex-group-column gap-1'}/>
        <Summery className={'checkout__summery'} checkOut={true} data={user.order[0].order_items} subtotal={user.order[0].price}/>
    </section>
  )
}

export default Checkout