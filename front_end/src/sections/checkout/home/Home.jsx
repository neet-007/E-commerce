import React from 'react'
import MainAdvert from '../../../components/Adverts/mainadvert/MainAdvert'
import MainHeroText from '../../../components/Adverts/mainherotext/MainHeroText'
import Carousel from '../../../components/carousel/Carousel'
import './home.css'
import { useGetHomeItems } from '../../../querysandmutaions/queriesandmutaions'
import Loader from '../../../components/loader/Loader'
const Home = () => {
  const {data, isLoading, isError} = useGetHomeItems()
  if (isLoading) return <Loader/>
  if (isError) return <h1>ERROR</h1>
  {console.log(data)}
  return (
    <main className='app__main-section'>
        <MainAdvert/>
        <MainHeroText/>
        <Carousel itemVartion={'category'} carouselTitle='latest & gratest' data={data.sub_categoies} id={1} category={true}/>
        <Carousel itemVartion={'category-inline-border'} carouselTitle='trending items' data={data.trending_items} id={2}/>
        <Carousel itemVartion={'category-inline'} carouselTitle='more to explore' data={data.main_categories} id={3} category={true}/>
        <Carousel itemVartion={'full'} carouselTitle='discover our icons' data={data.shoe_categories} id={4}/>
        <Carousel itemVartion={'full'} carouselTitle='collection' data={data.trending_items} id={5}/>
        <Carousel itemVartion={'category-BAW'} carouselTitle='discover by sport' data={data.sport_categories} id={6} category={true}/>
    </main>
  )
}

export default Home