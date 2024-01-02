import React from 'react'
import './checkout.css'
import Summery from '../../components/cart/summery/Summery'
import Delivery from './delivery/Delivery'
import Payement from './payment/Payement'
import ReviewOrder from './revieworder/ReviewOrder'

const Checkout = () => {
  return (
    <section className='checkout__main-article'>
        <div className='checkout__details flex-group-column gap-1'>
            <Delivery/>
            <Payement/>
            <ReviewOrder/>
        </div>
        <Summery className={'checkout__summery'} checkOut={true}/>
    </section>
  )
}

export default Checkout