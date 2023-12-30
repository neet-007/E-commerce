import React from 'react'
import './summery.css'
import { Truck } from 'react-bootstrap-icons'
import AppButton from '../../appbutton/AppButton'
const Summery = () => {
  return (
    <article className='summery__main-article'>
        <p className='f-large'>Summery</p>
        <div className='flex-group-between'>
            <p>subtotal</p>
            <p>SAR 750</p>
        </div>
        <div className="b-bottom"></div>
        <div className='flex-group-between'>
            <p>total</p>
            <p>SAR 750</p>
        </div>
        <div className="b-bottom"></div>
        <span className='flex-group gap-1'>
            <Truck/>
            <p>
                Delivery Fee will be calculated at checkout
            </p>
        </span>
        <AppButton name={'Checkout'}/>
    </article>
  )
}

export default Summery