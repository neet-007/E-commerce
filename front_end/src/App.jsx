import './App.css'
import MainAdvert from './components/Adverts/mainadvert/MainAdvert'
import MainHeroText from './components/Adverts/mainherotext/MainHeroText'
import Carousel from './components/carousel/Carousel'
import Cart from './components/cart/Cart'
import ItemCard from './components/itemcard/ItemCard'
import Navbar from './components/navbar/Navbar'
import Footer from './sections/footer/Footer'
import { ItemsOverhall } from './sections/itemsoverhall/ItemsOverhall'
import SearchComponent from './sections/search/searchcomponent/SearchComponent'

function App() {

  const a = [
    'full',
    'category',
    'category-inline',
    'category-inline-border'
  ]

  return (
    <section>
      <section className='app__main-section'>
        <SearchComponent/>
      </section>
      <Footer/>
    </section>
  )
}

export default App
