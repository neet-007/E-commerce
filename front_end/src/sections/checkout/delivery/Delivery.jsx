import React from 'react'
import './delivery.css'
import { Header } from '../Header'
import Input from '../input/Input'
import Select from '../select/Select'
import AppButton from '../../../components/appbutton/AppButton'
const Delivery = () => {
  return (
    <form className='flex-group-column gap-1'>
        <Header name={'delivery'} verifide={true}/>
        <p className='fw-bold cap'>add address</p>
        <Input label={'first name'}/>
        <Input label={'last name'}/>
        <Input label={'phone number'} inputType={'tel'}/>
        <Input label={'email'} inputType={'email'}/>
        <Input label={'address line 1'}/>
        <Input label={'address line 2'}/>
        <Select options={['a', 'b', 'c']}/>
        <Select options={['a', 'b', 'c']}/>
        <Select options={['a', 'b', 'c']}/>
        <Input label={'promo'}/>

        <AppButton name={'continue'}/>
    </form>
  )
}

export default Delivery