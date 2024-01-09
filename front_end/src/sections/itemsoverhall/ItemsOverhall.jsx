import React, { useEffect, useState } from 'react'
import './itemsoverhall.css'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetItemsFromCategory, useGetItemsFromGender } from '../../querysandmutaions/queriesandmutaions'
import ItemOverhallComponent from '../../components/itemsoverhallcomponent/ItemOverhallComponent'
import Loader from '../../components/loader/Loader'
export const ItemsOverhall = () => {
  const {gender} = useParams()
  let genderId
  switch (gender.toLowerCase()) {
    case 'men':
      genderId = 1
      break;
    case 'women':
      genderId = 2
    case 'kids':
      genderId = 3
    default:
      break;
  }
  const [filterQuery, setFilterQuery] = useState('')
  const {data, isLoading, isError, error} = useGetItemsFromGender({genderId})
  const navigate = useNavigate()
  useEffect(() => {
    console.log(filterQuery)
  },[filterQuery])
  if (isLoading) return <Loader/>
  if(isError) console.log(error)
  console.log(data)
  return (
    <ItemOverhallComponent data={data} setFilterQuery={setFilterQuery}/>
  )
}
