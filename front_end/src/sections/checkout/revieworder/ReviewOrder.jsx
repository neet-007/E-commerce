import React from 'react'
import './revieworder.css'
import AppButton from '../../../components/appbutton/AppButton'
function ReviewOrder({onClick}) {
  return (
    <div id='review-order-form' className='overflow-hidden max-height-0'>
        <p className='cap'>by clicking place order you adher to out terms and comndiotino araed aobut ti hear</p>
        <AppButton name={'place order'} type={'submit'}/>
    </div>
  )
}

export default ReviewOrder