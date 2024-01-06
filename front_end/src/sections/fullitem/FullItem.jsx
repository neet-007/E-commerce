import React from 'react'
import './fullitem.css'
import { useNavigate, useParams } from 'react-router-dom'
import FullItemCard from '../../components/fullitemcard/FullItemCard'
import { useGetSingleItem } from '../../querysandmutaions/queriesandmutaions'
import Loader from '../../components/loader/Loader'
const FullItem = () => {
  const {id:itemId} = useParams()
  const {data, isLoading, isError, error} = useGetSingleItem(itemId)
  const navigate = useNavigate()
  if (isLoading) return <Loader/>
  if (isError){
    console.log(error)
    return <h1>ERROR</h1>
  }
  return (
    <section>
        {data?
            <FullItemCard itemId={data.id} itemTitle={data.name} category={data.category.name} price={data.price} description={data.description}/>
        :<h1>ITEM NOT FOUND</h1>}
    </section>
  )
}

export default FullItem