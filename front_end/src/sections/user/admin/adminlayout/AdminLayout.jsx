import React, { Suspense } from 'react'
import './adminlayout.css'
import { Outlet } from 'react-router-dom'
import Loader from '../../../../components/loader/Loader'
const AdminLayout = () => {
  return (
    <section>
      <Suspense fallback={<Loader/>}>
        <Outlet/>
      </Suspense>
    </section>
  )
}

export default AdminLayout