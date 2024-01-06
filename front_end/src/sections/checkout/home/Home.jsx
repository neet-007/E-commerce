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
        <Carousel itemVartion={'category'}/>
        <Carousel itemVartion={'category-inline-border'}/>
        <Carousel itemVartion={'category-inline'}/>
        <Carousel itemVartion={'full'}/>
        <Carousel itemVartion={'full'}/>
        <Carousel itemVartion={'category-BAW'}/>
    </main>
  )
}

export default Home