import React from 'react'
import './checkout.css'
import Summery from '../../components/cart/summery/Summery'
import CheckOutForm from './checkoutform/CheckOutForm'
import { useGetOrder } from '../../querysandmutaions/queriesandmutaions'
import Loader from '../../components/loader/Loader'

const Checkout = () => {
  const {data, isLoading, isError, error} = useGetOrder()
  if (isLoading) return <Loader/>
  if (isError){
    console.log(error)
    return <h1>ERROR</h1>
  }
  console.log(data)
  return (
    <section className='checkout__main-article'>
        <CheckOutForm className={'checkout__details flex-group-column gap-1'}/>
        <Summery className={'checkout__summery'} checkOut={true} data={data[0].order_items}/>
    </section>
  )
}

export default Checkout