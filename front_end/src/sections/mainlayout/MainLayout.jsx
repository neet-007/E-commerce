import React, { Suspense } from 'react'
import './mainlayout.css'
import { Outlet } from 'react-router-dom'
import Loader from '../../components/loader/Loader'
import Navbar from '../../components/navbar/Navbar'
import Footer from '../footer/Footer'
import SearchComponent from '../search/searchcomponent/SearchComponent'
import { useUserContext } from '../../context/Context'

const MainLayout = () => {
  const {user, isLoading, isAuthenticated} = useUserContext()

  if (isLoading) return <Loader/>
  return (
    <section className='mainlayout__section'>
        <Suspense fallback={<Loader/>}>
            <Navbar isAuthenticated={isAuthenticated} cartCount={user.cart.length === 0 ? 0 : user.cart[0].count}/>
            <SearchComponent/>
            <Outlet/>
            <Footer/>
        </Suspense>
    </section>
  )
}

export default MainLayout