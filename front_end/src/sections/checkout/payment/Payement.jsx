import React from 'react'
import './payment.css'
import { Header } from '../Header'
import Input from '../input/Input'
import AppButton from '../../../components/appbutton/AppButton'
function Payement() {
  return (
    <form className='flex-group-column gap-1 payment__form'>
        <Header name={'payment'} verifide={true}/>
        <p>select payment method</p>
        <p>add card</p>
        <span className='flex-group gap-1'>
            <Input label={'card number'} inputType='text'/>
            <Input label={'expation date'} inputType='date'/>
            <Input label={'security code'} inputType='number'/>
        </span>
        <AppButton name={'continue'}/>
    </form>
  )
}

export default Payement