import React from 'react'
import './checkout.css'
import Summery from '../../components/cart/summery/Summery'
import CheckOutForm from './checkoutform/CheckOutForm'

const Checkout = () => {
  return (
    <section className='checkout__main-article'>
        <CheckOutForm className={'checkout__details flex-group-column gap-1'}/>
        <Summery className={'checkout__summery'} checkOut={true}/>
    </section>
  )
}

export default Checkout