import React from 'react'
import MainAdvert from '../../../components/Adverts/mainadvert/MainAdvert'
import MainHeroText from '../../../components/Adverts/mainherotext/MainHeroText'
import Carousel from '../../../components/carousel/Carousel'
import './home.css'
import { useGetAllItems } from '../../../querysandmutaions/queriesandmutaions'
import Loader from '../../../components/loader/Loader'
const Home = () => {
  const {data, isLoading, isError} = useGetAllItems()
  if (isLoading) return <Loader/>
  if (isError) return <h1>ERROR</h1>
  {console.log(data)}
  return (
    <main className='app__main-section'>
        <MainAdvert/>
        <MainHeroText/>
        <Carousel itemVartion={'category'} data={data.slice(0,6)} id={1}/>
        <Carousel itemVartion={'category-inline-border'} data={data.slice(4,10)} id={2}/>
        <Carousel itemVartion={'category-inline'} data={data.slice(6,12)} id={3}/>
        <Carousel itemVartion={'full'} data={data.slice(8,14)} id={4}/>
        <Carousel itemVartion={'full'} data={data.slice(10, 16)} id={5}/>
        <Carousel itemVartion={'category-BAW'} data={data.slice(12, 18)} id={6}/>
    </main>
  )
}

export default Home