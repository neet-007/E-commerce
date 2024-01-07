import React from 'react'
import './payment.css'
import { Header } from '../Header'
import Input from '../input/Input'
import AppButton from '../../../components/appbutton/AppButton'
function Payement({data, updateData, onClick}) {
  return (
    <div className='flex-group-column gap-1 payment__form overflow-hidden' id='payment-form'>
        <p>select payment method</p>
        <p>add card</p>
        <span className='flex-group gap-1'>
            <Input label={'card number'} inputType='text' required={true}
                   value={data['card number'].value}
                   onChange={e => {const a = {...data};
                            a['card number'] = e.target.value
                            updateData(a)}}/>
            <Input label={'expation date'} inputType='date' required={true}
                   value={data['expation date'].value}
                   onChange={e => {const a = {...data};
                            a['expation date'] = e.target.value
                            updateData(a)}}/>
            <Input label={'security code'} inputType='number' required={true}
                   value={data['security code'].value}
                   onChange={e => {const a = {...data};
                            a['security code'] = e.target.value
                            updateData(a)}}/>
        </span>
        <AppButton name={'continue'} onClick={onClick}/>
    </div>
  )
}

export default Payement