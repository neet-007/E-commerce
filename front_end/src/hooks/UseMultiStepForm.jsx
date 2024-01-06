import React, { useState } from 'react'

const INITIAL_DATA = {
  'first name':'',
  'last name':'',
  'phone number':'',
  'email':'',
  'address line 1':'',
  'address line 2':'',
}
function UseMultiStepForm(steps=[], ) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [formData, setFormData] = useState(INITIAL_DATA)
  const currentStep = steps[currentStepIndex]
  const next = () => {
    let nextI;
    if (currentStepIndex === steps.length - 1) {
      nextI = currentStepIndex
      return alert('dsadas')
    }else{
      nextI = currentStepIndex + 1
      setCurrentStepIndex(nextI)
    }
    document.getElementById(currentStep).style.maxHeight = 0
    document.getElementById(steps[nextI]).style.maxHeight = 'fit-content'
  }
  const back = () => {
    let backI;
    if (currentStepIndex === steps.length) {
      backI = currentStepIndex
    }else{
      backI = currentStepIndex - 1
      setCurrentStepIndex(backI)
    }
    document.getElementById(steps[backI]).style.maxHeight = 'fit-content'
  }
  const goToStep = (i) => {
    document.getElementById(steps[i+1]).style.maxHeight = 0
    setCurrentStepIndex(i)
  }
  return {
    steps,
    currentStep,
    currentStepIndex,
    back,
    next,
    goToStep,
    formData,
    setFormData,
  }
}

export default UseMultiStepForm