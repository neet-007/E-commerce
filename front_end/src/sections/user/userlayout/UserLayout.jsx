import React, { Suspense } from 'react'
import './userlayout.css'
import { Outlet } from 'react-router-dom'
const UserLayout = () => {
  return (
    <section className='userlayout__section'>
        <Suspense fallback={<h1>Loading</h1>}>
            <div className='row1'>
                <p className='cap f-large fw-bold'>just do it</p>
                <svg width={'10rem'} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" id="nike"><path fill="#263238" fillRule="evenodd" d="m7.998 7.567-2.758.722c-.974.241-1.826.562-2.647.281-1.116-.482-1.096-1.736-.264-3.07-1.471 1.214-4.118 5.096-.538 5.488.456.06 1.268-.1 2.15-.471l4.057-1.665L16 5.58 8.992 7.306l-.994.261z" clipRule="evenodd"></path></svg>
            </div>
            <Outlet/>
        </Suspense>
    </section>
  )
}

export default UserLayout