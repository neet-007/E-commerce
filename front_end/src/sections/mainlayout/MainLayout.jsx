import React, { Suspense } from 'react'
import './mainlayout.css'
import { Outlet } from 'react-router-dom'
import Loader from '../../components/loader/Loader'
import Navbar from '../../components/navbar/Navbar'
import Footer from '../footer/Footer'
import SearchComponent from '../search/searchcomponent/SearchComponent'
const MainLayout = () => {
  return (
    <section>
        <Suspense fallback={<Loader/>}>
            <Navbar/>
            <SearchComponent/>
            <Outlet/>
            <Footer/>
        </Suspense>
    </section>
  )
}

export default MainLayout