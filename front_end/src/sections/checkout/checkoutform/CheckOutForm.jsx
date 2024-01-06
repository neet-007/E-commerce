import React from 'react'
import { Header } from '../Header'
import Delivery from '../delivery/Delivery'
import Payement from '../payment/Payement'
import ReviewOrder from '../revieworder/ReviewOrder'
import UseMultiStepForm from '../../../hooks/UseMultiStepForm'
import AppButton from '../../../components/appbutton/AppButton'

const CheckOutForm = ({className}) => {
  const {steps, currentStepIndex, currentStep, back, next, goToStep, formData, setFormData} = UseMultiStepForm(['delivery-form', 'payment-form', 'review-order-form'])
  const updateData = (newData) => {
    setFormData(prevData => {
        return {...prevData, ...newData}
    })
    console.log(formData)
  }
  const onClick = (e, dir, step=null) => {
    e.preventDefault()
    if (step !== null){
        goToStep(step)
    }
    dir === 'next' ? next() : back()
}

  return (
    <div className={`${className}`}>
        <Header name={'delivery'} verifide={currentStepIndex === 0}/>
        <Delivery data={formData} updateData={updateData}
                  onClick={(e) => onClick(e, 'next')}/>
        {currentStepIndex === 1 && <AppButton name={'back'} onClick={e => onClick(e, 'step', 0)}/>}
        <Header name={'payment'} verifide={currentStepIndex === 1}/>
        <Payement onClick={(e) => onClick(e, 'next')}/>
        {currentStepIndex === 2 && <AppButton name={'back'} onClick={e => onClick(e, 'step', 1)}/>}
        <Header name={'review-order'} verifide={currentStepIndex === 2}/>
        <ReviewOrder onClick={(e) => onClick(e, 'next')}/>
    </div>
  )
}

export default CheckOutForm