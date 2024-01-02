import React from 'react'
import './revieworder.css'
import AppButton from '../../../components/appbutton/AppButton'
function ReviewOrder() {
  return (
    <form>
        <p className='cap'>by clicking place order you adher to out terms and comndiotino araed aobut ti hear</p>
        <AppButton name={'place order'}/>
    </form>
  )
}

export default ReviewOrder