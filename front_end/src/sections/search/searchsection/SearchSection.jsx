import React from 'react'
import './searchsection.css'
import { useSearchParams } from 'react-router-dom'
import { useSearchAllItems } from '../../../querysandmutaions/queriesandmutaions'
import ItemOverhallComponent from '../../../components/itemsoverhallcomponent/ItemOverhallComponent'
const SearchSection = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const a = searchParams.get('search')
  const {data, isLoading, isError, error} = useSearchAllItems(a)
  console.log(data)
  return (
    <div>
        <ItemOverhallComponent data={data}/>
    </div>
  )
}

export default SearchSection