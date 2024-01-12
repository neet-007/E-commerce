import React, { useEffect, useState } from 'react'
import './itemsoverhall.css'
import { useParams } from 'react-router-dom'
import { useGetItemsFinal } from '../../querysandmutaions/queriesandmutaions'
import ItemOverhallComponent from '../../components/itemsoverhallcomponent/ItemOverhallComponent'
import Loader from '../../components/loader/Loader'
export const ItemsOverhall = () => {
  const {gender, category, subCategory} = useParams()
  const [serachParams, setSearchParams] = useState({gender:gender, category:category, subCategory:subCategory})
  const [filterQuery, setFilterQuery] = useState('')
  const [sortQuery, setSortQuery] = useState('new')
  const [price, setPrice] = useState({minPrice:0, maxPrice:0})
  const [page, setPage] = useState(1)
  const {data, isLoading, isError, error} = useGetItemsFinal({...serachParams, page, sort:sortQuery, filter:filterQuery})
  if (isLoading) return <Loader/>
  if(isError) console.log(error)
  console.log(data)
  console.log(price)
  return (
    <ItemOverhallComponent data={data[0]} setSearchParams={setSearchParams} page={page} setPage={setPage} sortQuery={sortQuery} setSortQuery={setSortQuery} setPrice={setPrice} setFilterQuery={setFilterQuery}/>
  )
}
