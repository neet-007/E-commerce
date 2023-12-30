import React from 'react'
import './mainadvert.css'
import AppButton from '../../appbutton/AppButton'
const MainAdvert = () => {
  return (
    <article className='mainadvert__main-article'>
        <span className='mainadvert__text-span'>
            <p>main text</p>
            <p className='f-large fw-bold'>percent</p>
            <p>sub text</p>
            <AppButton name='Shop' color='white'/>
        </span>
    </article>
  )
}

export default MainAdvert