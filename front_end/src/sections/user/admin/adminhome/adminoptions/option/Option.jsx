import React, { useState } from 'react'
import './option.css'
import { useParams } from 'react-router-dom'
import { useAdminOptions } from '../../../../../../hooks/useAdminOptions'
import Input from '../../../../../checkout/input/Input'
const Option = () => {
  const {option} = useParams()
  const {adminOptionsData, setAdminOptionsData} = useState({
    newItem:''
  })
  return (
    <div>
        <p className='cap f-large'>{option}</p>
        <Input label={'dsad'} lableHtml={true} value={''}
               onChange={''} required={''}/>
    </div>
  )
}

export default Option