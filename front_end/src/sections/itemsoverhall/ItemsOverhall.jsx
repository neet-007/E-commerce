import React, { useEffect, useState } from 'react'
import './itemsoverhall.css'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetItemsFromCategory } from '../../querysandmutaions/queriesandmutaions'
import ItemOverhallComponent from '../../components/itemsoverhallcomponent/ItemOverhallComponent'
import Loader from '../../components/loader/Loader'
export const ItemsOverhall = () => {
  const {id:categoryId} = useParams()
  console.log(categoryId)
  const [filterQuery, setFilterQuery] = useState('')
  const {data, isLoading, isError, error} = useGetItemsFromCategory({categoryId, filter:'asd'})
  const navigate = useNavigate()
  useEffect(() => {
    console.log(filterQuery)
  },[filterQuery])
  if (isLoading) return <Loader/>
  if(isError) console.log(error)
  console.log(data.items)
  return (
    <ItemOverhallComponent data={data.items} setFilterQuery={setFilterQuery}/>
  )
}
