import React from 'react'
import './delivery.css'
import { Header } from '../Header'
import Input from '../input/Input'
import Select from '../select/Select'
import AppButton from '../../../components/appbutton/AppButton'
import { DELIVERY_FORM_DATA } from '../../../constants'
const Delivery = ({data, updateData, onClick}) => {

  return (
    <form className='flex-group-column gap-1 overflow-hidden' id='delivery-form'>
        <p className='fw-bold cap'>add address</p>
        {/*<Input label={'first name'} value={data['first name'].value}
               onChange={e => {updateData({'first name':e.target.value})}}/>*/}
        {DELIVERY_FORM_DATA.map(item => {
          return (<Input key={item} label={item} value={data[item].value}
                         onChange={e => {const a = {...data};
                                         a[item] = e.target.value
                                        updateData(a)}}/>)
        })}
        <Select options={['a', 'b', 'c']}/>
        <Select options={['a', 'b', 'c']}/>
        <Select options={['a', 'b', 'c']}/>
        <Input label={'promo'}/>

        <AppButton name={'continue'} onClick={onClick}/>
    </form>
  )
}

export default Delivery