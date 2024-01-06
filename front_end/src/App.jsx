import './App.css'
import MainAdvert from './components/Adverts/mainadvert/MainAdvert'
import MainHeroText from './components/Adverts/mainherotext/MainHeroText'
import Carousel from './components/carousel/Carousel'
import Cart from './components/cart/Cart'
import FullItemCard from './components/fullitemcard/FullItemCard'
import ItemCard from './components/itemcard/ItemCard'
import CartSection from './sections/cart/CartSection'
import Navbar from './components/navbar/Navbar'
import Footer from './sections/footer/Footer'
import { ItemsOverhall } from './sections/itemsoverhall/ItemsOverhall'
import SearchComponent from './sections/search/searchcomponent/SearchComponent'
import Checkout from './sections/checkout/Checkout'
import Loader from './components/loader/Loader'
import Home from './sections/checkout/home/Home'
import {LazyLoad} from './utils/LazyLoad'
import {Routes, Route} from 'react-router-dom'
import SignUp from './sections/user/signup/SignUp'
import LogIn from './sections/user/login/LogIn'
import UserLayout from './sections/user/userlayout/UserLayout'
import AdminLayout from './sections/user/admin/adminlayout/AdminLayout'
import MainLayout from './sections/mainlayout/MainLayout'
import AdminHome from './sections/user/admin/adminhome/AdminHome'
import Option from './sections/user/admin/adminhome/adminoptions/option/Option'
import { logout } from './lib/axios/axios'
import FullItem from './sections/fullitem/FullItem'


function App() {
  return (
    <main>
        {/*<Navbar/>
        <SearchComponent/>*/}
        <Routes>
          <Route element={<AdminLayout/>}>
            <Route path='/admin' element={<AdminHome/>}/>
            <Route path='/admin/:option' element={<Option/>}/>
          </Route>
          <Route element={<UserLayout/>}>
            <Route path='/signup' element={<SignUp/>}/>
            <Route path='/login' element={<LogIn/>}/>
          </Route>
          <Route element={<MainLayout/>}>
            <Route path='' element={<Home/>}/>
            <Route path='/cart' element={<CartSection/>}/>
            <Route path='/checkout' element={<Checkout/>}/>
            <Route path='/category/:id' element={<ItemsOverhall/>}/>
            <Route path='/item/:id' element={<FullItem/>}/>
          </Route>
        </Routes>
    </main>
  )
}

export default App
